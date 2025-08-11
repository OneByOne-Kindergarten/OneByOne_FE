import {
  getPathWithoutParams,
  getUrlKeyFromPath,
  UrlKeys,
} from "@/shared/utils/getUrl";

export const MAIN_TAB_KEYS: UrlKeys[] = [
  "HOME",
  "KINDERGARTEN",
  "COMMUNITY",
  "FAVORITES",
  "USER",
];

// GNB에서 사용하는 함수
export const getCurrentUrlKey = (currentPath: string): UrlKeys | undefined => {
  return getUrlKeyFromPath(currentPath);
};

export const isCommunityPost = (currentPath: string): boolean => {
  return getPathWithoutParams(currentPath).startsWith("/community-post/");
};

/**
 * URL 계층 구조 - GNB 탭 활성 상태 판단용
 */
export const URL_GROUPS: Record<UrlKeys, UrlKeys[]> = {
  ROOT: [],
  HOME: ["HOME", "SHORTCUTS_EDITOR"],
  KINDERGARTEN: [
    "KINDERGARTEN",
    "KINDERGARTEN_DETAIL",
    "SEARCH_KINDERGARTEN",
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
  FAVORITES: ["FAVORITES"],
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
  // 나머지는 단순 매핑용
  INQUIRY: ["INQUIRY_PUBLIC", "INQUIRY_MY", "INQUIRY_EDITOR"],
  USER_PROFILE: ["USER_PROFILE_EDITOR"],
  USER_ACCOUNT_SETTING: ["USER_PASSWORD_EDITOR"],
  COMMUNITY_TEACHER: [],
  COMMUNITY_STUDENT: [],
  COMMUNITY_POST: [],
  COMMUNITY_POST_EDITOR: [],
  KINDERGARTEN_DETAIL: [],
  SEARCH_KINDERGARTEN: [],
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
  ALARM_SETTING: [],
  BLOCK: [],
  USER_PROFILE_EDITOR: [],
  USER_PASSWORD_EDITOR: [],
  PERMISSION_TEST: [],
  REPORT: [],
  SHORTCUTS_EDITOR: [],
  USER_POST: [],
  NAVER_CALLBACK: [],
  KAKAO_CALLBACK: [],
  APPLE_CALLBACK: [],
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
