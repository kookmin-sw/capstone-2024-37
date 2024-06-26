"use client";

import "./global.css";
import { useState } from "react";
import EmptyChatView from "./ChatBot/EmptyChatView";
import ChatView from "./ChatBot/ChatView";
import { XIcon } from "lucide-react";
import { ViewType } from "./ChatBot/type";

export interface ChatBotProps {
  clientId: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ clientId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ViewType>("empty");

  return (
    <>
      {isOpen && (
        <div className="z-[999] fixed w-[390px] max-h-[690px] h-full right-8 bottom-[100px] flex flex-col rounded-xl overflow-hidden bg-white border">
          {mode === "empty" && <EmptyChatView setMode={setMode} />}
          {mode === "chat" && <ChatView clientId={clientId} />}
        </div>
      )}
      <button
        className="w-16 h-16 rounded-full fixed flex justify-center items-center right-[32px] bottom-[32px] shadow-xl border-2 border-black"
        onClick={() => {
          setIsOpen(!isOpen);
          setMode("empty");
        }}
      >
        {isOpen ? (
          <XIcon className="h-8 w-8" />
        ) : (
          <img src="https://capstone-2024-37.vercel.app/icons/logo.png" width={64} height={64} alt="" />
        )}
      </button>
    </>
  );
};

export default ChatBot;
