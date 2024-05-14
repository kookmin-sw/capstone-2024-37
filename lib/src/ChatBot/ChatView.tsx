import { Loader2 } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { API_SERVER } from "../config";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

interface ChatViewProps {
  clientId: string;
}

const ChatView: React.FC<ChatViewProps> = ({ clientId }) => {
  const [chat, setChat] = useState({ question: "", answer: "" });
  const [inputQuestion, setInputQuestion] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputQuestion(e.target.value);
  };

  const onReset = (e: any) => {
    setChat({ question: "", answer: "" });
  };

  async function onQuestion(e: any) {
    const trimmedQuestion = inputQuestion.trim();
    if (inputQuestion.length === 0) {
      return;
    }

    setChat({
      answer: "",
      question: trimmedQuestion,
    });
    try {
      const res = await fetch(`${API_SERVER}/chat/chatbot`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          message: trimmedQuestion,
        }),
      });
      const data = await res.text();
      const normalizedData = data.slice(3, -3);
      setChat({
        question: inputQuestion,
        answer: normalizedData,
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <div className="p-4 font-bold text-2xl border-b">대화</div>
      <div className="w-full h-full flex-col flex justify-between">
        <div>
          {chat.question.length > 0 && (
            <div className="p-4 flex-col flex">
              <div className="font-bold text-xl">You:</div>
              <div className="text-lg">{chat.question}</div>
            </div>
          )}
          {chat.answer.length > 0 && (
            <div className="p-4 flex-col flex">
              <div className="font-bold text-xl">췍봇:</div>
              <TypeAnimation sequence={[chat.answer]} />
            </div>
          )}
        </div>
        <div className="w-full h-14 bg-gray-200 flex items-center justify-center gap-4 px-4">
          {chat.question.length === 0 && chat.answer.length === 0 && (
            <>
              <Input onChange={onChange} value={inputQuestion} type="text" />
              <Button onClick={onQuestion}>보내기</Button>
            </>
          )}
          {chat.question.length > 0 && chat.answer.length === 0 && (
            <div className="flex justify-center items-center gap-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 답변 기다리는 중
            </div>
          )}
          {chat.question.length > 0 && chat.answer.length > 0 && (
            <div className="flex justify-center items-center gap-2">
              <Button onClick={onReset}>다시 질문하기</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatView;