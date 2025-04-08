import { apiCall } from "@/utils/apiUtils";
import {
  Favorite,
  FavoriteStatusResponse,
  FavoriteToggleResponse,
  FavoritesListResponse,
} from "@/types/favorite";
import { API_PATHS } from "@/constants/api-path";

/**
 * 유치원 즐겨찾기 상태 조회
 * @returns
 */

export const checkFavoriteStatus = async (id: number): Promise<boolean> => {
  try {
    const response = await apiCall<void, FavoriteStatusResponse>({
      method: "GET",
      path: `${API_PATHS.FAVORITE.KINDERGARTEN_STATUS}?kindergartenId=${id}`,
      withAuth: true,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("즐겨찾기 상태 조회 에러:", error);
    return false;
  }
};

/**
 * 유치원 즐겨찾기 토글 (추가/취소)
 * @param id 유치원 ID
 * @returns 요청 성공 여부와 즐겨찾기 상태
 */

export const toggleFavorite = async (
  id: number
): Promise<{ success: boolean; isFavorite: boolean }> => {
  try {
    const response = await apiCall<
      { kindergartenId: number },
      FavoriteToggleResponse
    >({
      method: "POST",
      path: API_PATHS.FAVORITE.KINDERGARTEN,
      data: { kindergartenId: id },
      withAuth: true,
      withCredentials: true,
    });

    return {
      success: response.success,
      isFavorite: response.data.favorite,
    };
  } catch (error) {
    console.error("즐겨찾기 토글 에러:", error);
    throw error;
  }
};

/**
 * 즐겨찾기한 유치원 목록 조회
 * @returns
 */

export const getFavorites = async (): Promise<Favorite[]> => {
  try {
    const response = await apiCall<void, FavoritesListResponse>({
      method: "GET",
      path: API_PATHS.FAVORITE.KINDERGARTEN,
      withAuth: true,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("즐겨찾기 목록 조회 에러:", error);
    return [];
  }
};
