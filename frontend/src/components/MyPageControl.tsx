"use client";

import { userAtom } from "@/atoms/userAtom";
import { useAtom } from "jotai";
import Link from "next/link";

const MyPageControl = () => {
  const [user] = useAtom(userAtom);

  return (
    <div>
      {user?.token && (
        <Link className="text-lg hover:opacity-50" href="/mypage">
          내 프로젝트
        </Link>
      )}
    </div>
  );
};

export default MyPageControl;
