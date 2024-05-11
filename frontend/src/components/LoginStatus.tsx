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
    setUser({ email: null, token: null });
    localStorage.removeItem("token");
  };

  if (!user.token) {
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
          <Avatar className="mx-2">
            <AvatarFallback>
              {user.email ? user.email[0].toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => console.log("Profile selected")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={onLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {user.email}
    </div>
  );
};

export default LoginStatus;
