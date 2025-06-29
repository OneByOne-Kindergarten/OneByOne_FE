import { ReactNode, useEffect } from "react";
import { useAtom } from "jotai";
import { useNavigate, useLocation } from "react-router-dom";

import { getCookie, refreshAccessToken } from "@/services/authService";
import { userAtom } from "@/stores/userStore";
import { getUserInfo } from "@/services/userService";
import { URL_PATHS } from "@/constants/url-path";

const isIncompleteProfile = (role?: string | null) => {
  return !role || role === "GENERAL" || role === "";
};

/**
 * 인증 상태 관리 Provider
 * - 토큰 상태 확인 및 토큰 갱신
 * - 세션 복원 시 유저 정보 확인 및 필요 시 로드
 * - 토큰 기반 인증 상태에 따른 리다이렉트 처리
 * - 프로필 완성도에 따른 리다이렉트 처리
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

  // 프로필 완성도 및 인증 상태에 따른 리다이렉트 제어
  useEffect(() => {
    const accessToken = getCookie("accessToken");

    // 루트 경로 접근 제어
    if (location.pathname === URL_PATHS.ROOT) {
      if (accessToken && user) {
        if (isIncompleteProfile(user.role)) {
          navigate(URL_PATHS.USER_PROFILE_EDITOR);
        } else {
          navigate(URL_PATHS.HOME);
        }
      }
      return;
    }

    // 인증된 사용자의 프로필 완성도 확인
    if (accessToken && user) {
      const isProfileEditorPage =
        location.pathname === URL_PATHS.USER_PROFILE_EDITOR;

      if (isIncompleteProfile(user.role) && !isProfileEditorPage) {
        navigate(URL_PATHS.USER_PROFILE_EDITOR);
      }
    }
  }, [location.pathname, navigate, user]);

  return <>{children}</>;
}
