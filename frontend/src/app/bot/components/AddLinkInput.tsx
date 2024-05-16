import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { API_SERVER } from "@/config";
import useUser from "@/hooks/useUser";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

const AddLinkInput = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [url, setUrl] = useState("");

  async function onUrl() {
    if (!url || url.length === 0) return;
    try {
      const res = await fetch(`${API_SERVER}/chromadb/add-data-url`, {
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

  return (
    <>
      <div className="mt-10 font-bold text-xl w-full max-w-sm">주소로 학습하기</div>
      <div className="mt-2 grid w-full max-w-sm items-center gap-2">
        <Label htmlFor="url">본인의 웹사이트 주소를 입력해주세요.</Label>
        <Input value={url} onChange={(e) => setUrl(e.target.value)} type="url" id="url" placeholder="웹사이트 주소" />
        <Button onClick={onUrl}>제출</Button>
      </div>
    </>
  );
};

export default AddLinkInput;
