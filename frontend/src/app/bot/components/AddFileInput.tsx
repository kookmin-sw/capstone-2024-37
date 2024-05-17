import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { API_SERVER } from "@/config";
import useUser from "@/hooks/useUser";
import { sleep } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

const AddFileInput = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [file, setFile] = useState(null);

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
        const res = await fetch(`${API_SERVER}/chromadb/add-data-pdf`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
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

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <>
      <div className="mt-10 font-bold text-xl w-full max-w-sm">파일로 학습하기</div>
      <div className="mt-2 grid w-full max-w-sm items-center gap-2">
        <Label htmlFor="pdffile">파일을 선택해주세요 (PDF만 지원함)</Label>
        <Input id="pdffile" type="file" accept=".pdf" onChange={handleFileChange} />
        <Button onClick={onFile}>제출</Button>
      </div>
    </>
  );
};

export default AddFileInput;
