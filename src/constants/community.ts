// 카테고리 타입 정의
export type CommunityCategoryType = "TEACHER" | "PROSPECTIVE_TEACHER";

export interface CategoryOption {
  value: string;
  label: string;
}

export interface CategoryInfo {
  name: string;
  description: string;
  categories: CategoryOption[];
  postCategories: CategoryOption[];
}

// 카테고리 정보 맵
export const CATEGORY_INFO: Record<CommunityCategoryType, CategoryInfo> = {
  TEACHER: {
    name: "교사",
    description: "교사 커뮤니티",
    categories: [
      { value: "top10", label: "Top 10" },
      { value: "all", label: "전체" },
      { value: "free", label: "자유" },
      { value: "salary", label: "월급/취업" },
      { value: "class", label: "수업/환경구성" },
      { value: "guidance", label: "유아지도" },
    ],
    postCategories: [
      { value: "free", label: "자유" },
      { value: "salary", label: "월급/취업" },
      { value: "class", label: "수업/환경구성" },
      { value: "guidance", label: "유아지도" },
    ],
  },
  PROSPECTIVE_TEACHER: {
    name: "예비교사",
    description: "예비교사 커뮤니티",
    categories: [
      { value: "top10", label: "Top 10" },
      { value: "all", label: "전체" },
      { value: "university", label: "대학생활" },
      { value: "practice", label: "실습" },
      { value: "job", label: "취업/면접" },
    ],
    postCategories: [
      { value: "university", label: "대학생활" },
      { value: "practice", label: "실습" },
      { value: "job", label: "취업/면접" },
    ],
  },
};

// 카테고리 라벨 맵
export const CATEGORY_LABELS: Record<string, string> = {
  TEACHER: "교사",
  PRE_TEACHER: "예비교사",
  top10: "Top 10",
  all: "전체",
  free: "자유",
  salary: "월급/취업",
  class: "수업/환경구성",
  guidance: "유아지도",
  university: "대학생활",
  practice: "실습",
  job: "취업/면접",
};

// 기존 상수는 유지하되 내부적으로 CATEGORY_INFO를 사용하도록 수정
export const PROSPECTIVE_TEACHER_CATEGORIES =
  CATEGORY_INFO.PROSPECTIVE_TEACHER.categories;
export const PROSPECTIVE_TEACHER_POST_CATEGORIES =
  CATEGORY_INFO.PROSPECTIVE_TEACHER.postCategories;
export const TEACHER_CATEGORIES = CATEGORY_INFO.TEACHER.categories;
export const TEACHER_POST_CATEGORIES = CATEGORY_INFO.TEACHER.postCategories;
