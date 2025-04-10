import { getDefaultStore } from "jotai/vanilla";
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "@/types/authDTO";
import { apiCall } from "@/utils/apiUtils";
import { accessTokenAtom } from "@/stores/authStore";

const jotaiStore = getDefaultStore();

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
 * - 성공 시 accessToken을 Jotai 상태에 저장, refreshToken 쿠키에 저장
 * @throws {Error}
 */

export const signIn = async (data: SignInRequest): Promise<SignInResponse> => {
  try {
    const result = await apiCall<SignInRequest, SignInResponse>({
      method: "POST",
      path: "/users/sign-in",
      data,
      withCredentials: true,
    });

    setAccessToken(result.accessToken);
    setCookie("refreshToken", result.refreshToken);

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
      path: "/users/sign-up",
      data: requestBody,
      withCredentials: true,
    });

    return result;
  } catch (error) {
    console.error("회원가입 에러:", error);
    throw error;
  }
};

export const logout = () => {
  setAccessToken(null);
  deleteCookie("refreshToken");

  window.location.href = "/";
};

/**
 * accessToken 갱신
 * - refreshToken을 활용한 새로운 토큰 발급 요청
 * - 성공 시 새 accessToken과 refreshToken을 저장
 * - 실패 시 로그아웃
 * @throws {Error}
 */

export const refreshAccessToken = async (): Promise<void> => {
  try {
    const refreshToken = getCookie("refreshToken");

    if (!refreshToken) {
      throw new Error("refreshToken이 없습니다.");
    }

    /* 
    const response = await apiCall<...>({...});
    setAccessToken(response.accessToken);
    setCookie("refreshToken", response.refreshToken);
    */

    return;
  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    logout();
  }
};
