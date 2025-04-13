import { ReactNode, useEffect } from "react";
import { useAtom } from "jotai";
import { accessTokenAtom, isAuthenticatedAtom } from "@/stores/authStore";
import { getCookie, refreshAccessToken } from "@/services/authService";
import { userAtom } from "@/stores/userStore";
import { getUserInfo } from "@/services/userService";

/**
 * 인증 상태 관리 Provider
 * - 토큰 상태 확인 및 토큰 갱신
 * - 세션 복원 시 유저 정보 확인 및 필요 시 로드
 */
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useAtom(accessTokenAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user] = useAtom(userAtom);

  useEffect(() => {
    const initializeAuth = async () => {
      const refreshToken = getCookie("refreshToken");

      if (refreshToken && !token) {
        await refreshAccessToken();
      }
    };

    initializeAuth();
  }, [token]);

  useEffect(() => {
    const loadUserInfoIfNeeded = async () => {
      if (isAuthenticated && !user) {
        await getUserInfo();
      }
    };

    loadUserInfoIfNeeded();
  }, [isAuthenticated, user]);

  return <>{children}</>;
}
