import { API_PATHS } from "@/common/constants/api-path";
import { apiCall } from "@/common/utils/apiUtils";

import {
  FavoriteStatusResponse,
  FavoriteToggleResponse,
  FavoritesResponse,
} from "./DTO.d";

/**
 * 유치원 즐겨찾기 상태 조회
 * @returns
 */
export const checkFavoriteStatus = async (
  kindergartenId: number
): Promise<FavoriteStatusResponse> => {
  const queryParams = new URLSearchParams({
    kindergartenId: kindergartenId.toString(),
  }).toString();

  return apiCall<void, FavoriteStatusResponse>({
    method: "GET",
    path: `${API_PATHS.FAVORITE.STATUS}?${queryParams}`,
    withAuth: true,
  });
};

/**
 * 유치원 즐겨찾기 토글 (추가/취소)
 * @param id 유치원 ID
 * @returns 요청 성공 여부와 즐겨찾기 상태
 */
export const toggleFavorite = async (
  kindergartenId: number
): Promise<FavoriteToggleResponse> => {
  return apiCall<{ kindergartenId: number }, FavoriteToggleResponse>({
    method: "POST",
    path: API_PATHS.FAVORITE.BASE,
    data: { kindergartenId },
    withAuth: true,
  });
};

/**
 * 즐겨찾기한 유치원 목록 조회
 * @returns
 */
export const getFavorites = async (): Promise<FavoritesResponse> => {
  return apiCall<void, FavoritesResponse>({
    method: "GET",
    path: API_PATHS.FAVORITE.BASE,
    withAuth: true,
  });
};
