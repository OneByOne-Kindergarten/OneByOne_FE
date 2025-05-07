import { apiCall } from "@/utils/apiUtils";
import { API_PATHS } from "@/constants/api-path";
import type {
  WorkReviewResponse,
  InternshipReviewResponse,
  LikeResponse,
} from "@/types/reviewDTO";

/**
 * 근무 리뷰 목록 조회
 * @param kindergartenId
 * @returns
 */
export const getWorkReviews = async (kindergartenId: number) => {
  return apiCall<null, WorkReviewResponse>({
    method: "GET",
    path: API_PATHS.WORK.GET_ALL(kindergartenId),
    withAuth: true,
  });
};

/**
 * 실습 리뷰 목록 조회
 * @param kindergartenId
 * @returns
 */
export const getInternshipReviews = async (kindergartenId: number) => {
  return apiCall<null, InternshipReviewResponse>({
    method: "GET",
    path: API_PATHS.INTERNSHIP.GET_ALL(kindergartenId),
    withAuth: true,
  });
};

/**
 * 근무 리뷰 좋아요 처리
 * @param workReviewId
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
 * 실습 리뷰 좋아요 처리
 * @param internshipReviewId
 * @returns
 */
export const likeInternshipReview = async (internshipReviewId: number) => {
  return apiCall<null, LikeResponse>({
    method: "POST",
    path: API_PATHS.INTERNSHIP.LIKE(internshipReviewId),
    withAuth: true,
  });
};
