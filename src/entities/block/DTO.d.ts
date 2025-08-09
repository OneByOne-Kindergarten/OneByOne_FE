export interface BlockUserRequest {
  targetUserEmail: string;
}

export interface BlockedUser {
  email: string;
  nickname: string;
  userRole: "TEACHER" | "PARENT" | "ADMIN";
  career: string;
  blockedAt: string;
}

export interface BlockedUsersResponse {
  success: boolean;
  data: BlockedUser[];
  message: string;
}

export interface BlockActionResponse {
  success: boolean;
  data: Record<string, never>;
  message: string;
}

export interface UnblockUserRequest {
  targetUserEmail: string;
}
