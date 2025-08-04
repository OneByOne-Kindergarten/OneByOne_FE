import { useQuery } from "@tanstack/react-query";

import { getFavorites } from "@/services/favoriteService";
import { FavoritesResponse } from "@/types/favoriteDTO";

/**
 * 즐겨찾기 목록 조회
 * @param options 쿼리 옵션 (enabled 등)
 * @returns 즐겨찾기 목록 데이터, 로딩/에러 상태
 */
export const useFavorites = (options?: { enabled?: boolean }) => {
  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<FavoritesResponse, Error>({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: options?.enabled !== false,
  });

  const favorites = response?.data || [];

  return { favorites, isLoading, isError, error, refetch };
};
