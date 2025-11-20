import * as z from "zod";

export interface ValidationHelpers {
  validateStep: (step: number) => Promise<boolean>;
}

// TODO: 기능 별 스키마 분리

// ============================================================================
// 🔐 로그인/회원가입
// ============================================================================

const NICKNAME_MIN_LENGTH = 2;
const NICKNAME_MAX_LENGTH = 15;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 20;

const NICKNAME_PATTERN =
  /^(?!^\d+$)(?!.*_{2,})(?!^_)(?!.*_$)(?!.*(.)\1{4,})[가-힣a-zA-Z0-9_]+$/;
const PASSWORD_PATTERN =
  /^(?!.*(.)\1{3,})[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/;
const PASSWORD_COMPLEXITY_PATTERN = /^(?=.*[a-zA-Z])(?=.*\d)/;

// 닉네임
export const nicknameSchema = z
  .string()
  .min(NICKNAME_MIN_LENGTH, "닉네임은 최소 2자 이상이어야 합니다.")
  .max(NICKNAME_MAX_LENGTH, "닉네임은 최대 15자까지 가능합니다.")
  .regex(
    NICKNAME_PATTERN,
    "닉네임은 완전한 한글, 영문, 숫자, _만 사용 가능하며, 숫자로만 구성하거나 _를 연속/시작/끝에 사용할 수 없습니다."
  );

// 비밀번호
export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, "비밀번호는 최소 6자 이상이어야 합니다.")
  .max(PASSWORD_MAX_LENGTH, "비밀번호는 최대 20자까지 가능합니다.")
  .regex(
    PASSWORD_PATTERN,
    "비밀번호는 영문, 숫자, 특수문자만 사용 가능하며, 동일 문자를 4번 이상 연속으로 사용할 수 없습니다."
  )
  .refine(
    (value) => PASSWORD_COMPLEXITY_PATTERN.test(value),
    "비밀번호는 영문과 숫자를 모두 포함해야 합니다."
  );

// 비밀번호 확인
export const passwordWithConfirmSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

// 비밀번호 변경
export const passwordChangeSchema = z.object({
  currentPassword: z
    .string()
    .min(PASSWORD_MIN_LENGTH, "현재 비밀번호를 입력해주세요."),
  newPassword: passwordSchema,
});

// 프로필
export const profileSchema = z.object({
  nickname: nicknameSchema,
});

export const filterPasswordInput = (value: string): string => {
  return value.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g, "");
};

// ============================================================================
// 📝 리뷰
// ============================================================================

export const REVIEW_COMMENT_MIN_LENGTH = 5;
export const REVIEW_COMMENT_MAX_LENGTH = 1000;
const REVIEW_ONE_LINE_MAX_LENGTH = 200;

const REVIEW_COMMENT_PATTERN =
  /^(?!.*\s{2,})(?!.*[ㄱ-ㅎㅏ-ㅣ])(?!.*(.)\1{4,})(?!.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{5,}).+$/;

const REVIEW_ERROR_MSG = {
  MIN: `최소 ${REVIEW_COMMENT_MIN_LENGTH}자 이상 입력해주세요`,
  MAX: `${REVIEW_COMMENT_MAX_LENGTH}자 이내로 입력해주세요`,
  ONE_LINE_MAX: `${REVIEW_ONE_LINE_MAX_LENGTH}자 이내로 입력해주세요`,
  INVALID:
    "연속 공백, 단독 자모, 5자 이상 동일한 문자 반복은 사용할 수 없습니다.",
  SCORE: "점수를 선택해주세요",
} as const;

// 기본 스키마
const createReviewCommentSchema = (maxLength: number, maxMessage: string) =>
  z
    .string()
    .min(REVIEW_COMMENT_MIN_LENGTH, REVIEW_ERROR_MSG.MIN)
    .max(maxLength, maxMessage)
    .regex(REVIEW_COMMENT_PATTERN, REVIEW_ERROR_MSG.INVALID);

const reviewCommentSchema = createReviewCommentSchema(
  REVIEW_COMMENT_MAX_LENGTH,
  REVIEW_ERROR_MSG.MAX
);

const oneLineCommentSchema = createReviewCommentSchema(
  REVIEW_ONE_LINE_MAX_LENGTH,
  REVIEW_ERROR_MSG.ONE_LINE_MAX
);

const reviewScoreSchema = z.number().min(1, REVIEW_ERROR_MSG.SCORE).max(5);

// 근무 리뷰
export const workReviewFormSchema = z.object({
  workYear: z.number().min(1, "근무 기간을 선택해주세요"),
  workType: z.string().optional(),
  oneLineComment: oneLineCommentSchema,
  benefitAndSalaryComment: reviewCommentSchema,
  benefitAndSalaryScore: reviewScoreSchema,
  workLifeBalanceComment: reviewCommentSchema,
  workLifeBalanceScore: reviewScoreSchema,
  workEnvironmentComment: reviewCommentSchema,
  workEnvironmentScore: reviewScoreSchema,
  managerComment: reviewCommentSchema,
  managerScore: reviewScoreSchema,
  customerComment: reviewCommentSchema,
  customerScore: reviewScoreSchema,
});

// 학습 리뷰
export const learningReviewFormSchema = z.object({
  oneLineComment: oneLineCommentSchema,
  workEnvironmentComment: reviewCommentSchema,
  workEnvironmentScore: reviewScoreSchema,
  learningSupportComment: reviewCommentSchema,
  learningSupportScore: reviewScoreSchema,
  instructionTeacherComment: reviewCommentSchema,
  instructionTeacherScore: reviewScoreSchema,
});

// ============================================================================
// 📰 커뮤니티
// ============================================================================

export const POST_TITLE_MAX_LENGTH = 20;
export const POST_CONTENT_MAX_LENGTH = 200;

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
