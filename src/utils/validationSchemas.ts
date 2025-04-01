import * as z from "zod";

export interface ValidationHelpers {
  validateStep: (step: number) => Promise<boolean>;
}

// 공통 필드 스키마
const commonFields = {
  title: z
    .string()
    .min(1, "제목을 입력해주세요")
    .max(200, "200자 이내로 입력해주세요"),
  content: z.string().optional(),
  overallRating: z.number().min(1, "점수를 선택해주세요").max(5),
};

// 텍스트 내용 및 평점 필드 생성 함수
const createRatingField = (fieldName: string) => ({
  [`${fieldName}Content`]: z.string().optional(),
  [`${fieldName}Rating`]: z.number().min(1, "점수를 선택해주세요").max(5),
});

export const workReviewFormSchema = z.object({
  ...commonFields,
  workYear: z.enum([
    "less_than_2_years",
    "between_2_and_5_years",
    "more_than_5_years",
  ]),
  ...createRatingField("salary"),
  ...createRatingField("workLifeBalance"),
  ...createRatingField("atmosphere"),
  ...createRatingField("manager"),
  ...createRatingField("client"),
});

export const learningReviewFormSchema = z.object({
  ...commonFields,
  ...createRatingField("educationEnv"),
  ...createRatingField("teacherSupport"),
  ...createRatingField("mentoring"),
  ...createRatingField("satisfaction"),
});
