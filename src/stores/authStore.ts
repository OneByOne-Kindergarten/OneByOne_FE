import { atom } from "jotai";

export const accessTokenAtom = atom<string | null>(null);

export const isAuthenticatedAtom = atom<boolean, [boolean], void>(
  (get) => !!get(accessTokenAtom),
  (get, set, value) => {
    set(accessTokenAtom, value ? "dummy" : null);
  }
);

export const authHeadersAtom = atom((get) => {
  const token = get(accessTokenAtom);
  return token ? { Authorization: `Bearer ${token}` } : {};
});
