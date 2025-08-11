import { REVIEW_TYPES } from "@/shared/constants/review";

export interface ReviewCategoryOption {
  href: string;
  label: string;
}

export function buildReviewCategoryOptions(
  safeId: string
): ReviewCategoryOption[] {
  return [
    { href: `/kindergarten/${safeId}`, label: "기관정보" },
    {
      href: `/kindergarten/${safeId}/review?type=${REVIEW_TYPES.WORK}`,
      label: "근무리뷰",
    },
    {
      href: `/kindergarten/${safeId}/review?type=${REVIEW_TYPES.LEARNING}`,
      label: "실습리뷰",
    },
  ];
}
