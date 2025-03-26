import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UrlKeys } from "@/utils/urlUtils";
import { useUrlNavigation } from "./useUrlNavigation";

/**
 * 뒤로가기 버튼 표시 여부 및 버튼 클릭 시 상호작용 설정
 * @param hasBackButton 뒤로가기 버튼 표시 여부
 * @param onBackButtonClick 뒤로가기 버튼 클릭 시 처리할 커스텀 함수
 * @param shouldShowBackButtonCondition 뒤로가기 버튼 표시 여부를 결정하는 추가 조건 함수
 */

interface HeaderNavigationOptions {
  hasBackButton?: boolean;
  onBackButtonClick?: () => void;
  shouldShowBackButtonCondition?: (
    currentPath: string,
    currentUrlKey?: UrlKeys
  ) => boolean;
}

export function useHeaderNavigation(options: HeaderNavigationOptions = {}) {
  const { hasBackButton, onBackButtonClick, shouldShowBackButtonCondition } =
    options;

  // URL 탐색 훅 활용
  const {
    shouldShowBackButton: baseShowBackButton,
    handleBackNavigation: baseHandleBackNavigation,
    getCurrentUrlKey,
  } = useUrlNavigation(onBackButtonClick, hasBackButton);

  const location = useLocation();
  const [shouldShowBackButton, setShouldShowBackButton] =
    useState(baseShowBackButton);

  // 조건부 뒤로가기 버튼 표시
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
    handleBackNavigation: baseHandleBackNavigation,
    getCurrentUrlKey,
  };
}
