import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# 初始化 Django 應用程式
django_asgi_app = get_asgi_application()

# 延遲導入 chatbot.routing 這確保 get_asgi_application() 在 chatbot.routing 導入前執行，完成 INSTALLED_APPS 初始化。
from chatbot import routing

application = ProtocolTypeRouter({
    'http': django_asgi_app,
    'websocket': AuthMiddlewareStack(
        URLRouter(
            routing.websocket_urlpatterns
        )
    ),
})