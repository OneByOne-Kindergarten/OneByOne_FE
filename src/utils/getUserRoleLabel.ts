import { USER_ROLE_LABEL, UserRole } from "@/constants/user";

/**
 * 사용자 역할 -> 한글 label 변환
 * @param role 사용자 역할
 * @returns 한글 label
 */
export const getUserRoleLabel = (role: UserRole): string => {
  return USER_ROLE_LABEL[role] || "비공개";
};
