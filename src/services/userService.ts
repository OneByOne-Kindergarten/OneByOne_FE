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

export const setUserInfo = (user: User | null): void => {
  jotaiStore.set(userAtom, user);
};

export const clearUserInfo = (): void => {
  jotaiStore.set(userAtom, null);
};
