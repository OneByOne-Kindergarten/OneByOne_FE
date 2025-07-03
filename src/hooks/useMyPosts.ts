import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { DYNAMIC_CACHE_CONFIG } from "@/constants/query-config";
import { REVIEW_TYPES } from "@/constants/review";
import {
  getMyInternshipReviews,
  getMyWorkReviews,
} from "@/services/myPostService";
import { MyPostParams } from "@/types/myPostDTO";

const DEFAULT_PAGE_SIZE = 10;

export const useMyPosts = (initialParams?: Partial<MyPostParams>) => {
  const [searchParams] = useSearchParams();
  const reviewType = searchParams.get("type") || REVIEW_TYPES.WORK;

  // 타입별로 다른 서비스 함수 선택
  const getReviewsFunction =
    reviewType === REVIEW_TYPES.WORK
      ? getMyWorkReviews
      : getMyInternshipReviews;

  // 타입별로 쿼리키 분리하여 캐싱 분리
  const queryKey = ["myPosts", reviewType, initialParams];

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 0 }) =>
      getReviewsFunction({
        page: pageParam as number,
        size: DEFAULT_PAGE_SIZE,
        ...initialParams,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      return nextPage < lastPage.totalPages ? nextPage : undefined;
    },
    initialPageParam: 0,
    ...DYNAMIC_CACHE_CONFIG,
  });
};
