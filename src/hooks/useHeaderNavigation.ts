import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { UrlKeys } from "@/utils/urlUtils";

import { useUrlNavigation } from "./useUrlNavigation";

interface HeaderNavigationOptions {
  hasBackButton?: boolean;
  onBackButtonClick?: () => void;
  shouldShowBackButtonCondition?: (
    currentPath: string,
    currentUrlKey?: UrlKeys
  ) => boolean;
}

/**
 * 헤더의 네비게이션 로직을 관리하는 커스텀 훅
 *
 * 1. 뒤로가기 버튼 표시 여부
 * 2. 뒤로가기 버튼 클릭 시 상호작용 설정
 * 3. 페이지에 따라 네비게이션 동작 결정
 *
 * @param {HeaderNavigationOptions} [options={}] - 네비게이션 설정 옵션
 * @param {boolean} [options.hasBackButton] - 뒤로가기 버튼 강제 표시/숨김 설정
 * @param {() => void} [options.onBackButtonClick] - 뒤로가기 버튼 클릭 시 실행될 커스텀 핸들러
 * @param {(currentPath: string, currentUrlKey?: UrlKeys) => boolean} [options.shouldShowBackButtonCondition] - 뒤로가기 버튼 표시 조건 결정
 *
 * @returns {object} 네비게이션 관련 상태와 핸들러
 * @returns {boolean} returns.shouldShowBackButton
 * @returns {() => void} returns.handleBackNavigation
 * @returns {() => UrlKeys | undefined} returns.getCurrentUrlKey
 *
 * @since 1.0.0
 * @see {@link useUrlNavigation} URL 네비게이션 로직
 */
export function useHeaderNavigation(options: HeaderNavigationOptions = {}) {
  const { hasBackButton, onBackButtonClick, shouldShowBackButtonCondition } =
    options;

  const {
    shouldShowBackButton: baseShowBackButton,
    handleBackNavigation,
    getCurrentUrlKey,
  } = useUrlNavigation(onBackButtonClick, hasBackButton);

  const location = useLocation();
  const [shouldShowBackButton, setShouldShowBackButton] =
    useState(baseShowBackButton);

  // 뒤로가기 버튼 표시 여부 결정
  useEffect(() => {
    let shouldShow = baseShowBackButton;

    // 사용자 정의 조건이 있는 경우 추가 검사
    if (shouldShowBackButtonCondition) {
      const currentUrlKey = getCurrentUrlKey();
      const customCondition = shouldShowBackButtonCondition(
        location.pathname,
        currentUrlKey
      );
      shouldShow = shouldShow && customCondition;
    }

    setShouldShowBackButton(shouldShow);
  }, [
    baseShowBackButton,
    location.pathname,
    getCurrentUrlKey,
    shouldShowBackButtonCondition,
  ]);

  return {
    shouldShowBackButton,
    handleBackNavigation,
    getCurrentUrlKey,
  };
}
