import { apiCall } from "@/shared/api/utils";
import { API_PATHS } from "@/shared/config/api";
import type { LearningReviewFormValues } from "@/widgets/review-editor/ui/LearningReviewForm";
import type { WorkReviewFormValues } from "@/widgets/review-editor/ui/WorkReviewForm";

import { SortType } from "./DTO.d";

import type {
  InternshipReview,
  InternshipReviewResponse,
  LikeResponse,
  PaginatedReviewResponse,
  ReviewQueryParams,
  WorkReview,
  WorkReviewResponse,
} from "./DTO.d";

/**
 * 근무 리뷰 목록 조회
 * @param kindergartenId 유치원 ID
 * @param sortType 최신순, 인기순
 * @returns
 */
export const getWorkReviews = async (
  kindergartenId: number,
  sortType?: SortType
) => {
  const queryParams = sortType ? `?sortType=${sortType}` : "";
  return apiCall<null, WorkReviewResponse>({
    method: "GET",
    path: API_PATHS.WORK.GET(kindergartenId) + queryParams,
    withAuth: true,
  });
};

/**
 * 실습 리뷰 목록 조회
 * @param kindergartenId 유치원 ID
 * @param sortType 최신순, 인기순
 * @returns
 */
export const getInternshipReviews = async (
  kindergartenId: number,
  sortType?: SortType
) => {
  const queryParams = sortType ? `?sortType=${sortType}` : "";
  return apiCall<null, InternshipReviewResponse>({
    method: "GET",
    path: API_PATHS.INTERNSHIP.GET(kindergartenId) + queryParams,
    withAuth: true,
  });
};

/**
 * 실습 리뷰 생성
 * @param data 인습 리뷰 생성 요청 데이터
 * @returns
 */
export const createInternshipReview = async (
  data: LearningReviewFormValues & { kindergartenId: number; workType: string }
): Promise<LikeResponse> => {
  return apiCall<
    LearningReviewFormValues & { kindergartenId: number; workType: string },
    LikeResponse
  >({
    method: "POST",
    path: API_PATHS.INTERNSHIP.BASE,
    data,
    withAuth: true,
  });
};

/**
 * 근무 리뷰 생성
 * @param data 근무 리뷰 생성 요청 데이터
 * @returns
 */
export const createWorkReview = async (
  data: WorkReviewFormValues & { kindergartenId: number }
): Promise<LikeResponse> => {
  return apiCall<
    WorkReviewFormValues & { kindergartenId: number },
    LikeResponse
  >({
    method: "POST",
    path: API_PATHS.WORK.BASE,
    data,
    withAuth: true,
  });
};

/**
 * 좋아요 - 근무 리뷰
 * @param workReviewId 근무 리뷰 ID
 * @returns
 */
export const likeWorkReview = async (workReviewId: number) => {
  return apiCall<null, LikeResponse>({
    method: "POST",
    path: API_PATHS.WORK.LIKE(workReviewId),
    withAuth: true,
  });
};

/**
 * 좋아요 - 실습 리뷰
 * @param internshipReviewId 실습 리뷰 ID
 * @returns
 */
export const likeInternshipReview = async (internshipReviewId: number) => {
  return apiCall<null, LikeResponse>({
    method: "POST",
    path: API_PATHS.INTERNSHIP.LIKE(internshipReviewId),
    withAuth: true,
  });
};

/**
 * 전체 근무 리뷰 조회
 * @param page
 * @param size
 * @param sortType 최신순, 인기순
 * @returns
 */
export const getAllWorkReviews = async (
  params: ReviewQueryParams = {}
): Promise<PaginatedReviewResponse<WorkReview>> => {
  const { page = 0, size = 10, sortType = SortType.LATEST } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sortType: sortType.toString(),
  });

  return apiCall<null, PaginatedReviewResponse<WorkReview>>({
    method: "GET",
    path: `${API_PATHS.WORK.GET_ALL}?${queryParams.toString()}`,
    withAuth: true,
  });
};

/**
 * 전체 실습 리뷰 조회
 * @param page
 * @param size
 * @param sortType 최신순, 인기순
 * @returns
 */
export const getAllInternshipReviews = async (
  params: ReviewQueryParams = {}
): Promise<PaginatedReviewResponse<InternshipReview>> => {
  const { page = 0, size = 10, sortType = SortType.LATEST } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sortType: sortType.toString(),
  });

  return apiCall<null, PaginatedReviewResponse<InternshipReview>>({
    method: "GET",
    path: `${API_PATHS.INTERNSHIP.GET_ALL}?${queryParams.toString()}`,
    withAuth: true,
  });
};
