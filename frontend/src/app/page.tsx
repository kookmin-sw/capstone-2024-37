import LoginDialog from "@/components/LoginDialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-12 pt-[160px]">
      <div className="font-bold text-6xl">웹사이트의 미래는 AI입니다</div>
      <div className="font-bold text-2xl text-gray-500 mt-8">나만의 웹사이트에 쉽게 연동 해보세요.</div>
      <Button className="mt-8 px-4 py-6 text-lg">무료로 시작하기 →</Button>
      <div className="w-screen flex items-center justify-center overflow-hidden mt-10">
        <div className="relative w-[2128px] h-[187px]">
          <Image src="/icons/hero.webp" fill objectFit="cover" alt="" />
        </div>
      </div>
      <div className="mt-[200px] text-3xl font-bold">췍봇이 바꿀 미래는 어떤 모습일까요?</div>
      <div className="text-3xl font-bold">다양한 사례를 확인하세요.</div>
      <div className="h-screen w-screen flex justify-center items-center">사례 이미지들</div>
    </main>
  );
}
