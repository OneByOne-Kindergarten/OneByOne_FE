import * as z from "zod";

export interface ValidationHelpers {
  validateStep: (step: number) => Promise<boolean>;
}

export const workReviewFormSchema = z.object({
  workYear: z.number().min(1, "근무 기간을 선택해주세요"),
  workType: z.string().optional(),
  oneLineComment: z
    .string()
    .min(1, "제목을 입력해주세요")
    .max(200, "200자 이내로 입력해주세요"),
  benefitAndSalaryComment: z.string().optional(),
  benefitAndSalaryScore: z.number().min(1, "점수를 선택해주세요").max(5),
  workLifeBalanceComment: z.string().optional(),
  workLifeBalanceScore: z.number().min(1, "점수를 선택해주세요").max(5),
  workEnvironmentComment: z.string().optional(),
  workEnvironmentScore: z.number().min(1, "점수를 선택해주세요").max(5),
  managerComment: z.string().optional(),
  managerScore: z.number().min(1, "점수를 선택해주세요").max(5),
  customerComment: z.string().optional(),
  customerScore: z.number().min(1, "점수를 선택해주세요").max(5),
});

export const learningReviewFormSchema = z.object({
  oneLineComment: z
    .string()
    .min(1, "한 줄 평가를 입력해주세요")
    .max(200, "200자 이내로 입력해주세요"),
  workEnvironmentComment: z.string().optional(),
  workEnvironmentScore: z.number().min(1, "점수를 선택해주세요").max(5),
  learningSupportComment: z.string().optional(),
  learningSupportScore: z.number().min(1, "점수를 선택해주세요").max(5),
  instructionTeacherComment: z.string().optional(),
  instructionTeacherScore: z.number().min(1, "점수를 선택해주세요").max(5),
});
