"use client";

import AddKeywordDialog from "@/components/AddKeywordDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { API_SERVER } from "@/config";
import useUser from "@/hooks/useUser";
import { XIcon } from "lucide-react";
import { useState } from "react";

export default function BotPage() {
  const { user, isLoggedIn } = useUser();
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [file, setFile] = useState(null);

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen flex-col items-center px-12 pt-[160px]">
        <div>로그인후 이용해주세요.</div>
      </div>
    );
  }

  async function onUrl() {
    if (!url || url.length === 0) return;

    try {
      const res = await fetch(`${API_SERVER}/chromadb/add-data`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jwt_token: user?.token,
          data_type: "url",
          data: url,
        }),
      });

      if (res.ok) {
        toast({
          title: "봇 수정하기",
          description: "✅ URL을 성공적으로 학습하였습니다",
        });
        return;
      }
    } catch (error) {
      console.error(error);
    }
    toast({
      title: "봇 수정하기",
      description: "❌ 문제가 생겼어요",
    });
  }

  async function onKeyword() {
    if (keywords.length === 0) {
      return;
    }
    const joinedKeywords = keywords.join();
    try {
      const res = await fetch(`${API_SERVER}/chromadb/add-data`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jwt_token: user?.token,
          data_type: "keyword",
          data: joinedKeywords,
        }),
      });

      if (res.ok) {
        toast({
          title: "봇 수정하기",
          description: "✅ 키워드를 성공적으로 학습하였습니다",
        });
        return;
      }
    } catch (error) {
      console.error(error);
    }
    toast({
      title: "봇 수정하기",
      description: "❌ 문제가 생겼어요",
    });
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  async function onFile() {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      toast({
        title: "봇 수정하기",
        description: "⏳ 파일 업로드 중...",
      });
      const resUpload = await fetch(`${API_SERVER}/file/upload-pdf`, {
        method: "POST",
        body: formData,
      });

      if (resUpload.ok) {
        const filename = (await resUpload.json()).filename;
        const res = await fetch(`${API_SERVER}/chromadb/add-data`, {
          method: "POST",
          body: JSON.stringify({
            jwt_token: user?.token,
            data_type: "pdf",
            data: filename,
          }),
        });
        if (res.ok) {
          toast({
            title: "봇 수정하기",
            description: "✅ 파일을 성공적으로 학습하였습니다",
          });
          return;
        }
      }
    } catch (error) {
      console.error(error);
    }
    toast({
      title: "봇 수정하기",
      description: "❌ 문제가 생겼어요",
    });
  }

  function removeKeyword(keyword: string) {
    setKeywords((prev) => prev.filter((v) => v !== keyword));
  }

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-12 pt-[160px]">
      <div className="font-bold text-3xl">봇 수정하기</div>
      <div className="mt-4 text-slate-500">
        나만의 개인 비서 췍봇은 <span className="font-bold">제공해주신 정보를 기반으로 봇을 학습</span>합니다.
      </div>
      <div className="mt-10 font-bold text-xl w-full max-w-sm">주소로 학습하기</div>
      <div className="mt-2 grid w-full max-w-sm items-center gap-2">
        <Label htmlFor="url">본인의 웹사이트 주소를 입력해주세요.</Label>
        <Input value={url} onChange={(e) => setUrl(e.target.value)} type="url" id="url" placeholder="웹사이트 주소" />
        <Button onClick={onUrl}>제출</Button>
      </div>
      <div className="mt-10 font-bold text-xl w-full max-w-sm">키워드로 학습하기</div>
      <div className="mt-2 grid w-full max-w-sm items-center gap-2">
        <Label htmlFor="url">관련된 키워드를 추가 해주세요</Label>
        <div className="flex gap-2">
          {keywords.map((keyword) => (
            <Badge className="w-fit whitespace-nowrap" variant="outline" key={keyword}>
              {keyword}
              <XIcon className="pl-1" size={18} onClick={() => removeKeyword(keyword)} />
            </Badge>
          ))}
          <AddKeywordDialog setKeywords={setKeywords} />
        </div>
        <Button onClick={onKeyword}>제출</Button>
      </div>
      <div className="mt-10 font-bold text-xl w-full max-w-sm">파일로 학습하기</div>
      <div className="mt-2 grid w-full max-w-sm items-center gap-2">
        <Label htmlFor="pdffile">파일을 선택해주세요 (PDF만 지원함)</Label>
        <Input id="pdffile" type="file" accept=".pdf" onChange={handleFileChange} />
        <Button onClick={onFile}>제출</Button>
      </div>
    </div>
  );
}
