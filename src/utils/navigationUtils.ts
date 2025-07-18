import {
  getPathWithoutParams,
  getUrlKeyFromPath,
  UrlKeys,
} from "@/utils/urlUtils";

export const MAIN_TAB_KEYS: UrlKeys[] = [
  "HOME",
  "SCHOOL",
  "COMMUNITY",
  "BOOKMARKS",
  "USER",
];

// 뒤로가기 버튼 표시 여부 판단을 위한 루트 키들
export const ROOT_URL_KEYS: UrlKeys[] = ["ROOT", ...MAIN_TAB_KEYS];

/**
 * URL 계층 구조 - 각 상위 페이지에 속하는 하위 페이지들 정의
 */
export const URL_GROUPS: Record<UrlKeys, UrlKeys[]> = {
  ROOT: [],
  HOME: ["HOME", "SHORTCUTS_EDITOR"],
  SCHOOL: [
    "SCHOOL",
    "SCHOOL_DETAIL",
    "SEARCH_SCHOOL",
    "REVIEW",
    "REVIEW_WORK",
    "REVIEW_LEARNING",
    "REVIEW_EDITOR",
  ],
  COMMUNITY: [
    "COMMUNITY",
    "COMMUNITY_TEACHER",
    "COMMUNITY_STUDENT",
    "COMMUNITY_POST",
    "COMMUNITY_POST_EDITOR",
    "SEARCH_COMMUNITY",
  ],
  BOOKMARKS: ["BOOKMARKS"],
  USER: [
    "USER",
    "USER_PROFILE",
    "USER_ACCOUNT_SETTING",
    "INQUIRY",
    "NOTICE",
    "NOTICE_DETAIL",
    "ALARM",
    "USER_POST",
  ],
  INQUIRY: ["INQUIRY_PUBLIC", "INQUIRY_MY", "INQUIRY_EDITOR"],
  USER_PROFILE: ["USER_PROFILE_EDITOR"],
  USER_ACCOUNT_SETTING: ["USER_PASSWORD_EDITOR"],
  // 단일 페이지들
  COMMUNITY_TEACHER: [],
  COMMUNITY_STUDENT: [],
  COMMUNITY_POST: [],
  COMMUNITY_POST_EDITOR: [],
  SCHOOL_DETAIL: [],
  SEARCH_SCHOOL: [],
  SEARCH_COMMUNITY: [],
  REVIEW: [],
  REVIEW_WORK: [],
  REVIEW_LEARNING: [],
  REVIEW_EDITOR: [],
  SIGNIN: [],
  SIGNUP: [],
  FIND_PASSWORD: [],
  INQUIRY_PUBLIC: [],
  INQUIRY_MY: [],
  INQUIRY_EDITOR: [],
  NOTICE: [],
  NOTICE_DETAIL: [],
  ALARM: [],
  USER_PROFILE_EDITOR: [],
  USER_PASSWORD_EDITOR: [],
  PERMISSION_TEST: [],
  REPORT: [],
  SHORTCUTS_EDITOR: [],
  TEST: [],
  USER_POST: [],
  NAVER_CALLBACK: [],
  KAKAO_CALLBACK: [],
  APPLE_CALLBACK: [],
};

/**
 * 이동 전략
 */
export type NavigationStrategy =
  | "session_storage" // 세션스토리지 기반 이동
  | "browser_history" // 브라우저 히스토리 뒤로가기
  | "hierarchical" // 상위 페이지 이동
  | "root" // 최상위 페이지 이동
  | "fallback"; // URL 경로 기반 기본 이동

/**
 * 페이지별 이동 전략 설정
 */
export const PAGE_NAVIGATION_CONFIG: Record<string, NavigationStrategy> = {
  // === 세션스토리지 기반 이동 ===
  SCHOOL: "session_storage",
  COMMUNITY: "session_storage",

  // === 브라우저 히스토리 기반 이동 ===
  REVIEW_EDITOR: "browser_history",
  COMMUNITY_POST: "browser_history",
  ALARM: "browser_history",
  NOTICE: "browser_history",
  NOTICE_DETAIL: "browser_history",
  SEARCH_SCHOOL: "browser_history",
  SEARCH_COMMUNITY: "browser_history",

  // === 계층 구조 이동 ===
  COMMUNITY_POST_EDITOR: "hierarchical",
  USER_PROFILE_EDITOR: "hierarchical",
  USER_PASSWORD_EDITOR: "hierarchical",
  SCHOOL_DETAIL: "hierarchical",
};

export type StorageStrategy = "community" | "school" | "none";

export const getCurrentUrlKey = (currentPath: string): UrlKeys | undefined => {
  return getUrlKeyFromPath(currentPath);
};

export const findParentUrlKey = (urlKey: UrlKeys): UrlKeys | undefined => {
  return MAIN_TAB_KEYS.find((rootKey) => URL_GROUPS[rootKey]?.includes(urlKey));
};

export const isMainTabPage = (urlKey: UrlKeys): boolean => {
  return MAIN_TAB_KEYS.includes(urlKey);
};

export const isRootLevelPage = (urlKey: UrlKeys): boolean => {
  return ROOT_URL_KEYS.includes(urlKey);
};

/**
 * 특정 URL 키가 현재 활성 상태인지 확인 (GNB 탭 활성 상태 판단용)
 */
export const isUrlKeyActive = (
  targetUrlKey: UrlKeys,
  currentUrlKey: UrlKeys | undefined
): boolean => {
  if (!currentUrlKey) return false;
  return URL_GROUPS[targetUrlKey]?.includes(currentUrlKey) || false;
};

export const getNavigationStrategy = (urlKey: UrlKeys): NavigationStrategy => {
  return PAGE_NAVIGATION_CONFIG[urlKey] || "fallback";
};

export const isRootPage = (urlKey: UrlKeys): boolean => {
  return isRootLevelPage(urlKey);
};

export const isCommunityPost = (currentPath: string): boolean => {
  return getPathWithoutParams(currentPath).startsWith("/community-post/");
};

export const getStorageStrategy = (parentUrlKey: UrlKeys): StorageStrategy => {
  switch (parentUrlKey) {
    case "COMMUNITY":
      return "community";
    case "SCHOOL":
      return "school";
    default:
      return "none";
  }
};
