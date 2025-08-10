import { ReviewFieldConfig } from "@/features/review/ReviewContent";
import { RatingFieldConfig } from "@/features/review/TotalRatingCard";
import { REVIEW_TYPES } from "@/shared/constants/review";

// 근무 리뷰
const workRatingConfigs: RatingFieldConfig[] = [
  { key: "welfare", label: "복지/급여" },
  { key: "workLabel", label: "워라벨" },
  { key: "atmosphere", label: "분위기" },
  { key: "manager", label: "관리자" },
  { key: "customer", label: "고객" },
];

const workReviewConfigs: ReviewFieldConfig[] = [
  { key: "welfare", label: "복지/급여" },
  { key: "workLabel", label: "워라벨" },
  { key: "atmosphere", label: "분위기" },
  { key: "manager", label: "관리자" },
  { key: "customer", label: "고객" },
];

// 실습 리뷰
const learningRatingConfigs: RatingFieldConfig[] = [
  { key: "atmosphere", label: "분위기" },
  { key: "studyHelp", label: "학습 도움" },
  { key: "teacherGuide", label: "지도 교사" },
];

const learningReviewConfigs: ReviewFieldConfig[] = [
  { key: "atmosphere", label: "분위기" },
  { key: "studyHelp", label: "학습 도움" },
  { key: "teacherGuide", label: "지도 교사" },
];

interface FieldConfigs {
  rating: RatingFieldConfig[];
  review: ReviewFieldConfig[];
}

/**
 * 리뷰 타입에 따른 필드 설정 반환
 * @param type 리뷰 타입 (work 또는 learning)
 * @returns 필드 설정 객체
 */
export function getFieldConfigsByType(type: string): FieldConfigs {
  if (type === REVIEW_TYPES.WORK) {
    return {
      rating: workRatingConfigs,
      review: workReviewConfigs,
    };
  }

  return {
    rating: learningRatingConfigs,
    review: learningReviewConfigs,
  };
}
