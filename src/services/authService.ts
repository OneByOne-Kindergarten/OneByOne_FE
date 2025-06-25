import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  TokenRefreshResponse,
  NaverCallbackRequest,
  KakaoCallbackRequest,
} from "@/types/authDTO";
import { apiCall } from "@/utils/apiUtils";
import { getUserInfo, clearUserInfo } from "@/services/userService";
import { API_PATHS } from "@/constants/api-path";

export const setCookie = (name: string, value: string, days: number = 7) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `; expires=${date.toUTCString()}`;

  /// TODO : HTTPS 적용 이후 secure 추가 및 SameSite 조정 필요
  document.cookie = `${name}=${value}${expires}; path=/; SameSite=Lax`;
};

export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

export const deleteCookie = (name: string) => {
  /// TODO : HTTPS 적용 이후 secure 추가 및 SameSite 조정 필요
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
};

export const getAccessToken = (): string | null => {
  return getCookie("accessToken");
};

export const getAuthHeaders = (): HeadersInit => {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * 로그인
 * - 성공 시 accessToken과 refreshToken을 쿠키에 저장
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

    setCookie("accessToken", result.accessToken);
    setCookie("refreshToken", result.refreshToken);

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

export const signOut = async (): Promise<void> => {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
  clearUserInfo();
};

/**
 * accessToken 갱신
 * - refreshToken을 활용한 새로운 토큰 발급 요청
 * - 성공 시 새 accessToken과 refreshToken을 쿠키에 저장
 * - 실패 시 로그아웃
 * @returns {Promise<boolean>} 토큰 갱신 성공 여부
 */
export const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const refreshToken = getCookie("refreshToken");

    if (!refreshToken) {
      console.error("토큰 갱신 실패: refreshToken 없음");
      signOut();
      return false;
    }

    const BASE_URL = import.meta.env.DEV
      ? "/api"
      : import.meta.env.VITE_API_URL || "";

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
      signOut();
      return false;
    }

    const result = (await response.json()) as TokenRefreshResponse;

    // 새 토큰을 쿠키에 저장
    setCookie("accessToken", result.accessToken);
    setCookie("refreshToken", result.refreshToken);

    return true;
  } catch (error) {
    console.error("토큰 갱신 중 오류:", error);
    signOut();
    return false;
  }
};

/**
 * 네이버 소셜 로그인
 * @param data - 인증 코드, 상태값
 * @returns {Promise<SignInResponse>}
 */
export const naverCallback = async (
  data: NaverCallbackRequest
): Promise<SignInResponse> => {
  try {
    const result = await apiCall<NaverCallbackRequest, SignInResponse>({
      method: "POST",
      path: "/users/naver/callback",
      data,
      withCredentials: true,
    });

    setCookie("accessToken", result.accessToken);
    setCookie("refreshToken", result.refreshToken);

    await getUserInfo();

    return result;
  } catch (error) {
    console.error("네이버 로그인 에러:", error);
    throw error;
  }
};

/**
 * 카카오 소셜 로그인
 * @param data - 인증 코드
 * @returns {Promise<SignInResponse>}
 */
export const kakaoCallback = async (
  data: KakaoCallbackRequest
): Promise<SignInResponse> => {
  try {
    const result = await apiCall<KakaoCallbackRequest, SignInResponse>({
      method: "POST",
      path: "/users/kakao/callback",
      data,
      withCredentials: true,
    });

    setCookie("accessToken", result.accessToken);
    setCookie("refreshToken", result.refreshToken);

    await getUserInfo();

    return result;
  } catch (error) {
    console.error("카카오 로그인 에러:", error);
    throw error;
  }
};
