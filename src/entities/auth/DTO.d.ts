export interface SignUpRequest {
  email: string;
  password: string;
  provider: "LOCAL" | "GOOGLE" | "APPLE" | "KAKAO" | "NAVER";
  providerId: number;
  nickname: string;
  role: "TEACHER" | "PROSPECTIVE_TEACHER" | "ADMIN" | "GENERAL";
  profileImageUrl: string;
}

export interface SignUpResponse {
  email: string;
  password: string;
  provider: "LOCAL" | "GOOGLE" | "APPLE" | "KAKAO" | "NAVER";
  providerId: number;
  nickname: string;
  role: "TEACHER" | "PROSPECTIVE_TEACHER" | "ADMIN" | "GENERAL";
  profileImageUrl: string;
}

export interface SignInRequest {
  email: string;
  password: string;
  fcmToken: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}

export interface TokenRefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface NaverCallbackRequest {
  code: string;
  state: string;
  fcmToken?: string;
}

export interface KakaoCallbackRequest {
  code: string;
  fcmToken?: string;
}

export interface AppleCallbackRequest {
  id_token: string;
  fcmToken?: string;
}
