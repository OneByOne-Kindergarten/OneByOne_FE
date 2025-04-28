import { getDefaultStore } from "jotai/vanilla";
import { userAtom } from "@/stores/userStore";
import { User, UserResponse } from "@/types/userDTO";
import { apiCall } from "@/utils/apiUtils";
import { API_PATHS } from "@/constants/api-path";
import { getAccessToken } from "@/services/authService";

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
    return false;
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
    console.error("비밀번호 변경 실패:", error);
    return false;
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
      return false;
    }

    await apiCall<null, void>({
      method: "POST",
      path: API_PATHS.USER.WITHDRAW,
      withAuth: true,
      withCredentials: true,
    });

    // 탈퇴 성공 시 유저 정보 초기화
    clearUserInfo();

    return true;
  } catch (error) {
    console.error("회원 탈퇴 실패:", error);
    return false;
  }
};

export const setUserInfo = (user: User | null): void => {
  jotaiStore.set(userAtom, user);
};

export const clearUserInfo = (): void => {
  jotaiStore.set(userAtom, null);
};
