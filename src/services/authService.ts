import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "@/types/auth";
import { apiCall } from "@/utils/apiUtils";

let accessToken: string | null = null;

export const getAccessToken = (): string | null => {
  return accessToken;
};

export const setAccessToken = (token: string | null): void => {
  accessToken = token;
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
 * - 성공 시 accessToken 메모리에 저장, refreshToken 쿠키에 저장
 *
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

    console.log("회원가입 요청 데이터:", JSON.stringify(requestBody));

    return await apiCall<typeof requestBody, SignUpResponse>({
      method: "POST",
      path: "/users/sign-up",
      data: requestBody,
      withCredentials: true,
    });
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
 * - 실패 시 로그아웃 처리
 *
 * @throws {Error}
 */

export const refreshAccessToken = async (): Promise<void> => {
  try {
    const refreshToken = getCookie("refreshToken");

    if (!refreshToken) {
      throw new Error("refreshToken이 없습니다.");
    }

    // 토큰이 만료되면 로그아웃 처리
    logout();
  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    logout();
  }
};
