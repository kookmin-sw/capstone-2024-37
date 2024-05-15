"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { API_SERVER } from "@/config";
import useUser from "@/hooks/useUser";
import { useState } from "react";

export default function BotPage() {
  const { user } = useUser();
  const { toast } = useToast();
  const [url, setUrl] = useState("");

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center px-12 pt-[160px]">
        <div>로그인후 이용해주세요.</div>
      </div>
    );
  }

  async function onUrl() {
    if (!url || url.length === 0) return;

    const res = await fetch(`${API_SERVER}/chromadb/add-data`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jwt_token: user?.token,
        data_type: "url",
        data: url,
      }),
    });

    if (res.ok) {
      toast({
        title: "봇 수정하기",
        description: "✅ URL이 성공적으로 학습되었습니다",
      });
      return;
    }

    toast({
      title: "봇 수정하기",
      description: "❌ 문제가 생겼어요",
    });
  }

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-12 pt-[160px]">
      <div className="font-bold text-3xl">봇 수정하기</div>
      <div className="mt-4 text-slate-500">
        나만의 개인 비서 췍봇은 <span className="font-bold">제공해주신 정보를 기반으로 봇을 학습</span>합니다.
      </div>
      <div className="mt-10 grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="url">본인의 웹사이트 주소를 입력해주세요.</Label>
        <Input value={url} onChange={(e) => setUrl(e.target.value)} type="url" id="url" placeholder="웹사이트 주소" />
        <Button onClick={onUrl}>제출</Button>
      </div>
    </div>
  );
}
