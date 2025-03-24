import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";
import { SVG_PATHS } from "@/constants/assets-path";
import { getCommunityState, getReviewState } from "@/utils/sessionStorage";
import { URL } from "@/constants/url";

type UrlKeys = keyof typeof URL;

interface HeaderProps extends VariantProps<typeof headerVariants> {
  children?: React.ReactNode;
  title?: string;
  hasBackButton?: boolean;
  onBackButtonClick?: () => void;
}

const headerVariants = cva(
  "sticky top-0 w-full min-w-80 max-w-3xl bg-white flex h-14 items-center px-5 font-bold text-lg",
  {
    variants: {
      hasBorder: {
        true: "border-b border-opacity-5",
        false: "",
      },
    },
    defaultVariants: {
      hasBorder: true,
    },
  }
);

// 상위 UrlKey 목록
const ROOT_URL_KEYS: UrlKeys[] = [
  "HOME",
  "SCHOOL",
  "COMMUNITY",
  "BOOKMARKS",
  "USER",
];

// 상위 UrlKey 및 하위 UrlKey 그룹화
const URL_GROUPS: Record<UrlKeys, UrlKeys[]> = {
  HOME: ["HOME"],
  SCHOOL: ["SCHOOL", "SCHOOL_DETAIL", "SCHOOL_REVIEW", "SCHOOL_REVIEW_EDITOR"],
  COMMUNITY: [
    "COMMUNITY",
    "COMMUNITY_TEACHER",
    "COMMUNITY_STUDENT",
    "COMMUNITY_POST",
    "COMMUNITY_POST_EDITOR",
  ],
  BOOKMARKS: ["BOOKMARKS"],
  USER: ["USER"],
  COMMUNITY_TEACHER: [],
  COMMUNITY_STUDENT: [],
  COMMUNITY_POST: [],
  COMMUNITY_POST_EDITOR: [],
  SCHOOL_DETAIL: [],
  SCHOOL_REVIEW: [],
  SCHOOL_REVIEW_EDITOR: [],
  SIGNIN: [],
  SIGNUP: [],
  TEST: [],
};

// 에디터 페이지 관련 키
const EDITOR_URL_KEYS: UrlKeys[] = [
  "SCHOOL_REVIEW_EDITOR",
  "COMMUNITY_POST_EDITOR",
];

// 세션 스토리지 기반 이동이 필요한 페이지
const SESSION_STORAGE_BASED_URL_KEYS: UrlKeys[] = [
  ...EDITOR_URL_KEYS,
  "COMMUNITY_POST",
];

export default function Header({
  children,
  title,
  hasBorder = true,
  hasBackButton,
  onBackButtonClick,
}: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [shouldShowBackButton, setShouldShowBackButton] = useState(false);

  const getPathWithoutParams = useCallback((path: string): string => {
    return path.split("?")[0];
  }, []);

  const getCurrentUrlKey = useCallback((): UrlKeys | undefined => {
    const pathWithoutParams = getPathWithoutParams(location.pathname);

    // 경로가 정확히 일치하는지 확인
    const exactMatch = Object.entries(URL).find(
      ([_, path]) => getPathWithoutParams(path) === pathWithoutParams
    );
    if (exactMatch) return exactMatch[0] as UrlKeys;

    // 정확히 일치하지 않는 경우 패턴 매칭
    return Object.entries(URL).find(([, path]) => {
      // 동적 경로 매개변수 패턴으로 변환 (:id -> [^/]+)
      const pathPattern =
        path.replace(/:[^/]+/g, "[^/]+").replace(/\//g, "\\/") + "$";
      const regex = new RegExp(pathPattern);
      return regex.test(pathWithoutParams);
    })?.[0] as UrlKeys | undefined;
  }, [location.pathname, getPathWithoutParams]);

  // 뒤로가기 버튼 표시 여부 결정
  useEffect(() => {
    if (hasBackButton !== undefined) {
      setShouldShowBackButton(hasBackButton);
      return;
    }

    const segments = location.pathname
      .split("/")
      .filter((segment) => segment !== "");

    // 루트 페이지인 경우 뒤로가기 버튼 미표시
    if (segments.length === 0) {
      setShouldShowBackButton(false);
      return;
    }

    // 현재 URL 키 확인
    const currentUrlKey = getCurrentUrlKey();
    console.log(
      "현재 URL 키 결정:",
      currentUrlKey,
      "루트 키 포함 여부:",
      ROOT_URL_KEYS.includes(currentUrlKey as UrlKeys)
    );

    // 메인 페이지에서는 뒤로가기 버튼 미표시
    if (currentUrlKey && ROOT_URL_KEYS.includes(currentUrlKey)) {
      setShouldShowBackButton(false);
      return;
    }

    // 1단계 이상 깊이의 경로에서는 뒤로가기 버튼 표시
    setShouldShowBackButton(segments.length >= 1);
  }, [hasBackButton, location.pathname, getCurrentUrlKey]);

  // 뒤로가기 처리
  const handleBackNavigation = () => {
    console.log("현재 경로:", location.pathname);

    // 상위 컴포넌트에서 처리하는 경우
    if (onBackButtonClick) {
      onBackButtonClick();
      return;
    }

    const currentUrlKey = getCurrentUrlKey();
    console.log("현재 URL 키:", currentUrlKey);

    // 세션 스토리지 기반 이동 페이지 처리
    if (
      currentUrlKey &&
      SESSION_STORAGE_BASED_URL_KEYS.includes(currentUrlKey)
    ) {
      // 리뷰 에디터
      if (currentUrlKey === "SCHOOL_REVIEW_EDITOR") {
        const reviewState = getReviewState();
        console.log("리뷰 상태:", reviewState);
        if (reviewState?.path) {
          navigate(reviewState.path);
          return;
        }
      }

      // 커뮤니티 에디터 또는 커뮤니티 게시글
      if (
        currentUrlKey === "COMMUNITY_POST_EDITOR" ||
        currentUrlKey === "COMMUNITY_POST"
      ) {
        const communityState = getCommunityState();
        console.log("커뮤니티 상태:", communityState);
        if (communityState?.path) {
          navigate(communityState.path);
          return;
        }
      }

      // 세션 스토리지에 경로가 없는 경우 기본 뒤로가기
      navigate(-1);
      return;
    }

    // 현재 URL이 최상위 그룹에 속하는지 확인
    if (currentUrlKey && ROOT_URL_KEYS.includes(currentUrlKey)) {
      // 최상위 경로인 경우 홈으로
      navigate("/");
      return;
    }

    // URL 그룹 기반 상위 경로로 이동
    if (currentUrlKey) {
      // 현재 URL이 속한 상위 그룹 찾기
      const parentUrlKey = ROOT_URL_KEYS.find((rootKey) =>
        URL_GROUPS[rootKey].includes(currentUrlKey)
      );

      if (parentUrlKey) {
        navigate(URL[parentUrlKey]);
        return;
      }
    }

    // 일반적인 경로 처리 - 한 단계 상위로
    const segments = location.pathname
      .split("/")
      .filter((segment) => segment !== "");
    if (segments.length > 1) {
      segments.pop();
      navigate("/" + segments.join("/"));
    } else {
      navigate("/");
    }
  };

  return (
    <header className={cn(headerVariants({ hasBorder }))}>
      {shouldShowBackButton && (
        <button
          className="mr-3"
          onClick={handleBackNavigation}
          aria-label="뒤로 가기"
        >
          <img src={SVG_PATHS.ARROW.left} alt="뒤로 가기" className="w-6 h-6" />
        </button>
      )}
      <div className="flex items-center justify-between w-full">
        {title && <h1>{title}</h1>}
        {children}
      </div>
    </header>
  );
}
