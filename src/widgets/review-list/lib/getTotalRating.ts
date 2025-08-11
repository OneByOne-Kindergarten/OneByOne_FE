import type { InternshipReview, WorkReview } from "@/entities/review/DTO.d";
import { REVIEW_TYPES } from "@/shared/constants/review";

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
