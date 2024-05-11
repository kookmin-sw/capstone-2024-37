import { atomWithStorage } from "jotai/utils";

export interface UserState {
  email: string | null;
  token: string | null;
}

export const userAtom = atomWithStorage<UserState>("user", {
  email: null,
  token: null,
});
