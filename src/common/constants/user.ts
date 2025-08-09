export const USER_ROLE = {
  TEACHER: "TEACHER",
  PROSPECTIVE_TEACHER: "PROSPECTIVE_TEACHER",
  ADMIN: "ADMIN",
  GENERAL: "GENERAL",
} as const;

export const USER_ROLE_LABEL = {
  [USER_ROLE.TEACHER]: "교사",
  [USER_ROLE.PROSPECTIVE_TEACHER]: "예비교사",
  [USER_ROLE.ADMIN]: "운영자",
  [USER_ROLE.GENERAL]: "관련없음",
} as const;

export type UserRole = keyof typeof USER_ROLE;
