import { ReactNode, useEffect } from "react";
import { useAtom } from "jotai";
import { accessTokenAtom } from "@/stores/authStore";
import { getCookie, refreshAccessToken } from "@/services/authService";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useAtom(accessTokenAtom);

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const refreshToken = getCookie("refreshToken");

      if (refreshToken) {
        if (!token) {
          await refreshAccessToken();
        }
      }
    };

    checkAndRefreshToken();
  }, [token]);

  return <>{children}</>;
}
