import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { API_SERVER } from "@/config";
import useUser from "@/hooks/useUser";

const ResetChatbot = () => {
  const { user } = useUser();
  const { toast } = useToast();

  async function resetChatbot() {
    try {
      const res = await fetch(`${API_SERVER}/chromadb/reset-data`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jwt_token: user?.token,
        }),
      });

      if (res.ok) {
        toast({
          title: "봇 리셋하기",
          description: "✅ 봇을 성공적으로 리셋하였습니다.",
        });
        return;
      }
    } catch (error) {
      console.error(error);
    }
    toast({
      title: "봇 리셋하기",
      description: "❌ 문제가 생겼어요",
    });
  }

  return (
    <Button onClick={resetChatbot} className="mt-10">
      챗봇 리셋하기
    </Button>
  );
};

export default ResetChatbot;
