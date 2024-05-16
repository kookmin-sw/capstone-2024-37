"use client";

import useUser from "@/hooks/useUser";
import Link from "next/link";

const MyPageControl = () => {
  const { user } = useUser();

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
