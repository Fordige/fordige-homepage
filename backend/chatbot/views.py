from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import pymongo
from django.conf import settings
import requests
import re
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

@csrf_exempt
def line_webhook(request):
    if request.method != 'POST':
        logger.warning("無效的 Webhook 請求: method=%s", request.method)
        return HttpResponse(status=400)

    try:
        data = json.loads(request.body)
        logger.info(f"收到 Webhook 數據: {json.dumps(data, ensure_ascii=False)}")
    except json.JSONDecodeError as e:
        logger.error(f"Webhook 數據解析失敗: error={str(e)}")
        return HttpResponse(status=400)

    for event in data.get('events', []):
        if event.get('type') != 'message' or event.get('message', {}).get('type') != 'text':
            logger.warning(f"忽略非文字訊息事件: event={json.dumps(event, ensure_ascii=False)}")
            continue

        message = event['message']['text'].strip()
        group_id = event.get('source', {}).get('groupId')
        reply_token = event.get('replyToken')
        webhook_event_id = event.get('webhookEventId')  # 修正為 webhookEventId

        # 必要欄位檢查（webhook_event_id 可選，用於去重）
        if not all([message, group_id, reply_token]):
            logger.warning(f"Webhook 事件缺少必要欄位: message={message}, group_id={group_id}, reply_token={reply_token}, webhook_event_id={webhook_event_id}")
            continue

        if group_id != settings.LINE_GROUP_ID:
            logger.warning(f"群組 ID 不匹配: received={group_id}, expected={settings.LINE_GROUP_ID}")
            continue

        # 去重 Webhook 事件
        client = pymongo.MongoClient(settings.MONGO_URI)
        db = client['case_management']
        if webhook_event_id and db.webhook_events.find_one({'event_id': webhook_event_id}):
            logger.info(f"重複的 Webhook 事件: webhook_event_id={webhook_event_id}, message={message}")
            continue
        if webhook_event_id:
            try:
                db.webhook_events.insert_one({'event_id': webhook_event_id, 'created_at': datetime.utcnow()})
            except Exception as e:
                logger.error(f"Webhook 事件儲存失敗: webhook_event_id={webhook_event_id}, error={str(e)}")

        # 放寬正則表達式
        session_id = None
        start_match = re.match(r'^開始對話\s*(\w{2}\d{3})\s*$', message, re.IGNORECASE)
        reply_match = re.match(r'^回覆\s*(\w{2}\d{3})\s*:\s*(.+)$', message, re.IGNORECASE)

        if start_match:
            session_id = start_match.group(1)
        elif reply_match:
            session_id = reply_match.group(1)

        if session_id:
            logger.info(f"處理 Webhook: session_id={session_id}, message={message}, group_id={group_id}, reply_token={reply_token}")
            # 發送到 WebSocket 消費者
            try:
                channel_layer = get_channel_layer()
                if channel_layer:
                    async_to_sync(channel_layer.group_send)(
                        f'chat_{session_id}',
                        {
                            'type': 'handle_line_message',
                            'message': message,
                            'reply_token': reply_token
                        }
                    )
                    logger.info(f"WebSocket 群組發送: group=chat_{session_id}, message={message}")
                else:
                    logger.error(f"channel_layer 未初始化: session_id={session_id}")
            except Exception as e:
                logger.error(f"WebSocket 群組發送失敗: session_id={session_id}, error={str(e)}")

            # 處理待處理的用戶訊息（僅在回覆事件）
            messages_to_send = []
            if reply_match:
                try:
                    pending_messages = db.chatbot_messages.find({'session_id': session_id, 'group_id': settings.LINE_GROUP_ID})
                    pending_count = 0
                    for msg in pending_messages:
                        messages_to_send.append({
                            'type': 'text',
                            'text': f"來自網站用戶 (session: {session_id}): {msg['content']}"
                        })
                        db.chatbot_messages.delete_one({'_id': msg['_id']})
                        pending_count += 1
                        logger.info(f"提取用戶訊息: session_id={session_id}, content={msg['content']}")
                    logger.info(f"提取訊息數量: session_id={session_id}, count={pending_count}")
                except Exception as e:
                    logger.error(f"用戶訊息提取失敗: session_id={session_id}, error={str(e)}")

            # 添加開始對話回覆
            if start_match:
                messages_to_send.append({
                    'type': 'text',
                    'text': f"開始對話 (session: {session_id})"
                })
                logger.info(f"添加開始對話回覆: session_id={session_id}")

            # 使用 Reply API
            if messages_to_send:
                headers = {
                    'Authorization': f"Bearer {settings.LINE_CHANNEL_ACCESS_TOKEN}",
                    'Content-Type': 'application/json'
                }
                reply_data = {
                    'replyToken': reply_token,
                    'messages': messages_to_send[:5]  # LINE Reply API 限制最多 5 條
                }
                try:
                    response = requests.post(
                        'https://api.line.me/v2/bot/message/reply',
                        headers=headers,
                        json=reply_data
                    )
                    logger.info(f"Reply API 回應: session_id={session_id}, status={response.status_code}, response={response.text}")
                    if response.status_code != 200:
                        logger.error(f"Reply API 失敗: session_id={session_id}, response={response.text}")
                except Exception as e:
                    logger.error(f"Reply API 請求失敗: session_id={session_id}, error={str(e)}")

    return HttpResponse(status=200)  # 始終返回 HttpResponse