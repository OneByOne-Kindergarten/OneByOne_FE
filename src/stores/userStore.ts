import { atom } from "jotai";

import { User } from "@/types/userDTO";

export const userAtom = atom<User | null>(null);
export const hasUserInfoAtom = atom((get) => !!get(userAtom));
