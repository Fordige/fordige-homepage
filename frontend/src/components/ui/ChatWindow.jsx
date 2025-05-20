import React, { useState, useEffect, useRef } from "react";

const ChatWindow = ({ onClose }) => {
  const generateSessionId = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";
    const randomLetters = Array.from({ length: 2 }, () =>
      letters.charAt(Math.floor(Math.random() * letters.length)),
    ).join("");
    const randomDigits = Array.from({ length: 3 }, () =>
      digits.charAt(Math.floor(Math.random() * digits.length)),
    ).join("");
    return randomLetters + randomDigits;
  };

  const [sessionId] = useState(generateSessionId());
  const [messages, setMessages] = useState([
    {
      sender: "system",
      content:
        "等待客服連線...或請直接加入官方line:@102xangi，以獲得最棒的服務體驗❤️",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [sessionStatus, setSessionStatus] = useState("waiting");
  const hasConnected = useRef(false); // 防止重複「客服已連線」
  const maxRetries = 3;
  const retryDelay = 3000;
  const mountCount = useRef(0);
  const isConnecting = useRef(false);

  useEffect(() => {
    mountCount.current += 1;
    console.log(
      `ChatWindow 掛載次數: ${mountCount.current}, sessionId: ${sessionId}`,
    );
    const cleanup = connectWebSocket();
    return () => {
      console.log(`ChatWindow 卸載, sessionId: ${sessionId}`);
      setTimeout(cleanup, 1000);
    };
  }, []);

  const connectWebSocket = () => {
    if (isConnecting.current) {
      console.log(`WebSocket 連線中，跳過: sessionId=${sessionId}`);
      return () => {};
    }
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.log(`WebSocket 已連線，跳過: sessionId=${sessionId}`);
      return () => {};
    }

    isConnecting.current = true;
    console.log(
      `嘗試連線 WebSocket: wss://ws.fordige.com/ws/chatbot/${sessionId}/`,
    );
    // const newSocket = new WebSocket(
    //   `wss://ws.fordige.com/ws/chatbot/${sessionId}/`,
    // );
    const newSocket = new WebSocket(
      `wss://http://fordige-application-env.eba-wajhvpf2.ap-northeast-1.elasticbeanstalk.com/ws/chatbot/test_session/`,
    );
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log(`WebSocket 連線成功: session_id=${sessionId}`);
      setError(null);
      setRetryCount(0);
      isConnecting.current = false;
      newSocket.send(JSON.stringify({ type: "get_status" }));
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(`收到 WebSocket 訊息: sessionId=${sessionId}, data=`, data);
      if (data.message && data.message.includes("伺服器錯誤")) {
        setError(data.message);
        return;
      }
      if (data.type === "status_update") {
        setSessionStatus(data.status);
        if (data.status === "active" && !hasConnected.current) {
          hasConnected.current = true;
          setMessages((prev) => [
            ...prev,
            {
              sender: "system",
              content: "客服已連線",
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
        }
      } else if (data.sender !== "user") {
        setMessages((prev) => [
          ...prev,
          {
            sender: data.sender,
            content: data.message,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      }
    };

    newSocket.onerror = (event) => {
      console.error("WebSocket 錯誤:", event);
      setError("無法連線到聊天伺服器，請稍後重試");
      isConnecting.current = false;
    };

    newSocket.onclose = (event) => {
      console.log(`WebSocket 斷線: code=${event.code}, reason=${event.reason}`);
      isConnecting.current = false;
      if (retryCount < maxRetries) {
        setTimeout(() => {
          console.log(`嘗試重連 (${retryCount + 1}/${maxRetries})...`);
          setRetryCount((prev) => prev + 1);
          connectWebSocket();
        }, retryDelay);
      } else {
        setError("聊天連線斷開，請重新整理頁面");
      }
    };

    return () => {
      console.log(`關閉 WebSocket: sessionId=${sessionId}`);
      isConnecting.current = false;
      if (
        newSocket.readyState === WebSocket.OPEN ||
        newSocket.readyState === WebSocket.CONNECTING
      ) {
        newSocket.close();
      }
    };
  };

  const sendMessage = () => {
    if (
      input.trim() &&
      socket &&
      socket.readyState === WebSocket.OPEN &&
      sessionStatus === "active"
    ) {
      console.log(`發送訊息: sessionId=${sessionId}, content=${input}`);
      socket.send(JSON.stringify({ message: input }));
      setMessages((prev) => [
        ...prev,
        {
          sender: "user",
          content: input,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setInput("");
    } else if (sessionStatus !== "active") {
      setError("請等待客服連線後再發送訊息");
    } else {
      setError("無法發送訊息，請檢查連線狀態");
    }
  };

  return (
    <div className="fixed bottom-1/2 right-5 z-50 flex h-[30rem] w-[20rem] translate-y-1/2 flex-col rounded-lg bg-white shadow-2xl">
      <div className="flex items-center justify-between rounded-t-lg bg-midtone p-3 font-sf text-[1.5rem] text-white">
        <span>( 聊天ID: {sessionId} )</span>
        <button onClick={onClose} className="cursor-pointer">
          ✕
        </button>
      </div>
      {error && <div className="p-2 text-center text-red-500">{error}</div>}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500">尚無訊息</div>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 max-w-[80%] rounded-lg p-2 ${
              msg.sender === "user"
                ? "ml-auto bg-midtone text-right text-white"
                : msg.sender === "official"
                  ? "mr-auto bg-gray-200 text-black" // 客服訊息
                  : "mr-auto text-gray-500" // 系統訊息
            }`}
          >
            <span>
              {msg.sender === "user"
                ? "您"
                : msg.sender === "official"
                  ? "🐥"
                  : "🤖"}
              :{" "}
            </span>
            <span>{msg.content}</span>
            <span className="ml-1 text-[0.5rem] text-gray-400">
              {msg.timestamp}
            </span>
          </div>
        ))}
      </div>
      <div className="flex border-t border-gray-200 p-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mr-2 flex-1 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={
            sessionStatus === "active" ? "輸入訊息..." : "請等待客服連線"
          }
          disabled={sessionStatus !== "active"}
        />
        <button
          onClick={sendMessage}
          className={`rounded-md px-4 py-2 text-white transition ${
            sessionStatus === "active"
              ? "bg-midtone hover:bg-green-800"
              : "cursor-not-allowed bg-gray-400"
          }`}
          disabled={sessionStatus !== "active"}
        >
          發送
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
