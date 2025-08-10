import { REVIEW_TYPES, REVIEW_TYPE_LABELS } from "@/shared/constants/review";

/**
 * 유치원 상세 페이지 네비게이션 옵션
 * @param id
 * @returns 기관정보, 근무리뷰, 실습리뷰
 */

export function useSchoolNavigation(id: string) {
  const schoolOptions = [
    { href: `/kindergarten/${id}`, label: "기관정보" },
    {
      href: `/kindergarten/${id}/review?type=${REVIEW_TYPES.WORK}`,
      label: REVIEW_TYPE_LABELS[REVIEW_TYPES.WORK],
    },
    {
      href: `/kindergarten/${id}/review?type=${REVIEW_TYPES.LEARNING}`,
      label: REVIEW_TYPE_LABELS[REVIEW_TYPES.LEARNING],
    },
  ];

  return { schoolOptions };
}
