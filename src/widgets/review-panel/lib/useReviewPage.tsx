import { useAtomValue } from "jotai";
import { useEffect } from "react";

import { userAtom } from "@/entities/auth/model";
import { SortType } from "@/entities/review/DTO.d";
import { useGetReview } from "@/entities/review/hooks";
import { REVIEW_TYPES, REVIEW_TYPE_LABELS } from "@/shared/constants/review";
import { useSchoolNavigation } from "@/shared/hooks/useSchoolNavigation";
import { getFieldConfigsByType } from "@/shared/utils/fieldConfigsUtils";
import { setReviewState } from "@/shared/utils/lastVisitedPathUtils";

export function useReviewPage(
  kindergartenId: string,
  type: string,
  sortType: SortType
) {
  const { schoolOptions } = useSchoolNavigation(kindergartenId);
  const fieldConfigs = getFieldConfigsByType(type);
  const reviewData = useGetReview(kindergartenId, type, sortType);
  const user = useAtomValue(userAtom);

  // 페이지 접근 시 최근 방문 경로 저장
  useEffect(() => {
    setReviewState({
      path: `/kindergarten/${kindergartenId}/review?type=${type}`,
      type: type as "work" | "learning",
    });
  }, [kindergartenId, type]);

  // 리뷰 작성 버튼 비활성화 조건
  const isDisabled = () => {
    if (!user) return true;

    if (type === REVIEW_TYPES.LEARNING) {
      return !(
        user.role === "TEACHER" ||
        user.role === "PROSPECTIVE_TEACHER" ||
        user.role === "ADMIN"
      );
    } else if (type === REVIEW_TYPES.WORK) {
      return !(user.role === "TEACHER" || user.role === "ADMIN");
    }

    return true;
  };

  return {
    schoolOptions,
    fieldConfigs,
    reviewData,
    pageTitle: `원바원 | ${kindergartenId} ${REVIEW_TYPE_LABELS[type as "work" | "learning"]}`,
    currentPath: `/kindergarten/${kindergartenId}/review?type=${type}`,
    isDisabled: isDisabled(),
  };
}
