import { REVIEW_TYPES } from "@/common/constants/review";
import type { InternshipReview, WorkReview } from "@/entities/review/DTO.d";

export type ReviewData = InternshipReview | WorkReview;

/**
 * 리뷰 타입에 따른 총점 계산
 * @param review 리뷰 데이터
 * @param type 리뷰 타입 (work/learning)
 * @returns 총점 (1-5점)
 */
export const getTotalRating = (review: ReviewData, type: string): number => {
  if (type === REVIEW_TYPES.WORK && "workReviewId" in review) {
    return (
      (review.benefitAndSalaryScore +
        review.workLifeBalanceScore +
        review.workEnvironmentScore +
        review.managerScore +
        review.customerScore) /
      5
    );
  } else if ("internshipReviewId" in review) {
    return (
      (review.workEnvironmentScore +
        review.learningSupportScore +
        review.instructionTeacherScore) /
      3
    );
  }
  return 0;
};

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
