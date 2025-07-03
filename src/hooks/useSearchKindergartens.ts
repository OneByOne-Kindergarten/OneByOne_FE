import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { toast } from "@/hooks/useToast";
import { searchKindergartens } from "@/services/kindergartenService";
import {
  KindergartenSearchParams,
  KindergartenSearchResponse,
} from "@/types/kindergartenDTO";

export const useSearchKindergartens = (
  searchParams: KindergartenSearchParams
) => {
  const isEnabled = !!searchParams.name && searchParams.name.trim() !== "";

  const result = useSuspenseInfiniteQuery({
    queryKey: ["kindergartens", searchParams],
    queryFn: ({ pageParam = 0 }) => {
      // 검색어가 없으면 빈 결과 반환
      if (!isEnabled) {
        return {
          content: [],
          pageNumber: 0,
          totalPages: 0,
          totalElements: 0,
          last: true,
          first: true,
          pageSize: 10,
          empty: true,
        } as KindergartenSearchResponse;
      }

      return searchKindergartens({
        ...searchParams,
        page: pageParam as number,
        size: 10,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: KindergartenSearchResponse) => {
      const { pageNumber, totalPages } = lastPage;
      return pageNumber < totalPages - 1 ? pageNumber + 1 : undefined;
    },
  });

  try {
    const {
      data,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isLoading,
      isError,
      error,
    } = result;

    // 모든 결과를 병합
    const allResults = data.pages.flatMap(
      (page: KindergartenSearchResponse) => page.content || []
    );
    const totalItems = data.pages[0]?.totalElements || 0;

    return {
      results: allResults,
      totalItems,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isLoading,
      isError,
      error,
    };
  } catch (error) {
    toast({
      title: "유치원 검색 오류",
      description: error instanceof Error ? error.message : "알 수 없는 오류",
      variant: "destructive",
    });

    throw error;
  }
};
