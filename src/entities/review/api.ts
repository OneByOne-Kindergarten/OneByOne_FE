import type { LearningReviewFormValues } from "@/features/review-form/LearningReviewForm";
import type { WorkReviewFormValues } from "@/features/review-form/WorkReviewForm";
import { apiCall } from "@/shared/api/utils";
import { API_PATHS } from "@/shared/config/api";

import type {
  InternshipReviewResponse,
  LikeResponse,
  SortType,
  WorkReviewResponse,
} from "./types";

/**
 * 근무 리뷰 목록 조회
 * @param kindergartenId 유치원 ID
 * @param sortType 정렬 타입
 * @returns
 */
export const getWorkReviews = async (
  kindergartenId: number,
  sortType?: SortType
) => {
  const queryParams = sortType ? `?sortType=${sortType}` : "";
  return apiCall<null, WorkReviewResponse>({
    method: "GET",
    path: API_PATHS.WORK.GET_ALL(kindergartenId) + queryParams,
    withAuth: true,
  });
};

/**
 * 실습 리뷰 목록 조회
 * @param kindergartenId 유치원 ID
 * @param sortType 정렬 타입
 * @returns
 */
export const getInternshipReviews = async (
  kindergartenId: number,
  sortType?: SortType
) => {
  const queryParams = sortType ? `?sortType=${sortType}` : "";
  return apiCall<null, InternshipReviewResponse>({
    method: "GET",
    path: API_PATHS.INTERNSHIP.GET_ALL(kindergartenId) + queryParams,
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
