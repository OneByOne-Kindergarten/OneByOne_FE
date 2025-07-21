import * as z from "zod";

export interface ValidationHelpers {
  validateStep: (step: number) => Promise<boolean>;
}

// 영문, 숫자, 특수문자만 허용 (한글, 이모지, 공백 제외)
const PASSWORD_PATTERN = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;

// 완전한 한글 문자, 영문, 숫자, 언더스코어 허용 (불완전한 조합형 한글 제외)
const NICKNAME_PATTERN = /^[가-힣a-zA-Z0-9_]+$/;

// 글자수 제한 상수
export const POST_TITLE_MAX_LENGTH = 20;
export const POST_CONTENT_MAX_LENGTH = 200;

// 닉네임 스키마
export const nicknameSchema = z
  .string()
  .min(2, "닉네임은 최소 2자 이상이어야 합니다.")
  .max(15, "닉네임은 최대 15자까지 가능합니다.")
  .regex(
    NICKNAME_PATTERN,
    "닉네임은 완전한 한글, 영문, 숫자, _만 사용 가능합니다."
  );

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

// 프로필 스키마 (닉네임)
export const profileSchema = z.object({
  nickname: nicknameSchema,
});

// 커뮤니티 게시글 작성 스키마
export const postSchema = z.object({
  title: z
    .string()
    .min(1, "제목을 입력해주세요")
    .max(
      POST_TITLE_MAX_LENGTH,
      `제목은 ${POST_TITLE_MAX_LENGTH}자 이내로 입력해주세요`
    ),
  content: z
    .string()
    .min(1, "내용을 입력해주세요")
    .max(
      POST_CONTENT_MAX_LENGTH,
      `내용은 ${POST_CONTENT_MAX_LENGTH}자 이내로 입력해주세요`
    ),
  category: z.enum(["TEACHER", "PROSPECTIVE_TEACHER"]),
  communityCategoryName: z.string(),
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
