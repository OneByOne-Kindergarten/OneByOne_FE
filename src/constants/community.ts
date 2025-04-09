export interface CategoryOption {
  value: string;
  label: string;
}

// 예비교사 커뮤니티
export const PRE_TEACHER_CATEGORIES: CategoryOption[] = [
  { value: "top10", label: "Top 10" },
  { value: "all", label: "전체" },
  { value: "university", label: "대학생활" },
  { value: "practice", label: "실습" },
  { value: "job", label: "취업/면접" },
];

export const PRE_TEACHER_POST_CATEGORIES: CategoryOption[] = [
  { value: "university", label: "대학생활" },
  { value: "practice", label: "실습" },
  { value: "job", label: "취업/면접" },
];

// 교사 커뮤니티
export const TEACHER_CATEGORIES: CategoryOption[] = [
  { value: "top10", label: "Top 10" },
  { value: "all", label: "전체" },
  { value: "free", label: "자유" },
  { value: "salary", label: "월급/취업" },
  { value: "class", label: "수업/환경구성" },
  { value: "guidance", label: "유아지도" },
];

export const TEACHER_POST_CATEGORIES: CategoryOption[] = [
  { value: "free", label: "자유" },
  { value: "salary", label: "월급/취업" },
  { value: "class", label: "수업/환경구성" },
  { value: "guidance", label: "유아지도" },
];

export const CATEGORY_LABELS: Record<string, string> = {
  top10: "Top 10",
  all: "전체",
  university: "대학생활",
  practice: "실습",
  job: "취업/면접",
  free: "자유",
  salary: "월급/취업",
  class: "수업/환경구성",
  guidance: "유아지도",
};
