"use client";

import useUser from "@/hooks/useUser";
import AddLinkInput from "./components/AddLinkInput";
import AddKeywordInput from "./components/AddKeywordInput";
import AddFileInput from "./components/AddFileInput";

export default function BotPage() {
  const { isLoggedIn } = useUser();

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen flex-col items-center px-12 pt-[160px]">
        <div>로그인후 이용해주세요.</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-12 pt-[160px]">
      <div className="font-bold text-3xl">봇 수정하기</div>
      <div className="mt-4 text-slate-500">
        나만의 개인 비서 췍봇은 <span className="font-bold">제공해주신 정보를 기반으로 봇을 학습</span>합니다.
      </div>
      <AddLinkInput />
      <AddKeywordInput />
      <AddFileInput />
    </div>
  );
}
