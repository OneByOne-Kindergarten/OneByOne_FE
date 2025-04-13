export interface SignUpRequest {
  email: string;
  password: string;
  provider: "LOCAL" | "GOOGLE" | "APPLE";
  providerId: number;
  nickname: string;
  role: "TEACHER" | "PROSPECTIVE_TEACHER" | "ADMIN";
  profileImageUrl: string;
}

export interface SignUpResponse {
  email: string;
  password: string;
  provider: "LOCAL" | "GOOGLE" | "APPLE";
  providerId: number;
  nickname: string;
  role: "TEACHER" | "PROSPECTIVE_TEACHER" | "ADMIN";
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
