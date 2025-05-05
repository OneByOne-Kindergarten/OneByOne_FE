import { apiCall } from "@/utils/apiUtils";
import { API_PATHS } from "@/constants/api-path";
import type {
  WorkReviewResponse,
  InternshipReviewResponse,
} from "@/types/reviewDTO";

/**
 * 근무 리뷰 목록 조회
 * @param id
 * @returns
 */
export const getWorkReviews = async (id: string) => {
  return apiCall<null, WorkReviewResponse>({
    method: "GET",
    path: `${API_PATHS.WORK.GET_ALL}?kindergartenId=${id}`,
    withAuth: true,
  });
};

/**
 * 근무 리뷰 목록 조회
 * @param id
 * @returns
 */
export const getInternshipReviews = async (id: string) => {
  return apiCall<null, InternshipReviewResponse>({
    method: "GET",
    path: `${API_PATHS.INTERNSHIP.GET_ALL}?kindergartenId=${id}`,
    withAuth: true,
  });
};
