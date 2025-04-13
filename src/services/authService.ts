import { getDefaultStore } from "jotai/vanilla";
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  TokenRefreshResponse,
} from "@/types/authDTO";
import { apiCall } from "@/utils/apiUtils";
import { accessTokenAtom } from "@/stores/authStore";
import { getUserInfo, clearUserInfo } from "@/services/userService";
import { API_PATHS } from "@/constants/api-path";

const jotaiStore = getDefaultStore();

// 토큰 관련 함수
export const getAccessToken = (): string | null => {
  return jotaiStore.get(accessTokenAtom);
};

export const setAccessToken = (token: string | null): void => {
  jotaiStore.set(accessTokenAtom, token);
};

export const getAuthHeaders = (): HeadersInit => {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// 쿠키 관련 함수
export const setCookie = (name: string, value: string, days: number = 7) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `; expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}${expires}; path=/; secure; samesite=strict`;
};

export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

/**
 * 로그인
 * - 성공 시 accessToken 전역 상태에 저장, refreshToken 쿠키에 저장
 * - 성공 시 사용자 정보를 전역 상태에 저장
 * @throws {Error}
 */
export const signIn = async (data: SignInRequest): Promise<SignInResponse> => {
  try {
    const result = await apiCall<SignInRequest, SignInResponse>({
      method: "POST",
      path: API_PATHS.USER.SIGN_IN,
      data,
      withCredentials: true,
    });

    setAccessToken(result.accessToken);
    setCookie("refreshToken", result.refreshToken);

    // 로그인 성공 후 사용자 정보 로드
    await getUserInfo();

    return result;
  } catch (error) {
    console.error("로그인 에러:", error);
    throw error;
  }
};

export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  try {
    const requestBody = {
      email: data.email,
      password: data.password,
      provider: "LOCAL",
      providerId: 0,
      nickname: data.nickname,
      role: data.role,
      profileImageUrl: data.profileImageUrl || "",
    };

    const result = await apiCall<typeof requestBody, SignUpResponse>({
      method: "POST",
      path: API_PATHS.USER.SIGN_UP,
      data: requestBody,
      withCredentials: true,
    });

    return result;
  } catch (error) {
    console.error("회원가입 에러:", error);
    throw error;
  }
};

/**
 * 로그아웃
 * - 토큰 및 사용자 정보 초기화
 * - 홈 화면으로 이동
 */
export const logout = () => {
  setAccessToken(null);
  deleteCookie("refreshToken");
  clearUserInfo();

  window.location.href = "/";
};

/**
 * accessToken 갱신
 * - refreshToken을 활용한 새로운 토큰 발급 요청
 * - 성공 시 새 accessToken과 refreshToken을 저장
 * - 실패 시 로그아웃
 * @returns {Promise<boolean>} 토큰 갱신 성공 여부
 */
export const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const refreshToken = getCookie("refreshToken");

    if (!refreshToken) {
      console.error("토큰 갱신 실패: refreshToken 없음");
      logout();
      return false;
    }

    const BASE_URL = import.meta.env.DEV
      ? "/api"
      : import.meta.env.VITE_PUBLIC_API_URL;

    const response = await fetch(`${BASE_URL}${API_PATHS.USER.REISSUE}`, {
      method: "POST",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${refreshToken}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      console.error(`토큰 갱신 실패: ${response.status}`);
      logout();
      return false;
    }

    const result = (await response.json()) as TokenRefreshResponse;

    // 새 토큰 저장
    setAccessToken(result.accessToken);
    setCookie("refreshToken", result.refreshToken);

    return true;
  } catch (error) {
    console.error("토큰 갱신 중 오류:", error);
    logout();
    return false;
  }
};
