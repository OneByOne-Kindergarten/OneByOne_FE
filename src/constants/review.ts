// REVIEW_TYPES 상수 정의
export const REVIEW_TYPES = {
  WORK: "work",
  LEARNING: "learning",
} as const;

export const REVIEW_TYPE_LABELS = {
  [REVIEW_TYPES.WORK]: "근무리뷰",
  [REVIEW_TYPES.LEARNING]: "실습리뷰",
};

export const REVIEW_SORT_OPTIONS = {
  RECOMMEND: "recommend",
  LATEST: "latest",
};

export const REVIEW_SORT_LABELS = {
  [REVIEW_SORT_OPTIONS.RECOMMEND]: "추천순",
  [REVIEW_SORT_OPTIONS.LATEST]: "최신순",
};
