"use client";

import useUser from "@/hooks/useUser";
import ChatBot from "@checkbot/checkbot";
import "@checkbot/checkbot/dist/index.css";

const WrappedChatBot = () => {
  const { user } = useUser();
  return <ChatBot clientId={user?.clientID ?? ""} />;
};

export default WrappedChatBot;
