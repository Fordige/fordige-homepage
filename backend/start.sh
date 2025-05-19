#!/bin/bash
set -e

# 檢查 redis-server 是否可用
if ! command -v redis-server >/dev/null 2>&1; then
  echo "Error: redis-server not found"
  exit 127
fi

# 啟動 redis-server
redis-server --daemonize yes
if [ $? -ne 0 ]; then
  echo "Error: Failed to start redis-server"
  exit 1
fi

# 檢查 daphne 是否可用
if ! command -v daphne >/dev/null 2>&1; then
  echo "Error: daphne not found"
  exit 127
fi

# 啟動 daphne
exec daphne -b 0.0.0.0 -p 8000 backend.asgi:application