"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import useUser from "@/hooks/useUser";

const LoginStatus: React.FC = () => {
  const { user, setUser, isLoggedIn } = useUser();

  const onLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center gap-2">
        <Link href="/login">
          <Button variant="secondary">로그인</Button>
        </Link>
        <Link href="/signup">
          <Button>회원가입</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex justify-center items-center">
          <Avatar>
            <AvatarFallback>{user?.email ? user.email[0].toUpperCase() : "U"}</AvatarFallback>
          </Avatar>
          <div className="ml-3">{user?.email}</div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border py-2 px-1 w-[150px]">
          <DropdownMenuItem className="hover:bg-slate-200 w-full py-0.5 px-2">
            <Link href="/myinfo">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="hover:bg-slate-200 w-full py-0.5 px-2 cursor-pointer" onSelect={onLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LoginStatus;
