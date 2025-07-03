import * as z from "zod";

export interface ValidationHelpers {
  validateStep: (step: number) => Promise<boolean>;
}

// 영문, 숫자, 특수문자만 허용 (한글, 이모지, 공백 제외)
const PASSWORD_PATTERN = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;

export const passwordSchema = z
  .string()
  .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
  .max(20, "비밀번호는 최대 20자까지 가능합니다.")
  .regex(
    PASSWORD_PATTERN,
    "비밀번호는 영문, 숫자, 특수문자만 사용 가능합니다."
  );

// 새 비밀번호 설정 (비밀번호 + 비밀번호 확인)
export const passwordWithConfirmSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

// 비밀번호 변경 (현재 비밀번호 + 새 비밀번호)
export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(6, "현재 비밀번호를 입력해주세요."),
  newPassword: passwordSchema,
});

// 비밀번호 입력 필터링
export const filterPasswordInput = (value: string): string => {
  return value.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g, "");
};

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
