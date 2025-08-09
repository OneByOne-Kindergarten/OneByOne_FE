import { atom } from "jotai";

import { User } from "@/entities/user/types";

export const userAtom = atom<User | null>(null);
export const hasUserInfoAtom = atom((get) => !!get(userAtom));
