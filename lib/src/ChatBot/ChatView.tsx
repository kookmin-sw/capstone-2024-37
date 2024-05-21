import { Loader2, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
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
  const [showThumb, setShowThumb] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputQuestion(e.target.value);
  };

  const onReset = (e: any) => {
    setChat({ question: "", answer: "" });
    setShowThumb(false);
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
      const res = await fetch(`${API_SERVER}/chat/chatbot-chain`, {
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
      setChat({
        question: inputQuestion,
        answer: data,
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
              <TypeAnimation sequence={[chat.answer, () => setShowThumb(true)]} />
              {showThumb && (
                <div className="mt-2.5 flex gap-2 items-center">
                  <ThumbsUpIcon className="cursor-pointer hover:opacity-50" size={14} />
                  <ThumbsDownIcon className="cursor-pointer hover:opacity-50" size={14} />
                </div>
              )}
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
