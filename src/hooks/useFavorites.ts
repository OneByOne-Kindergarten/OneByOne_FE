import { useQuery } from "@tanstack/react-query";
import { FavoritesResponse } from "@/types/favoriteDTO";
import { getFavorites } from "@/services/favoriteService";

/**
 * 즐겨찾기 목록 조회
 * @returns 즐겨찾기 목록 데이터, 로딩/에러 상태
 */
export const useFavorites = () => {
  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<FavoritesResponse, Error>({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    staleTime: 1000 * 60, // 1분
    gcTime: 1000 * 60 * 10, // 10분
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const favorites = response?.data || [];

  return { favorites, isLoading, isError, error, refetch };
};
