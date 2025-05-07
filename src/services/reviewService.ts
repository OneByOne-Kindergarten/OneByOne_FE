import { apiCall } from "@/utils/apiUtils";
import { API_PATHS } from "@/constants/api-path";
import type {
  WorkReviewResponse,
  InternshipReviewResponse,
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
 * 근무 리뷰 목록 조회
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
