import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { URL_PATHS } from "@/common/constants/url-path";
import {
  getCommunityState,
  getKindergartenTabPath,
  setCommunityState,
  setKindergartenState,
} from "@/common/utils/lastVisitedPathUtils";
import { getUrlKeyFromPath, UrlKeys } from "@/common/utils/urlUtils";

const ROOT_PAGES = [
  "/",
  "/home",
  "/kindergarten",
  "/community",
  "/favorites",
  "/user",
];

// 세션스토리지에 페이지 방문 기록 저장
const saveCurrentPath = (currentPath: string): void => {
  const urlKey = getUrlKeyFromPath(currentPath);

  if (!urlKey) return;

  // 저장 제외 페이지
  if (
    urlKey === "SEARCH_KINDERGARTEN" ||
    urlKey === "SEARCH_COMMUNITY" ||
    urlKey === "COMMUNITY_POST"
  ) {
    return;
  }

  if (urlKey === "COMMUNITY" || currentPath.startsWith("/community")) {
    setCommunityState({ path: currentPath });
  }

  if (
    urlKey === "KINDERGARTEN" ||
    urlKey === "KINDERGARTEN_DETAIL" ||
    urlKey === "REVIEW"
  ) {
    setKindergartenState({ path: currentPath });
  }
};

export function useUrlNavigation(
  customBackHandler?: () => boolean | void,
  shouldShowBackButtonOverride?: boolean
) {
  const navigate = useNavigate();
  const location = useLocation();
  const [shouldShowBackButton, setShouldShowBackButton] = useState(false);

  /**
   * 탭별 이동할 URL 계산 함수
   */
  const getTabUrl = useCallback(
    (urlKey: UrlKeys): string => {
      switch (urlKey) {
        case "KINDERGARTEN": {
          const kindergartenPath = getKindergartenTabPath();
          return kindergartenPath;
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
            return `${URL_PATHS.COMMUNITY}?type=${currentType}&category=${categoryName}`;
          }

          // 세션 스토리지 사용
          if (
            communityState?.category &&
            communityState?.communityCategoryName
          ) {
            return `${URL_PATHS.COMMUNITY}?type=${communityState.category}&category=${communityState.communityCategoryName}`;
          }

          // 기본값
          return `${URL_PATHS.COMMUNITY}?type=teacher&category=top10`;
        }
        default:
          return URL_PATHS[urlKey] || "/";
      }
    },
    [location.pathname, location.search]
  );

  // 페이지 경로 저장
  useEffect(() => {
    const currentPath = location.pathname + location.search;
    saveCurrentPath(currentPath);
  }, [location.pathname, location.search]);

  // 뒤로가기 버튼 표시 여부 결정
  useEffect(() => {
    if (shouldShowBackButtonOverride !== undefined) {
      setShouldShowBackButton(shouldShowBackButtonOverride);
      return;
    }

    // 루트 페이지 확인
    const isRootPage = ROOT_PAGES.includes(location.pathname);
    setShouldShowBackButton(!isRootPage);
  }, [shouldShowBackButtonOverride, location.pathname]);

  const handleBackNavigation = useCallback(() => {
    try {
      // 커스텀 핸들러 우선 실행
      if (customBackHandler) {
        const handled = customBackHandler();

        if (handled === true) {
          return; // 처리 완료, 추가 네비게이션 없음
        } else if (handled === false) {
          // false 반환 시 기본 네비게이션 계속 진행
        } else {
          return; // void 반환 시 처리 완료로 간주
        }
      }

      // 커스텀 핸들러가 없거나 false를 반환한 경우
      navigate(-1);
    } catch {
      navigate("/");
    }
  }, [customBackHandler, navigate, location.pathname]);

  return {
    shouldShowBackButton,
    handleBackNavigation,
    getCurrentUrlKey: useCallback(
      () => getUrlKeyFromPath(location.pathname),
      [location.pathname]
    ),
    getTabUrl,
  };
}
