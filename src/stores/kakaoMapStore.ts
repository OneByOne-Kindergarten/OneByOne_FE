import { atom } from "jotai";

export const kakaoMapSDKLoadedAtom = atom<boolean>(false);
export const kakaoMapErrorAtom = atom<ErrorEvent | undefined>(undefined);
