import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { URL_PATHS } from "@/constants/url-path";
import {
  getCommunityState,
  getSchoolTabPath,
  setCommunityState,
  setSchoolState,
} from "@/utils/lastVisitedPathUtils";
import {
  findParentUrlKey,
  getCurrentUrlKey,
  getNavigationStrategy,
  getStorageStrategy,
  isCommunityPost,
  isRootPage,
  NavigationStrategy,
  StorageStrategy,
} from "@/utils/navigationUtils";
import { getParentPath, getPathSegments, UrlKeys } from "@/utils/urlUtils";

// 세션스토리지 기반 이동 페이지 경로 저장
const saveCurrentPath = (
  strategy: StorageStrategy,
  currentPath: string
): void => {
  switch (strategy) {
    case "community":
      setCommunityState({ path: currentPath });
      break;
    case "school":
      setSchoolState({ path: currentPath });
      break;
    case "none":
      break;
  }
};

/**
 * 세션스토리지 기반 이동 처리 함수
 */
const handleSessionStorage = (
  urlKey: UrlKeys,
  navigate: ReturnType<typeof useNavigate>
): boolean => {
  switch (urlKey) {
    case "SCHOOL": {
      const schoolPath = getSchoolTabPath();
      if (schoolPath !== "/school") {
        navigate(schoolPath);
        return true;
      }
      break;
    }
    case "COMMUNITY": {
      const communityState = getCommunityState();
      if (communityState?.path && communityState.path !== "/community") {
        navigate(communityState.path);
        return true;
      }
      break;
    }
  }
  return false;
};

/**
 * 브라우저 히스토리 기반 이동 처리 함수
 */
const handleBrowserHistory = (
  navigate: ReturnType<typeof useNavigate>
): boolean => {
  navigate(-1);
  return true;
};

/**
 * 계층 구조 기반 이동 처리 함수
 */
const handleHierarchical = (
  urlKey: UrlKeys,
  navigate: ReturnType<typeof useNavigate>
): boolean => {
  const parentUrlKey = findParentUrlKey(urlKey);

  if (parentUrlKey && parentUrlKey in URL_PATHS) {
    navigate(URL_PATHS[parentUrlKey]);
    return true;
  }

  return false;
};

/**
 * 루트 페이지 이동 처리 함수
 */
const handleRoot = (navigate: ReturnType<typeof useNavigate>): boolean => {
  navigate("/");
  return true;
};

/**
 * 기본 이동 처리 함수 (fallback)
 */
const handleFallback = (
  pathname: string,
  navigate: ReturnType<typeof useNavigate>
): boolean => {
  navigate(getParentPath(pathname));
  return true;
};

/**
 * URL 네비게이션 및 뒤로가기 버튼 관리 훅
 *
 * - 모든 이동 로직 담당
 * - 뒤로가기 버튼 표시/숨김 관리
 */
export function useUrlNavigation(
  customBackHandler?: () => void,
  shouldShowBackButtonOverride?: boolean
) {
  const navigate = useNavigate();
  const location = useLocation();
  const [shouldShowBackButton, setShouldShowBackButton] = useState(false);

  const getUrlKey = useCallback((): UrlKeys | undefined => {
    return getCurrentUrlKey(location.pathname);
  }, [location.pathname]);

  /**
   * 탭별 이동할 URL 계산 함수
   */
  const getTabUrl = useCallback(
    (urlKey: UrlKeys): string => {
      switch (urlKey) {
        case "SCHOOL": {
          const schoolPath = getSchoolTabPath();
          return schoolPath;
        }
        case "COMMUNITY": {
          const communityState = getCommunityState();

          // 현재 URL에서 type 파라미터 추출
          const currentUrlParams = new URLSearchParams(location.search);
          const currentType = currentUrlParams.get("type");

          // type이 있으면 현재 컨텍스트 유지
          if (location.pathname === "/community" && currentType) {
            const categoryName =
              communityState?.communityCategoryName || "top10";
            const contextualPath = `${URL_PATHS.COMMUNITY}?type=${currentType}&category=${categoryName}`;

            return contextualPath;
          }

          // type이 없으면 세션 스토리지 사용
          if (
            communityState?.category &&
            communityState?.communityCategoryName
          ) {
            const dynamicPath = `${URL_PATHS.COMMUNITY}?type=${communityState.category}&category=${communityState.communityCategoryName}`;

            return dynamicPath;
          }

          // 세션 스토리지가 없으면 기본값
          return `${URL_PATHS.COMMUNITY}?type=teacher&category=top10`;
        }
        default:
          return URL_PATHS[urlKey] || "/";
      }
    },
    [location.pathname, location.search]
  );

  // 페이지 방문 기록을 세션스토리지에 저장
  useEffect(() => {
    const currentUrlKey = getCurrentUrlKey(location.pathname);

    if (!currentUrlKey) {
      if (isCommunityPost(location.pathname)) {
        return;
      }
      return;
    }

    // 커뮤니티 게시글 페이지 및 검색 페이지 제외
    if (
      currentUrlKey === "COMMUNITY_POST" ||
      currentUrlKey === "SEARCH_SCHOOL" ||
      currentUrlKey === "SEARCH_COMMUNITY"
    ) {
      return;
    }

    const parentUrlKey = findParentUrlKey(currentUrlKey);
    if (parentUrlKey) {
      const storageStrategy = getStorageStrategy(parentUrlKey);
      saveCurrentPath(storageStrategy, location.pathname);
    }
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

    const currentUrlKey = getUrlKey();

    if (currentUrlKey && isRootPage(currentUrlKey)) {
      setShouldShowBackButton(false);
      return;
    }

    setShouldShowBackButton(segments.length >= 1);
  }, [shouldShowBackButtonOverride, location.pathname, getUrlKey]);

  /**
   * 전략 기반 이동 실행 함수
   */
  const executeNavigationStrategy = useCallback(
    (strategy: NavigationStrategy, urlKey: UrlKeys): boolean => {
      switch (strategy) {
        case "session_storage":
          return handleSessionStorage(urlKey, navigate);
        case "browser_history":
          return handleBrowserHistory(navigate);
        case "hierarchical":
          return handleHierarchical(urlKey, navigate);
        case "root":
          return handleRoot(navigate);
        case "fallback":
          return handleFallback(location.pathname, navigate);
        default:
          return false;
      }
    },
    [navigate, location.pathname]
  );

  /**
   * 메인 뒤로가기 핸들러
   */
  const handleBackNavigation = useCallback(() => {
    if (customBackHandler) {
      customBackHandler();
      return;
    }

    const currentUrlKey = getUrlKey();
    if (!currentUrlKey) {
      handleFallback(location.pathname, navigate);
      return;
    }

    const strategy = getNavigationStrategy(currentUrlKey);
    const success = executeNavigationStrategy(strategy, currentUrlKey);

    if (!success && strategy !== "fallback") {
      handleFallback(location.pathname, navigate);
    }
  }, [
    customBackHandler,
    getUrlKey,
    executeNavigationStrategy,
    navigate,
    location.pathname,
  ]);

  return {
    shouldShowBackButton,
    handleBackNavigation,
    getCurrentUrlKey: getUrlKey,
    getTabUrl,
    getNavigationStrategy: useCallback(() => {
      const urlKey = getUrlKey();
      return urlKey ? getNavigationStrategy(urlKey) : "fallback";
    }, [getUrlKey]),
  };
}
