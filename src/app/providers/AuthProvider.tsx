import { useAtom } from "jotai";
import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { userAtom } from "@/entities/auth/model";
import { getUserInfo } from "@/entities/user/api";
import {
  getCookie,
  refreshAccessToken,
} from "@/features/auth/services/authService";
import { URL_PATHS } from "@/shared/constants/url-path";

const isIncompleteProfile = (role?: string | null) => {
  return !role || role === "GENERAL" || role === "";
};

const publicPages = [
  URL_PATHS.ROOT,
  URL_PATHS.SIGNIN,
  URL_PATHS.SIGNUP,
  URL_PATHS.FIND_PASSWORD,
  URL_PATHS.KAKAO_CALLBACK,
  URL_PATHS.NAVER_CALLBACK,
  URL_PATHS.APPLE_CALLBACK,
];

/**
 * 인증 상태 관리 Provider
 * - 토큰 상태 확인 및 토큰 갱신
 * - 세션 복원 및 사용자 정보 확인 및 필요시 리로드
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

  // 인증된 상태에서 사용자 정보 로드
  useEffect(() => {
    const loadUserInfoIfNeeded = async () => {
      const accessToken = getCookie("accessToken");
      if (accessToken && !user) {
        try {
          await getUserInfo();
        } catch (error) {
          console.error("사용자 정보 로드 실패:", error);
        }
      }
    };

    loadUserInfoIfNeeded();
  }, [user]);

  // 프로필 완성도 및 인증 상태에 따른 리다이렉트 처리
  useEffect(() => {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    const isPublicPage = publicPages.includes(location.pathname);

    // 루트 페이지 접근 처리
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

    // 미인증 사용자의 페이지 접근 처리
    if (!accessToken) {
      if (!refreshToken && !isPublicPage) {
        navigate(URL_PATHS.ROOT);
        return;
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
