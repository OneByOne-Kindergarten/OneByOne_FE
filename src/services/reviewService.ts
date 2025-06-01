import { apiCall } from "@/utils/apiUtils";
import { API_PATHS } from "@/constants/api-path";
import type {
  WorkReviewResponse,
  InternshipReviewResponse,
  LikeResponse,
  SortType,
} from "@/types/reviewDTO";
import type { WorkReviewFormValues } from "@/components/review/WorkReviewForm";
import type { LearningReviewFormValues } from "@/components/review/LearningReviewForm";

/**
 * 근무 리뷰 목록을 가져옵니다.
 * @param kindergartenId 유치원 ID
 * @param sortType 정렬 타입
 * @returns 근무 리뷰 목록
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
 * 실습 리뷰 목록을 가져옵니다.
 * @param kindergartenId 유치원 ID
 * @param sortType 정렬 타입
 * @returns 실습 리뷰 목록
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
 * @param data 실습 리뷰 생성 요청 데이터
 * @returns 생성 결과
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
 * @returns 생성 결과
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
 * 근무 리뷰에 좋아요를 누릅니다.
 * @param workReviewId 근무 리뷰 ID
 * @returns 좋아요 결과
 */
export const likeWorkReview = async (workReviewId: number) => {
  return apiCall<null, LikeResponse>({
    method: "POST",
    path: API_PATHS.WORK.LIKE(workReviewId),
    withAuth: true,
  });
};

/**
 * 실습 리뷰에 좋아요를 누릅니다.
 * @param internshipReviewId 실습 리뷰 ID
 * @returns 좋아요 결과
 */
export const likeInternshipReview = async (internshipReviewId: number) => {
  return apiCall<null, LikeResponse>({
    method: "POST",
    path: API_PATHS.INTERNSHIP.LIKE(internshipReviewId),
    withAuth: true,
  });
};
