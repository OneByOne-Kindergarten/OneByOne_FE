export interface SignUpRequest {
  email: string;
  password: string;
  provider: "LOCAL" | "GOOGLE" | "APPLE";
  providerId: number;
  nickname: string;
  role: "TEACHER" | "PRE_TEACHER" | "ADMIN";
  profileImageUrl: string | null;
}

export interface SignUpResponse {
  email: string;
  password: string;
  provider: "LOCAL" | "GOOGLE" | "APPLE";
  providerId: number;
  nickname: string;
  role: "TEACHER" | "PRE_TEACHER" | "ADMIN";
  profileImageUrl: string | null;
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
