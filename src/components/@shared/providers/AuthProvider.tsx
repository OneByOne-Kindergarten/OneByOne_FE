import { ReactNode, useEffect } from "react";
import { useAtom } from "jotai";
import { accessTokenAtom, isAuthenticatedAtom } from "@/stores/authStore";
import { getCookie } from "@/services/authService";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useAtom(accessTokenAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);

  useEffect(() => {
    const refreshToken = getCookie("refreshToken");
  }, [token, isAuthenticated]);

  return <>{children}</>;
}
