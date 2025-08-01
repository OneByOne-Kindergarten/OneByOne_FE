export interface BlockUserRequestDTO {
  targetUserEmail: string;
}

export interface BlockedUserDTO {
  email: string;
  nickname: string;
  userRole: "TEACHER" | "PARENT" | "ADMIN";
  career: string;
  blockedAt: string;
}

export interface BlockedUsersResponseDTO {
  success: boolean;
  data: BlockedUserDTO[];
  message: string;
}

export interface BlockActionResponseDTO {
  success: boolean;
  data: Record<string, never>;
  message: string;
}

export interface UnblockUserRequestDTO {
  targetUserEmail: string;
}
