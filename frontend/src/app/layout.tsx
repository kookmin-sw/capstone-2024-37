import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Providers from "./Provider";
import Link from "next/link";
import WrappedChatBot from "./WrappedChatBot";
import { useState } from "react";
import LoginStatus from "@/components/LoginStatus";

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
        <WrappedChatBot />
        <div className="fixed w-screen flex h-[80px] px-12 items-center justify-between backdrop-blur-sm z-[99]">
          <Link href="/" className="flex items-center justify-center gap-4">
            <Image src="/icons/logo.png" width={48} height={48} alt="" />
            <div className="bold text-3xl">췍봇</div>
          </Link>
          <LoginStatus />
        </div>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
