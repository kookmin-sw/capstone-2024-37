import AddKeywordDialog from "@/components/AddKeywordDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { API_SERVER } from "@/config";
import useUser from "@/hooks/useUser";
import { Label } from "@radix-ui/react-label";
import { XIcon } from "lucide-react";
import { useState } from "react";

const AddKeywordInput = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [keywords, setKeywords] = useState<string[]>([]);

  async function onKeyword() {
    if (keywords.length === 0) {
      return;
    }
    const joinedKeywords = keywords.join();
    try {
      const res = await fetch(`${API_SERVER}/chromadb/add-data-keyword`, {
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

  function removeKeyword(keyword: string) {
    setKeywords((prev) => prev.filter((v) => v !== keyword));
  }

  return (
    <>
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
    </>
  );
};

export default AddKeywordInput;
