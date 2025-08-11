import type { LearningReviewFormValues } from "@/widgets/review-editor/ui/LearningReviewForm";
import type { WorkReviewFormValues } from "@/widgets/review-editor/ui/WorkReviewForm";

// 근무 리뷰: 스텝별 유효성 검사 대상 필드
export const WORK_VALIDATION_FIELDS_BY_STEP: readonly (readonly (keyof WorkReviewFormValues)[])[] =
  [
    ["workYear", "workType", "oneLineComment"],
    [
      "benefitAndSalaryScore",
      "workLifeBalanceScore",
      "workEnvironmentScore",
      "managerScore",
      "customerScore",
    ],
  ];

// 실습 리뷰: 스텝별 유효성 검사 대상 필드
export const LEARNING_VALIDATION_FIELDS_BY_STEP: readonly (readonly (keyof LearningReviewFormValues)[])[] =
  [
    ["oneLineComment"],
    ["workEnvironmentScore", "learningSupportScore", "instructionTeacherScore"],
  ];
