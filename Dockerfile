FROM python:3.12-slim

# 安裝系統依賴（包含 Nginx）
RUN apt-get update && apt-get install -y \
    curl \
    gcc \
    redis-server \
    nginx \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 創建日誌目錄
RUN mkdir -p /var/log/redis && chmod -R 777 /var/log/redis
RUN mkdir -p /var/log/django && chmod -R 777 /var/log/django
RUN mkdir -p /var/log/nginx && chmod -R 777 /var/log/nginx

# 創建虛擬環境
RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"

# 更新 pip
RUN pip install --upgrade pip

# 設置工作目錄
WORKDIR /app

# 複製並安裝前端依賴
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# 複製並安裝後端依賴
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# 複製前端原始碼並構建
COPY frontend/ ./frontend/
RUN rm -rf backend/static/* && cd frontend && npm run build

# 複製後端程式碼
COPY backend/ ./backend/

# 複製 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/websocket.conf

# 複製 SSL 證書
RUN mkdir -p /etc/nginx/certs
COPY certs/server.crt /etc/nginx/certs/server.crt
COPY certs/server.key /etc/nginx/certs/server.key

# 設置後端工作目錄
WORKDIR /app/backend

# 設置環境變數
ARG MONGO_DB_USERNAME
ARG MONGO_DB_PASSWORD
ARG MONGO_DB_NAME
ARG LINE_CHANNEL_SECRET
ARG LINE_CHANNEL_ACCESS_TOKEN
ARG LINE_GROUP_ID
ENV MONGO_DB_USERNAME=$MONGO_DB_USERNAME
ENV MONGO_DB_PASSWORD=$MONGO_DB_PASSWORD
ENV MONGO_DB_NAME=$MONGO_DB_NAME
ENV LINE_CHANNEL_SECRET=$LINE_CHANNEL_SECRET
ENV LINE_CHANNEL_ACCESS_TOKEN=$LINE_CHANNEL_ACCESS_TOKEN
ENV LINE_GROUP_ID=$LINE_GROUP_ID
ENV REDIS_HOST=localhost
ENV REDIS_PORT=6379
ENV DJANGO_SETTINGS_MODULE=backend.settings

# 收集靜態檔案
RUN rm -rf staticfiles/* && python manage.py collectstatic --noinput

# 移動 index.html 到 templates
RUN mkdir -p templates && mv static/index.html templates/index.html || true

# 創建日誌目錄（確保存在）
RUN mkdir -p /var/log/django && chmod -R 777 /var/log/django

# 複製並設置啟動腳本
COPY backend/start.sh .
RUN chmod +x start.sh

# 暴露端口
EXPOSE 80 443

# 使用啟動腳本
CMD ["./start.sh"]