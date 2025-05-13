from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from linebot import LineBotApi, WebhookHandler
from linebot.exceptions import InvalidSignatureError
from linebot.models import MessageEvent, TextMessage, TextSendMessage

line_bot_api = LineBotApi(settings.LINE_CHANNEL_ACCESS_TOKEN)
handler = WebhookHandler(settings.LINE_CHANNEL_SECRET)

@csrf_exempt
def line_webhook(request):
    if request.method == 'POST':
        signature = request.META.get('HTTP_X_LINE_SIGNATURE')
        body = request.body.decode('utf-8')

        try:
            handler.handle(body, signature)
        except InvalidSignatureError:
            return HttpResponse(status=400)

        return HttpResponse(status=200)
    return HttpResponse(status=400)
# def line_webhook(request):
#     return HttpResponse("Hello, this is the LINE webhook endpoint.")

@handler.add(MessageEvent, message=TextMessage)
def handle_text_message(event):
    user_message = event.message.text
    reply_message = f"收到您的消息：{user_message}"  # 簡單回應，可自訂邏輯
    line_bot_api.reply_message(
        event.reply_token,
        TextSendMessage(text=reply_message)
    )