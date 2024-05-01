import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import GoogleLoginButton from "./GoogleLoginButton";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-12 pt-[160px]">
      <div className="flex flex-col">
        <div className="font-bold">로그인</div>
        <div className="mt-4 flex flex-col gap-4">
          <Input type="email" placeholder="이메일"></Input>
          <Input type="password" placeholder="비밀번호"></Input>
          <Button>로그인 하기</Button>
        </div>
        <Separator className="mt-8" />
        <div className="mt-4 flex flex-col justify-center items-center gap-4">
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
}
