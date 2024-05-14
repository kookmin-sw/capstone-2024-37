"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/userAtom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const LoginStatus: React.FC = () => {
  const [user, setUser] = useAtom(userAtom);

  const onLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  if (!user?.token) {
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
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback>
              {user.email ? user.email[0].toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Link href="/myinfo">
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={onLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="ml-3">{user.email}</div>
    </div>
  );
};

export default LoginStatus;
