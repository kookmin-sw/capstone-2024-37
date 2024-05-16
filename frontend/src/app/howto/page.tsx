import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const codeInstall = `npm install @checkbot/checkbot`;
const codeUse = `"use client";

import ChatBot from "@checkbot/checkbot";
import "@checkbot/checkbot/dist/index.css";

const WrappedChatBot = () => {
  return <ChatBot clientId={/*내 클라이언트 아이디*/} />;
};

export default WrappedChatBot;`;

export default function HowtoPage() {
  return (
    <div className="flex min-h-screen flex-col items-center px-12 pt-[160px]">
      <div className="flex flex-col gap-10">
        <div className="font-bold text-3xl text-start">사용법</div>
        <div>
          <div>1. 라이브러리 설치하기</div>
          <SyntaxHighlighter style={docco}>{codeInstall}</SyntaxHighlighter>
        </div>
        <div>
          <div>2. 챗봇 코드에서 사용하기 (Next.js 기준)</div>
          <SyntaxHighlighter language="typescript" style={docco}>
            {codeUse}
          </SyntaxHighlighter>
          <div>클라이언트 아이디는 내 프로필에서 확인하세요.</div>
        </div>
      </div>
    </div>
  );
}
