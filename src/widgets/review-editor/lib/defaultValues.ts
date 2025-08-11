import type { LearningReviewFormValues } from "@/widgets/review-editor/ui/LearningReviewForm";
import type { WorkReviewFormValues } from "@/widgets/review-editor/ui/WorkReviewForm";

export const WORK_REVIEW_DEFAULT_VALUES: WorkReviewFormValues = {
  workYear: 1,
  workType: "비공개",
  oneLineComment: "",
  benefitAndSalaryComment: "",
  benefitAndSalaryScore: 0,
  workLifeBalanceComment: "",
  workLifeBalanceScore: 0,
  workEnvironmentComment: "",
  workEnvironmentScore: 0,
  managerComment: "",
  managerScore: 0,
  customerComment: "",
  customerScore: 0,
};

export const LEARNING_REVIEW_DEFAULT_VALUES: LearningReviewFormValues = {
  oneLineComment: "",
  workEnvironmentComment: "",
  workEnvironmentScore: 0,
  learningSupportComment: "",
  learningSupportScore: 0,
  instructionTeacherComment: "",
  instructionTeacherScore: 0,
};
