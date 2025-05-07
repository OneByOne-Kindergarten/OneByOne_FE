import { ReactNode, useEffect } from "react";
import { useAtom } from "jotai";
import { useNavigate, useLocation } from "react-router-dom";

import { getCookie, refreshAccessToken } from "@/services/authService";
import { userAtom } from "@/stores/userStore";
import { getUserInfo } from "@/services/userService";
import { URL_PATHS } from "@/constants/url-path";

/**
 * 인증 상태 관리 Provider
 * - 토큰 상태 확인 및 토큰 갱신
 * - 세션 복원 시 유저 정보 확인 및 필요 시 로드
 * - 토큰 기반 인증 상태에 따른 리다이렉트 처리
 */
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  const location = useLocation();

  // 토큰 갱신 및 초기화
  useEffect(() => {
    const initializeAuth = async () => {
      const refreshToken = getCookie("refreshToken");
      const accessToken = getCookie("accessToken");

      if (refreshToken && !accessToken) {
        try {
          await refreshAccessToken();
        } catch (error) {
          console.error("토큰 갱신 실패:", error);
          navigate(URL_PATHS.ROOT);
        }
      }
    };

    initializeAuth();
  }, [navigate]);

  // 인증된 상태에서만 유저 정보 로드
  useEffect(() => {
    const loadUserInfoIfNeeded = async () => {
      const accessToken = getCookie("accessToken");
      if (accessToken && !user) {
        try {
          await getUserInfo();
        } catch (error) {
          console.error("유저 정보 로드 실패:", error);
        }
      }
    };

    loadUserInfoIfNeeded();
  }, [user]);

  // 루트 경로 접근 제어
  useEffect(() => {
    if (location.pathname === URL_PATHS.ROOT) {
      const accessToken = getCookie("accessToken");
      if (accessToken) {
        navigate(URL_PATHS.HOME);
      }
    }
  }, [location.pathname, navigate]);

  return <>{children}</>;
}
