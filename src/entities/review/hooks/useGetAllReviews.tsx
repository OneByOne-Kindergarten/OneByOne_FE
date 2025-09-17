import { useQuery } from "@tanstack/react-query";

import { getAllInternshipReviews, getAllWorkReviews } from "../api";
import { ReviewQueryParams, SortType } from "../DTO.d";

/**
 * 전체 근무 리뷰 조회 훅
 */
export const useGetAllWorkReviews = (params?: ReviewQueryParams) => {
  return useQuery({
    queryKey: ["allWorkReviews", params],
    queryFn: () => getAllWorkReviews(params),
    staleTime: 1000 * 60 * 5, // 5분
  });
};

/**
 * 전체 실습 리뷰 조회 훅
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
