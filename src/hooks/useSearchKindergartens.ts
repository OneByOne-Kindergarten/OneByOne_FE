import { useInfiniteQuery } from "@tanstack/react-query";
import { searchKindergartens } from "@/services/kindergartenService";
import { KindergartenSearchParams } from "@/types/kindergarten";

export const useSearchKindergartens = (
  searchParams: KindergartenSearchParams
) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["kindergartens", searchParams],
    queryFn: ({ pageParam = 0 }) => {
      return searchKindergartens({
        ...searchParams,
        page: pageParam,
        size: 10,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { pageNumber, totalPages } = lastPage;
      return pageNumber < totalPages - 1 ? pageNumber + 1 : undefined;
    },
    enabled: !!searchParams.name && searchParams.name.trim() !== "",
  });

  // 모든 결과를 병합
  const allResults = data?.pages.flatMap((page) => page.content) || [];
  const totalItems = data?.pages[0]?.totalElements || 0;

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
};
