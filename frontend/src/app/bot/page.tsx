"use client";

import useUser from "@/hooks/useUser";

export default function BotPage() {
  const { user, setUser } = useUser();

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center px-12 pt-[160px]">
        <div>로그인후 이용해주세요.</div>
      </div>
    );
  }

  return <div className="flex min-h-screen flex-col items-center px-12 pt-[160px]">{user?.token}</div>;
}
