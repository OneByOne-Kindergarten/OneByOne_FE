import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "@/services/favoriteService";
import { Favorite } from "@/types/favorite";

/**
 * 즐겨찾기 목록 조회
 * @returns 즐겨찾기 목록 데이터, 로딩/에러 상태
 */

export function useFavorites() {
  const {
    data: favorites = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Favorite[], Error>({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    staleTime: 1000 * 60, // 1분
    gcTime: 1000 * 60 * 10, // 10분
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  return {
    favorites,
    isLoading,
    isError,
    error,
    refetch,
  };
}
