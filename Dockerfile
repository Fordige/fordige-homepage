FROM python:3.12-slim

WORKDIR /app

# 安裝 Node.js
RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean

# 複製並安裝前端依賴
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

COPY backend/ ./backend/

# 複製前端原始碼並構建
COPY frontend/ ./frontend/
RUN cd frontend && npm run build

# 設置後端
WORKDIR /app/backend
RUN pip install --no-cache-dir -r requirements.txt

# 移動 index.html 到 templates
RUN mkdir -p templates && mv static/index.html templates/index.html

# 收集靜態檔案並運行遷移
RUN python manage.py collectstatic --noinput
RUN python manage.py migrate --noinput

EXPOSE 8000
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]