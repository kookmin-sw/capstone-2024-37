"use client";

import useClickOutside from "@/hooks/useClickOutside";
import { useRef, useState } from "react";
import EmptyChatView from "./EmptyChatView";
import ChatView from "./ChatView";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ViewType>("chat");
  function onClickOutside() {
    setIsOpen(false);
  }

  const ref = useRef();
  useClickOutside(ref, onClickOutside);

  return (
    <>
      {isOpen && (
        <div
          ref={ref as any}
          className="z-[999] fixed w-[390px] max-h-[690px] h-full right-8 bottom-[100px] flex flex-col rounded-xl overflow-hidden bg-white border"
        >
          {mode === "empty" && <EmptyChatView />}
          {mode === "chat" && <ChatView />}
        </div>
      )}
      <button
        className="w-16 h-16 rounded-full fixed right-8 bottom-8 shadow-xl border-2 border-black"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <img src="https://capstone-2024-37.vercel.app/icons/logo.png" width={64} height={64} alt="" />
      </button>
    </>
  );
};

export default ChatBot;
