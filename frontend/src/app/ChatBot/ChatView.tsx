import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const ChatView = () => {
  const [chats, setChats] = useState();

  return (
    <>
      <div className="p-4 font-bold text-2xl border-b">대화</div>
      <div className="w-full h-full flex-col flex justify-end items-center">
        <div className="w-full h-14 bg-gray-200 flex items-center justify-center gap-4 px-4">
          <Input type="text" />
          <Button>보내기</Button>
        </div>
      </div>
    </>
  );
};

export default ChatView;
