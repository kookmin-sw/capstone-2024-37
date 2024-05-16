"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/useUser";
import Link from "next/link";

export default function MyInfo() {
  const { user } = useUser();
  return (
    <main className="flex min-h-screen flex-col items-center px-12 pt-[160px]">
      <div>
        <div className="font-bold text-xl">안녕하세요!</div>
        <div className="flex flex-col justify-center items-center">
          <Avatar className="mt-10">
            <AvatarFallback>{user?.email ? user.email[0].toUpperCase() : "U"}</AvatarFallback>
          </Avatar>
          <div className="mt-4">{user?.email}</div>
        </div>
        <div className="mt-10 font-bold">내 클라이언트 ID</div>
        <div className="text-slate-400 text-sm">아래 클라이언트 ID를 복사 하여 사용하세요(사용법 참조)</div>
        <div className="mt-10 border px-4 py-2">{user?.clientID}</div>
      </div>
      <Link href="/howto" className="mt-10">
        <Button>사용법 바로가기</Button>
      </Link>
    </main>
  );
}
