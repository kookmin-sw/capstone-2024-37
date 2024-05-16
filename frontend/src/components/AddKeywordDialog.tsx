import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Dispatch, SetStateAction, useState } from "react";

interface AddKeywordDialogProps {
  setKeywords: Dispatch<SetStateAction<string[]>>;
}

const AddKeywordDialog: React.FC<AddKeywordDialogProps> = ({ setKeywords }) => {
  const [temp, setTemp] = useState("");

  function save() {
    if (!temp || temp.length === 0) return;
    setKeywords((prev) => [...prev, temp.trim()]);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Badge className="cursor-pointer" variant="outline">
          +
        </Badge>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>키워드 추가하기</DialogTitle>
          <Input value={temp} onChange={(e) => setTemp(e.target.value)} />
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={save}>저장하기</Button>
            </DialogClose>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddKeywordDialog;
