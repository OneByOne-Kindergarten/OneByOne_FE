import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { DYNAMIC_CACHE_CONFIG } from "@/shared/config/query";

import { getAllInternshipReviews, getAllWorkReviews } from "../api";
import { ReviewQueryParams, SortType } from "../DTO.d";

/**
 * 전체 근무 리뷰 조회 훅 (무한 스크롤)
 */
export const useInfiniteAllWorkReviews = (
  params?: Omit<ReviewQueryParams, "page">
) => {
  const pageSize = params?.size ?? 10;
  const sortType = params?.sortType ?? SortType.LATEST;

  return useInfiniteQuery({
    queryKey: ["allWorkReviews", "infinite", pageSize, sortType],
    queryFn: ({ pageParam = 0 }) =>
      getAllWorkReviews({
        page: pageParam as number,
        size: pageSize,
        sortType,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.content || lastPage.content.length === 0) return undefined;
      const currentPage = allPages.length - 1; // 0-based index
      const isLastPage = currentPage + 1 >= lastPage.totalPages;
      return isLastPage ? undefined : currentPage + 1;
    },
    initialPageParam: 0,
    ...DYNAMIC_CACHE_CONFIG,
  });
};

/**
 * 전체 실습 리뷰 조회 훅 (무한 스크롤)
 */
export const useInfiniteAllInternshipReviews = (
  params?: Omit<ReviewQueryParams, "page">
) => {
  const pageSize = params?.size ?? 10;
  const sortType = params?.sortType ?? SortType.LATEST;

  return useInfiniteQuery({
    queryKey: ["allInternshipReviews", "infinite", pageSize, sortType],
    queryFn: ({ pageParam = 0 }) =>
      getAllInternshipReviews({
        page: pageParam as number,
        size: pageSize,
        sortType,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.content || lastPage.content.length === 0) return undefined;
      const currentPage = allPages.length - 1; // 0-based index
      const isLastPage = currentPage + 1 >= lastPage.totalPages;
      return isLastPage ? undefined : currentPage + 1;
    },
    initialPageParam: 0,
    ...DYNAMIC_CACHE_CONFIG,
  });
};

/**
 * 전체 근무 리뷰 조회 훅 (단일 페이지)
 */
export const useGetAllWorkReviews = (params?: ReviewQueryParams) => {
  return useQuery({
    queryKey: ["allWorkReviews", params],
    queryFn: () => getAllWorkReviews(params),
    staleTime: 1000 * 60 * 5, // 5분
  });
};

/**
 * 전체 실습 리뷰 조회 훅 (단일 페이지)
 */
export const useGetAllInternshipReviews = (params?: ReviewQueryParams) => {
  return useQuery({
    queryKey: ["allInternshipReviews", params],
    queryFn: () => getAllInternshipReviews(params),
    staleTime: 1000 * 60 * 5, // 5분
  });
};

/**
 * 최근 근무 리뷰 조회 훅
 */
export const useGetRecentWorkReviews = (size: number = 3) => {
  const params: ReviewQueryParams = {
    page: 0,
    size,
    sortType: SortType.LATEST,
  };

  return useQuery({
    queryKey: ["allWorkReviews", params],
    queryFn: () => getAllWorkReviews(params),
    staleTime: 1000 * 60 * 5, // 5분
    throwOnError: true, // 에러를 에러 바운더리로 던짐
  });
};

/**
 * 최근 실습 리뷰 조회 훅
 */
export const useGetRecentInternshipReviews = (size: number = 3) => {
  const params: ReviewQueryParams = {
    page: 0,
    size,
    sortType: SortType.LATEST,
  };

  return useQuery({
    queryKey: ["allInternshipReviews", params],
    queryFn: () => getAllInternshipReviews(params),
    staleTime: 1000 * 60 * 5, // 5분
    throwOnError: true, // 에러를 에러 바운더리로 던짐
  });
};

/**
 * 실시간 리뷰 조회 훅 (근무 + 실습 리뷰)
 * @deprecated useGetRecentWorkReviews 또는 useGetRecentInternshipReviews 사용 권장
 */
export const useGetRecentReviews = () => {
  const workReviews = useGetAllWorkReviews({
    page: 0,
    size: 3,
    sortType: SortType.LATEST,
  });
  const internshipReviews = useGetAllInternshipReviews({
    page: 0,
    size: 3,
    sortType: SortType.LATEST,
  });

  return {
    workReviews: workReviews.data?.content || [],
    internshipReviews: internshipReviews.data?.content || [],
    isLoading: workReviews.isLoading || internshipReviews.isLoading,
    error: workReviews.error || internshipReviews.error,
  };
};
