import { atom } from "jotai";
import { getCookie } from "@/services/authService";

export const accessTokenAtom = atom<string | null>(null);

export const isAuthenticatedAtom = atom<boolean, [boolean], void>(
  (get) => !!get(accessTokenAtom),
  (_, set, value) => {
    set(accessTokenAtom, value ? "dummy" : null);
  }
);

export const authHeadersAtom = atom(() => {
  const token = getCookie("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
});
