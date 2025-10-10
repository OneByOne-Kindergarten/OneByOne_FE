import { getDefaultStore } from "jotai/vanilla";

import { getAccessToken, signOut } from "@/entities/auth/api";
import { userAtom } from "@/entities/auth/model";
import { apiCall } from "@/shared/api/utils";
import { API_PATHS } from "@/shared/config/api";
import { setSentryUser } from "@/shared/utils/sentryConfig";

import { User, UserResponse } from "./DTO.d";

const jotaiStore = getDefaultStore();

export const getUserInfo = async (): Promise<User | null> => {
  try {
    // 액세스 토큰이 있는 경우에만 요청
    const token = getAccessToken();

    if (!token) {
      console.log("액세스 토큰이 없어 유저 정보를 요청하지 않습니다.");
      return null;
    }

    const response = await apiCall<null, UserResponse>({
      method: "GET",
      path: API_PATHS.USER.BASE,
      withAuth: true,
      withCredentials: true,
    });

    const { user } = response;

    setUserInfo(user);

    return user;
  } catch (error) {
    console.error("유저 정보 조회 실패:", error);
    return null;
  }
};

/**
 * 사용자 닉네임 변경
 * @param newNickname 변경할 새 닉네임
 * @returns 변경 성공 여부
 */
export const updateNickname = async (newNickname: string): Promise<boolean> => {
  try {
    const token = getAccessToken();

    if (!token) {
      console.error("닉네임 변경 실패: 인증 정보 없음");
      return false;
    }

    await apiCall<{ newNickname: string }, void>({
      method: "PATCH",
      path: API_PATHS.USER.NICKNAME,
      data: { newNickname },
      withAuth: true,
      withCredentials: true,
    });

    // 닉네임 변경 후 유저 정보 다시 불러오기
    await getUserInfo();

    return true;
  } catch (error) {
    console.error("닉네임 변경 실패:", error);
    throw error;
  }
};

/**
 * 비밀번호 변경
 * @param currentPassword 현재 비밀번호
 * @param newPassword 새 비밀번호
 * @returns 변경 성공 여부
 */
export const updatePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<boolean> => {
  try {
    const token = getAccessToken();

    if (!token) {
      console.error("비밀번호 변경 실패: 인증 정보 없음");
      return false;
    }

    await apiCall<{ currentPassword: string; newPassword: string }, void>({
      method: "PATCH",
      path: API_PATHS.USER.PASSWORD,
      data: { currentPassword, newPassword },
      withAuth: true,
      withCredentials: true,
    });

    return true;
  } catch (error) {
    if (error instanceof Error) {
      // apiCall에서 이미 message를 직접 throw하므로 간단하게 처리
      if (error.message === "비밀번호가 일치하지 않습니다.") {
        return false;
      }
    }
    throw error;
  }
};

/**
 * 회원 탈퇴
 * @returns 탈퇴 성공 여부
 */
export const withdrawUser = async (): Promise<boolean> => {
  try {
    const token = getAccessToken();

    if (!token) {
      console.error("회원 탈퇴 실패: 인증 정보 없음");
      throw new Error("인증 정보가 없습니다.");
    }

    await apiCall<null, void>({
      method: "POST",
      path: API_PATHS.USER.WITHDRAW,
      withAuth: true,
      withCredentials: true,
    });

    await signOut();

    return true;
  } catch (error) {
    console.error("회원 탈퇴 실패:", error);
    throw error;
  }
};

export const setUserInfo = (user: User | null): void => {
  jotaiStore.set(userAtom, user);

  // Sentry에 사용자 정보 설정
  setSentryUser(
    user
      ? {
          userId: user.userId,
          nickname: user.nickname,
          role: user.role,
        }
      : null
  );
};

export const clearUserInfo = (): void => {
  jotaiStore.set(userAtom, null);

  // Sentry에서 사용자 정보 제거
  setSentryUser(null);
};

/**
 * 사용자 역할 변경
 * @param role 변경할 새 역할
 * @returns 변경 성공 여부
 */
export const updateUserRole = async (
  role: "TEACHER" | "PROSPECTIVE_TEACHER" | "ADMIN" | "GENERAL"
): Promise<boolean> => {
  try {
    const token = getAccessToken();

    if (!token) {
      console.error("역할 변경 실패: 인증 정보 없음");
      throw new Error("인증 정보가 없습니다.");
    }

    await apiCall<{ role: string }, void>({
      method: "POST",
      path: API_PATHS.USER.ROLE,
      data: { role },
      withAuth: true,
      withCredentials: true,
    });

    await getUserInfo(); // 역할 변경 후 유저 정보 다시 불러오기

    return true;
  } catch (error) {
    console.error("역할 변경 실패:", error);
    throw error;
  }
};

/**
 * 이메일 인증 번호 발송
 * @param email 인증 번호를 받을 이메일
 * @returns 발송 성공 여부
 */
export const sendEmailCertification = async (
  email: string
): Promise<boolean> => {
  try {
    await apiCall<{ email: string }, void>({
      method: "POST",
      path: API_PATHS.USER.FIND_PASSWORD,
      data: { email },
      withCredentials: true,
    });

    return true;
  } catch (error) {
    console.error("이메일 인증 번호 발송 실패:", error);
    throw error;
  }
};

/**
 * 이메일 인증 번호 검증
 * @param email
 * @param certification 인증 번호
 * @returns 인증 성공 여부
 */
export const checkEmailCertification = async (
  email: string,
  certification: string
): Promise<boolean> => {
  try {
    await apiCall<{ email: string; certification: string }, void>({
      method: "POST",
      path: API_PATHS.USER.FIND_PASSWORD_CHECK,
      data: { email, certification },
      withCredentials: true,
    });

    return true;
  } catch (error) {
    console.error("이메일 인증 번호 검증 실패:", error);
    throw error;
  }
};
