#!/bin/bash
set -e

# 檢查 redis-server 是否存在
if ! command -v redis-server >/dev/null 2>&1; then
    echo "Error: redis-server not found" >&2
    exit 127
fi

# 創建 Redis 日誌目錄
mkdir -p /var/log/redis
chmod -R 777 /var/log/redis

# 啟動 redis-server
echo "Starting redis-server..."
redis-server --daemonize yes --logfile /var/log/redis/redis-server.log --bind 0.0.0.0
if [ $? -ne 0 ]; then
    echo "Error: Failed to start redis-server" >&2
    cat /var/log/redis/redis-server.log >&2
    exit 1
fi

# 等待並驗證 Redis
sleep 2
redis-cli -h localhost -p 6379 ping
if [ $? -ne 0 ]; then
    echo "Error: Redis ping failed" >&2
    cat /var/log/redis/redis-server.log >&2
    exit 1
fi

# 檢查 nginx
if ! command -v nginx >/dev/null 2>&1; then
    echo "Error: nginx not found" >&2
    exit 127
fi

# 啟動 Nginx
echo "Starting nginx..."
nginx &

# 檢查 daphne
if ! command -v daphne >/dev/null 2>&1; then
    echo "Error: daphne not found" >&2
    exit 127
fi

# 啟動 daphne
echo "Starting daphne..."
exec daphne -b 0.0.0.0 -p 8000 backend.asgi:application