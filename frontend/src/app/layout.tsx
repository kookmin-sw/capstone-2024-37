import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Providers } from "./provider";

import GoogleLoginButton from "@/components/GoogleLoginButton";
import Link from "next/link";

const notoSans = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "췍봇",
  description: "나만의 AI 웹 챗봇",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSans.className}>
        <Providers>
          <div className="fixed w-screen flex h-[80px] px-12 items-center justify-between backdrop-blur-sm z-[99]">
            <Link className="flex items-center gap-4" href="/">
              <Image src="/icons/logo.png" width={48} height={48} alt="" />
              <div className="bold text-3xl">췍봇</div>
            </Link>
            <div className="flex justify-center items-center gap-2">
              <GoogleLoginButton />
              <Button>회원가입</Button>
            </div>
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
