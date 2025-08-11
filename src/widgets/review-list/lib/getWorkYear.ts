import type { InternshipReview, WorkReview } from "@/entities/review/DTO.d";
import { REVIEW_TYPES } from "@/shared/constants/review";

export type ReviewData = InternshipReview | WorkReview;

/**
 * 근무 년차에 따른 텍스트 반환
 * @param review 리뷰 데이터
 * @param type 리뷰 타입 (work/learning)
 * @returns 근무 년차 텍스트
 */
export const getWorkYear = (review: ReviewData, type: string): string => {
  if (type === REVIEW_TYPES.WORK && "workReviewId" in review) {
    switch (review.workYear) {
      case 1:
        return "2년 이내 근무";
      case 2:
        return "2-5년 전 근무";
      case 3:
        return "근무한지 오래됨";
      default:
        return "";
    }
  }
  return "";
};
