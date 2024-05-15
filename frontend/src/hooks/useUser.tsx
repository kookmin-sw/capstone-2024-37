import { userAtom } from "@/atoms/userAtom";
import { useAtom } from "jotai";

const useUser = () => {
  const [user, setUser] = useAtom(userAtom);
  return { user, setUser, isLoggedIn: !!user?.token };
};

export default useUser;
