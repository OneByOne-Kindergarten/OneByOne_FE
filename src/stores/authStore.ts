import { atom } from "jotai";

export const accessTokenAtom = atom<string | null>(null);

export const isAuthenticatedAtom = atom((get) => !!get(accessTokenAtom));

export const authHeadersAtom = atom((get) => {
  const token = get(accessTokenAtom);
  return token ? { Authorization: `Bearer ${token}` } : {};
});
