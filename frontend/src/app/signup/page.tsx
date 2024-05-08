"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import GoogleLoginButton from "../login/GoogleLoginButton";
import Link from "next/link";
import { API_SERVER } from "@/config";
import { ChangeEvent, useEffect, useState } from "react";
import test from "node:test";

export default function SignupPage() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputVerifyPassword, setInputVerifyPassword] = useState("");
  const [isVerify, setIsVerify] = useState(true);
  const [inputCompanyName, setInputCompanyName] = useState("");

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.trim();
    setInputEmail(text);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.trim();
    setInputPassword(text);
  };

  const onChangeVerifyPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.trim();
    setInputVerifyPassword(text);
  };

  useEffect(() => {
    const isValid =
      inputPassword === inputVerifyPassword && inputVerifyPassword.length !== 0;
    setIsVerify(isValid);
  }, [inputPassword, inputVerifyPassword]);

  const onChangeCompanyName = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.trim();
    setInputCompanyName(text);
  };

  async function onSignUp() {
    if (!inputEmail) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!inputEmail.includes("@")) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }
    if (inputPassword.length < 6) {
      alert("비밀번호는 6자리 이상이어야 합니다.");
      return;
    }
    if (!isVerify) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!inputCompanyName) {
      alert("회사 이름을 입력해주세요.");
      return;
    }
    try {
      const res = await fetch(`${API_SERVER}/auth/sign-up`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "email",
          company_name: inputCompanyName,
          email: inputEmail,
          password: inputPassword,
        }),
      });
      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-12 pt-[160px]">
      <div className="flex flex-col">
        <div className="font-bold">회원가입</div>
        <div className="mt-4 flex flex-col gap-4">
          <Input
            onChange={onChangeEmail}
            value={inputEmail}
            type="email"
            placeholder="이메일"
          />
          <Input
            onChange={onChangePassword}
            value={inputPassword}
            type="password"
            placeholder="비밀번호"
          />
          <div className="flex flex-col items-center">
            <Input
              onChange={onChangeVerifyPassword}
              value={inputVerifyPassword}
              type="password"
              placeholder="비밀번호 확인"
            />
            {!isVerify && inputVerifyPassword.length > 0 && (
              <div className="text-xs mt-2">비밀번호가 일치하지 않습니다.</div>
            )}
          </div>
          <Input
            onChange={onChangeCompanyName}
            value={inputCompanyName}
            type="companyname"
            placeholder="회사 이름"
          />
          <Button onClick={onSignUp}>회원가입 하기</Button>
        </div>
        <div className="flex items-center mt-4 justify-around">
          <div className="text-xs ">이미 회원이신가요?</div>
          <Link href="/login" className="text-xs font-bold text-blue-500">
            로그인하러가기
          </Link>
        </div>
        <Separator className="mt-4" />
        <div className="mt-4 flex flex-col justify-center items-center gap-4">
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
}
