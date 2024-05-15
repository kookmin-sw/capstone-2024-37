"use client";

import { userAtom } from "@/atoms/userAtom";
import { useAtom } from "jotai";
import Link from "next/link";

const MyPageControl = () => {
  const [user] = useAtom(userAtom);

  if (!user) {
    return null;
  }

  return (
    <div>
      <Link className="text-lg hover:opacity-50 font-semibold" href="/bot">
        봇 수정하기
      </Link>
    </div>
  );
};

export default MyPageControl;
