"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import GoogleLoginButton from "./GoogleLoginButton";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { API_SERVER } from "@/config";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/userAtom";

export default function LoginPage() {
  const [user, setUser] = useAtom(userAtom);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.trim();
    setInputEmail(text);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.trim();
    setInputPassword(text);
  };

  async function onSignIn() {
    try {
      const res = await fetch(`${API_SERVER}/auth/sign-in`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "email",
          email: inputEmail,
          password: inputPassword,
        }),
      });
      const response = await res.json();
      if (response.data && response.message !== "User not found") {
        setUser({ email: inputEmail, token: response.data });
        window.location.href = "/";
        console.log("로그인 성공", response.message);
      } else {
        console.error("로그인 실패", response.message);
        alert("로그인 실패");
        setUser({ email: null, token: null });
      }
    } catch (e) {
      console.error(e);
      setUser({ email: null, token: null });
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-12 pt-[160px]">
      <div className="flex flex-col">
        <div className="font-bold">로그인</div>
        <div className="mt-4 flex flex-col gap-4">
          <Input
            onChange={onChangeEmail}
            type="email"
            placeholder="이메일"
          ></Input>
          <Input
            onChange={onChangePassword}
            type="password"
            placeholder="비밀번호"
          ></Input>
          <Button onClick={onSignIn}>로그인 하기</Button>
          <div className="flex items-center justify-around">
            <div className="text-xs">아직 회원이 아니신가요? </div>
            <Link href="/signup" className="text-xs font-bold text-blue-500">
              회원가입하기
            </Link>
          </div>
        </div>
        <Separator className="mt-4" />
        <div className="mt-4 flex flex-col justify-center items-center gap-4">
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
}
