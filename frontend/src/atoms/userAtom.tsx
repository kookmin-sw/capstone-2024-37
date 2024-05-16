import { atomWithStorage } from "jotai/utils";

export interface UserState {
  token: string;
  email?: string;
  clientID?: string;
  company?: string;
}

export const userAtom = atomWithStorage<UserState | null>("user", null);
