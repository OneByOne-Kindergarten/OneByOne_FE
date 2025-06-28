import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { URL_PATHS } from "@/constants/url-path";
import {
  getCommunityState,
  getReviewState,
} from "@/utils/lastVisitedPathUtils";
import {
  getUrlKeyFromPath,
  getPathSegments,
  getParentPath,
  UrlKeys,
} from "@/utils/urlUtils";

// 상위 UrlKey 목록
export const ROOT_URL_KEYS: UrlKeys[] = [
  "HOME",
  "SCHOOL",
  "COMMUNITY",
  "BOOKMARKS",
  "USER",
];

// 상위 UrlKey 및 하위 UrlKey 그룹화
export const URL_GROUPS: Record<UrlKeys, UrlKeys[]> = {
  HOME: ["HOME"],
  SCHOOL: [
    "SCHOOL",
    "SCHOOL_DETAIL",
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
  ],
  BOOKMARKS: ["BOOKMARKS"],
  USER: ["USER", "USER_POST", "INQUIRY", "NOTICE"],
  USER_POST: [],
  COMMUNITY_TEACHER: [],
  COMMUNITY_STUDENT: [],
  COMMUNITY_POST: [],
  COMMUNITY_POST_EDITOR: [],
  SCHOOL_DETAIL: [],
  REVIEW: [],
  REVIEW_WORK: [],
  REVIEW_LEARNING: [],
  REVIEW_EDITOR: [],
  SIGNIN: [],
  SIGNUP: [],
  TEST: [],
  ROOT: [],
  USER_PROFILE_EDITOR: [],
  USER_NICKNAME_EDITOR: [],
  USER_PASSWORD_EDITOR: [],
  USER_ACCOUNT_SETTING: [],
  INQUIRY: [],
  NOTICE: [],
  NOTICE_DETAIL: [],
  PERMISSION_TEST: [],
  SHORTCUTS_EDITOR: [],
  REPORT: [],
  INQUIRY_PUBLIC: [],
  INQUIRY_MY: [],
  INQUIRY_EDITOR: [],
  NAVER_CALLBACK: [],
  KAKAO_CALLBACK: [],
  APPLE_CALLBACK: [],
};

// 에디터 페이지 관련 키
export const EDITOR_URL_KEYS: UrlKeys[] = [
  "REVIEW_EDITOR",
  "COMMUNITY_POST_EDITOR",
];

// 세션 스토리지 기반 이동이 필요한 페이지
export const SESSION_STORAGE_BASED_URL_KEYS: UrlKeys[] = [
  ...EDITOR_URL_KEYS,
  "COMMUNITY_POST",
];

/**
 * URL 탐색 및 이동 처리
 * @param customBackHandler 커스텀 뒤로가기 핸들러
 * @param shouldShowBackButtonOverride 뒤로가기 버튼 표시 여부 설정
 */

export function useUrlNavigation(
  customBackHandler?: () => void,
  shouldShowBackButtonOverride?: boolean
) {
  const navigate = useNavigate();
  const location = useLocation();
  const [shouldShowBackButton, setShouldShowBackButton] = useState(false);

  // 현재 URL 키 확인
  const getCurrentUrlKey = useCallback((): UrlKeys | undefined => {
    return getUrlKeyFromPath(location.pathname);
  }, [location.pathname]);

  // 뒤로가기 버튼 표시 여부 결정
  useEffect(() => {
    if (shouldShowBackButtonOverride !== undefined) {
      setShouldShowBackButton(shouldShowBackButtonOverride);
      return;
    }

    const segments = getPathSegments(location.pathname);

    if (segments.length === 0) {
      setShouldShowBackButton(false);
      return;
    }

    const currentUrlKey = getCurrentUrlKey();

    if (currentUrlKey && ROOT_URL_KEYS.includes(currentUrlKey)) {
      setShouldShowBackButton(false);
      return;
    }

    setShouldShowBackButton(segments.length >= 1);
  }, [shouldShowBackButtonOverride, location.pathname, getCurrentUrlKey]);

  const handleBackNavigation = useCallback(() => {
    if (customBackHandler) {
      customBackHandler();
      return;
    }

    const currentUrlKey = getCurrentUrlKey();

    // 세션 스토리지를 기반으로 이동하는 페이지
    if (
      currentUrlKey &&
      SESSION_STORAGE_BASED_URL_KEYS.includes(currentUrlKey)
    ) {
      if (currentUrlKey === "REVIEW_EDITOR") {
        const reviewState = getReviewState();
        if (reviewState?.path) {
          navigate(reviewState.path);
          return;
        }
      }
      if (currentUrlKey === "COMMUNITY_POST_EDITOR") {
        const communityState = getCommunityState();
        if (communityState?.path) {
          navigate(communityState.path);
          return;
        }
      }

      // 직전으로 이동하는 페이지
      if (currentUrlKey === "COMMUNITY_POST") {
        navigate(-1);
        return;
      }
    }

    if (currentUrlKey && ROOT_URL_KEYS.includes(currentUrlKey)) {
      navigate("/");
      return;
    }

    // 한 단계 상위로 이동하는 페이지
    if (currentUrlKey) {
      const parentUrlKey = ROOT_URL_KEYS.find((rootKey) =>
        URL_GROUPS[rootKey].includes(currentUrlKey)
      );
      if (parentUrlKey) {
        navigate(URL_PATHS[parentUrlKey]);
        return;
      }
    }
    navigate(getParentPath(location.pathname));
  }, [customBackHandler, getCurrentUrlKey, navigate, location.pathname]);

  return {
    shouldShowBackButton,
    handleBackNavigation,
    getCurrentUrlKey,
  };
}
