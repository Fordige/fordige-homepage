import { useState } from "react";
import ChatWindow from "./ChatWindow";
import customerService from "../../assets/ui/customer-service.webp";

const ChatIcon = () => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <>
      <img
        src={customerService}
        alt="customerService"
        className="fixed bottom-1/2 right-5 z-50 flex w-[5rem] translate-y-1/2 cursor-pointer items-center justify-center opacity-30 transition hover:scale-150 hover:opacity-100"
        onClick={toggleChat}
      />
      {showChat && <ChatWindow onClose={() => setShowChat(false)} />}
    </>
  );
};

export default ChatIcon;
