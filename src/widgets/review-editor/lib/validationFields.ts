import type { LearningReviewFormValues } from "@/widgets/review-editor/ui/LearningReviewForm";
import type { WorkReviewFormValues } from "@/widgets/review-editor/ui/WorkReviewForm";

// TODO: 리뷰 스키마 모듈에 통합

// 근무 리뷰: 스텝별 유효성 검사 대상 필드
export const WORK_VALIDATION_FIELDS_BY_STEP: readonly (readonly (keyof WorkReviewFormValues)[])[] =
  [
    ["workYear", "workType", "oneLineComment"],
    [
      "benefitAndSalaryComment",
      "benefitAndSalaryScore",
      "workLifeBalanceComment",
      "workLifeBalanceScore",
      "workEnvironmentComment",
      "workEnvironmentScore",
      "managerComment",
      "managerScore",
      "customerComment",
      "customerScore",
    ],
  ];

// 실습 리뷰: 스텝별 유효성 검사 대상 필드
export const LEARNING_VALIDATION_FIELDS_BY_STEP: readonly (readonly (keyof LearningReviewFormValues)[])[] =
  [
    ["oneLineComment"],
    [
      "workEnvironmentComment",
      "workEnvironmentScore",
      "learningSupportComment",
      "learningSupportScore",
      "instructionTeacherComment",
      "instructionTeacherScore",
    ],
  ];
