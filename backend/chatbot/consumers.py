import logging
from channels.generic.websocket import AsyncWebsocketConsumer
import json
import pymongo
from datetime import datetime
import requests
from django.conf import settings
import re

logger = logging.getLogger(__name__)

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.session_id = self.scope['url_route']['kwargs']['session_id']
        self.group_name = f'chat_{self.session_id}'
        logger.info(f"WebSocket 連線開始: session_id={self.session_id}, channel_name={self.channel_name}, group_name={self.group_name}")
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

        client = pymongo.MongoClient(settings.MONGO_URI)
        db = client['case_management']
        session = db.chatbot_chatsession.find_one({'session_id': self.session_id, 'group_id': settings.LINE_GROUP_ID})
        if not session:
            db.chatbot_chatsession.insert_one({
                'session_id': self.session_id,
                'group_id': settings.LINE_GROUP_ID,
                'status': 'waiting',
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow()
            })
            logger.info(f"創建新會話: session_id={self.session_id}, group_id={settings.LINE_GROUP_ID}")
            await self.send_line_message(f"新會話 (session: {self.session_id}) 等待處理，請在群組輸入「開始對話 {self.session_id}」！")
            await self.send(text_data=json.dumps({
                'type': 'status_update',
                'status': 'waiting'
            }))
        else:
            db.chatbot_chatsession.update_one(
                {'session_id': self.session_id, 'group_id': settings.LINE_GROUP_ID},
                {'$set': {'updated_at': datetime.utcnow()}}
            )
            logger.info(f"更新現有會話: session_id={self.session_id}, status={session['status']}")
            await self.send(text_data=json.dumps({
                'type': 'status_update',
                'status': session['status']
            }))

    async def disconnect(self, close_code):
        logger.info(f"WebSocket 斷線: session_id={self.session_id}, close_code={close_code}")
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        logger.info(f"收到 WebSocket 訊息: session_id={self.session_id}, data={data}")
        if data.get('type') == 'get_status':
            client = pymongo.MongoClient(settings.MONGO_URI)
            db = client['case_management']
            session = db.chatbot_chatsession.find_one({'session_id': self.session_id, 'group_id': settings.LINE_GROUP_ID})
            status = session['status'] if session else 'waiting'
            logger.info(f"回應 get_status: session_id={self.session_id}, status={status}")
            await self.send(text_data=json.dumps({
                'type': 'status_update',
                'status': status
            }))
            return

        message = data.get('message')
        if not message:
            logger.warning(f"收到空訊息: session_id={self.session_id}")
            return

        client = pymongo.MongoClient(settings.MONGO_URI)
        db = client['case_management']
        session = db.chatbot_chatsession.find_one({'session_id': self.session_id, 'group_id': settings.LINE_GROUP_ID})
        if session and session['status'] == 'active':
            try:
                db.chatbot_messages.insert_one({
                    'session_id': self.session_id,
                    'group_id': settings.LINE_GROUP_ID,
                    'content': message,
                    'created_at': datetime.utcnow()
                })
                logger.info(f"儲存用戶訊息: session_id={self.session_id}, content={message}")
                await self.channel_layer.group_send(
                    self.group_name,
                    {
                        'type': 'chat_message',
                        'message': message,
                        'sender': 'user'
                    }
                )
            except Exception as e:
                logger.error(f"儲存訊息失敗: session_id={self.session_id}, error={str(e)}")
                await self.send(text_data=json.dumps({
                    'message': '伺服器錯誤，無法儲存訊息',
                    'sender': 'system'
                }))
        else:
            logger.info(f"拒絕訊息（非 active 狀態）: session_id={self.session_id}, status={session['status'] if session else 'none'}")
            await self.send(text_data=json.dumps({
                'message': '請等待客服連線後再發送訊息',
                'sender': 'system'
            }))

    async def chat_message(self, event):
        if event['sender'] != 'user':
            logger.info(f"發送訊息到前端: session_id={self.session_id}, sender={event['sender']}, message={event['message']}")
            await self.send(text_data=json.dumps({
                'message': event['message'],
                'sender': event['sender']
            }))

    async def status_update(self, event):
        status = event['status']
        logger.info(f"處理 status_update: session_id={self.session_id}, status={status}")
        await self.send(text_data=json.dumps({
            'type': 'status_update',
            'status': status
        }))

    async def handle_line_message(self, event):
        message = event['message']
        reply_token = event.get('reply_token')
        logger.info(f"處理 LINE 訊息: session_id={self.session_id}, message={message}, reply_token={reply_token}")
        client = pymongo.MongoClient(settings.MONGO_URI)
        db = client['case_management']
        # 簡化正則表達式，確保匹配
        start_pattern = re.compile(r'^開始對話\s+' + re.escape(self.session_id) + r'\s*$', re.IGNORECASE)
        reply_pattern = re.compile(r'^回覆\s+' + re.escape(self.session_id) + r'\s*:\s*(.+)$', re.IGNORECASE)

        if start_pattern.match(message.strip()):
            session = db.chatbot_chatsession.find_one({'session_id': self.session_id, 'group_id': settings.LINE_GROUP_ID})
            if session:
                if session['status'] == 'waiting':
                    try:
                        result = db.chatbot_chatsession.update_one(
                            {'session_id': self.session_id, 'group_id': settings.LINE_GROUP_ID},
                            {'$set': {'status': 'active', 'updated_at': datetime.utcnow()}}
                        )
                        if result.modified_count > 0:
                            logger.info(f"會話狀態更新: session_id={self.session_id}, status=active")
                            await self.channel_layer.group_send(
                                self.group_name,
                                {
                                    'type': 'status_update',
                                    'status': 'active'
                                }
                            )
                        else:
                            logger.warning(f"狀態未更新（無修改）: session_id={self.session_id}, status={session['status']}")
                    except Exception as e:
                        logger.error(f"狀態更新失敗: session_id={self.session_id}, error={str(e)}")
                        await self.send_line_message(f"伺服器錯誤，無法更新會話（session: {self.session_id}）！")
                else:
                    logger.warning(f"會話已非 waiting 狀態: session_id={self.session_id}, status={session['status']}")
                    await self.send_line_message(f"會話（session: {self.session_id}）已處理，請檢查！")
            else:
                logger.error(f"未找到會話: session_id={self.session_id}, group_id={settings.LINE_GROUP_ID}")
                await self.send_line_message(f"未找到會話（session: {self.session_id}），請檢查！")
        elif reply_pattern.match(message):
            match = reply_pattern.match(message)
            reply_message = match.group(1)
            session = db.chatbot_chatsession.find_one({'session_id': self.session_id, 'group_id': settings.LINE_GROUP_ID})
            if session and session['status'] == 'active':
                await self.channel_layer.group_send(
                    self.group_name,
                    {
                        'type': 'chat_message',
                        'message': reply_message,
                        'sender': 'official'
                    }
                )
                logger.info(f"管理員回覆: session_id={self.session_id}, message={reply_message}")
            else:
                logger.warning(f"會話未開始或已結束: session_id={self.session_id}, status={session['status'] if session else 'none'}")
                await self.send_line_message(f"會話（session: {self.session_id}）未開始或已結束，請先輸入「開始對話 {self.session_id}」！")

    async def send_line_message(self, message):
        headers = {'Authorization': f"Bearer {settings.LINE_CHANNEL_ACCESS_TOKEN}", 'Content-Type': 'application/json'}
        data = {
            'to': settings.LINE_GROUP_ID,
            'messages': [{'type': 'text', 'text': message}]
        }
        try:
            response = requests.post('https://api.line.me/v2/bot/message/push', headers=headers, json=data)
            logger.info(f"Push API 回應: session_id={self.session_id}, status={response.status_code}, response={response.text}")
            if response.status_code != 200:
                logger.error(f"Push API 失敗: session_id={self.session_id}, response={response.text}")
        except Exception as e:
            logger.error(f"Push API 請求失敗: session_id={self.session_id}, error={str(e)}")