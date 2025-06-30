import { useEffect } from "react";
import { Link } from "react-router-dom";

import { URL_PATHS } from "@/constants/url-path";
import { SVG_PATHS } from "@/constants/assets-path";
import {
  getPathWithoutParams,
  getUrlKeyFromPath,
  UrlKeys,
} from "@/utils/urlUtils";

interface GlobalNavBarProps {
  currentPath: string;
}

const LAST_VISITED_PATHS_KEY = "lastVisitedPaths";

// 상위 UrlKey 목록
const ROOT_URL_KEYS: UrlKeys[] = [
  "ROOT",
  "SCHOOL",
  "COMMUNITY",
  "BOOKMARKS",
  "USER",
];

// 상위 UrlKey 및 하위 UrlKey 그룹화
const URL_GROUPS: Record<UrlKeys, UrlKeys[]> = {
  ROOT: ["ROOT"],
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
  USER: [
    "USER",
    "USER_PROFILE",
    "USER_PROFILE_EDITOR",
    "USER_PASSWORD_EDITOR",
    "USER_ACCOUNT_SETTING",
    "INQUIRY",
    "NOTICE",
    "NOTICE_DETAIL",
    "ALARM",
    "USER_POST",
  ],
  INQUIRY: ["INQUIRY_PUBLIC", "INQUIRY_MY", "INQUIRY_EDITOR"],
  // 단일 페이지들은 각자만 포함
  COMMUNITY_TEACHER: ["COMMUNITY_TEACHER"],
  COMMUNITY_STUDENT: ["COMMUNITY_STUDENT"],
  COMMUNITY_POST: ["COMMUNITY_POST"],
  COMMUNITY_POST_EDITOR: ["COMMUNITY_POST_EDITOR"],
  SCHOOL_DETAIL: ["SCHOOL_DETAIL"],
  REVIEW: ["REVIEW"],
  REVIEW_WORK: ["REVIEW_WORK"],
  REVIEW_LEARNING: ["REVIEW_LEARNING"],
  REVIEW_EDITOR: ["REVIEW_EDITOR"],
  SIGNIN: ["SIGNIN"],
  SIGNUP: ["SIGNUP"],
  INQUIRY_PUBLIC: ["INQUIRY_PUBLIC"],
  INQUIRY_MY: ["INQUIRY_MY"],
  INQUIRY_EDITOR: ["INQUIRY_EDITOR"],
  NOTICE: ["NOTICE"],
  NOTICE_DETAIL: ["NOTICE_DETAIL"],
  ALARM: ["ALARM"],
  USER_PROFILE: ["USER_PROFILE"],
  USER_PROFILE_EDITOR: ["USER_PROFILE_EDITOR"],
  USER_PASSWORD_EDITOR: ["USER_PASSWORD_EDITOR"],
  USER_ACCOUNT_SETTING: ["USER_ACCOUNT_SETTING"],
  PERMISSION_TEST: ["PERMISSION_TEST"],
  REPORT: ["REPORT"],
  SHORTCUTS_EDITOR: ["SHORTCUTS_EDITOR"],
  TEST: ["TEST"],
  USER_POST: ["USER_POST"],
  NAVER_CALLBACK: ["NAVER_CALLBACK"],
  KAKAO_CALLBACK: ["KAKAO_CALLBACK"],
  APPLE_CALLBACK: ["APPLE_CALLBACK"],
};

const NAV_BAR_ITEMS = [
  {
    label: "홈",
    urlKey: "HOME" as UrlKeys,
    ariaLabel: "홈 페이지로 이동",
    dataButtonName: "홈",
    iconPaths: SVG_PATHS.HOME,
  },
  {
    label: "유치원",
    urlKey: "SCHOOL" as UrlKeys,
    ariaLabel: "기관 찾기 페이지로 이동",
    dataButtonName: "유치원",
    iconPaths: SVG_PATHS.SCHOOL,
  },
  {
    label: "커뮤니티",
    urlKey: "COMMUNITY" as UrlKeys,
    ariaLabel: "커뮤니티 페이지로 이동",
    dataButtonName: "커뮤니티",
    iconPaths: SVG_PATHS.COMMUNITY,
  },
  {
    label: "즐겨찾기",
    urlKey: "BOOKMARKS" as UrlKeys,
    ariaLabel: "즐겨찾기 페이지로 이동",
    dataButtonName: "즐겨찾기",
    iconPaths: SVG_PATHS.BOOKMARKS,
  },
  {
    label: "프로필",
    urlKey: "USER" as UrlKeys,
    ariaLabel: "유저 페이지로 이동",
    dataButtonName: "프로필",
    iconPaths: SVG_PATHS.USER,
  },
];

// 윈도우 뒤로가기가 적용될 페이지들
const BACK_NAVIGATION_PAGES: UrlKeys[] = [
  "REVIEW_EDITOR",
  "COMMUNITY_POST_EDITOR",
];

export default function GlobalNavBar({ currentPath }: GlobalNavBarProps) {
  const getCurrentUrlKey = (): UrlKeys | undefined => {
    return getUrlKeyFromPath(currentPath);
  };

  const isCommunityPost = (): boolean => {
    return getPathWithoutParams(currentPath).startsWith("/community-post/");
  };

  const getLastVisitedPaths = (): Record<UrlKeys, string> => {
    if (typeof window === "undefined") return {} as Record<UrlKeys, string>;
    const storedPaths = sessionStorage.getItem(LAST_VISITED_PATHS_KEY);
    return storedPaths ? JSON.parse(storedPaths) : {};
  };

  const saveLastVisitedPath = (urlKey: UrlKeys, path: string) => {
    if (typeof window === "undefined") return;
    const lastVisitedPaths = getLastVisitedPaths();
    lastVisitedPaths[urlKey] = path;
    sessionStorage.setItem(
      LAST_VISITED_PATHS_KEY,
      JSON.stringify(lastVisitedPaths)
    );
  };

  useEffect(() => {
    const currentUrlKey = getCurrentUrlKey();
    if (!currentUrlKey) {
      if (isCommunityPost()) {
        saveLastVisitedPath("COMMUNITY", currentPath);
      }
      return;
    }

    const parentUrlKey = ROOT_URL_KEYS.find((rootKey) =>
      URL_GROUPS[rootKey]?.includes(currentUrlKey)
    );

    if (parentUrlKey) {
      saveLastVisitedPath(parentUrlKey, currentPath);
    }
  }, [currentPath]);

  const getUrlForKey = (urlKey: UrlKeys): string => {
    if (!(urlKey in URL_PATHS)) {
      console.warn(`URL key ${urlKey} not found in URL_PATHS`);
      return "/";
    }

    if (!ROOT_URL_KEYS.includes(urlKey)) {
      return URL_PATHS[urlKey];
    }

    const lastVisitedPaths = getLastVisitedPaths();

    if (urlKey === "COMMUNITY") {
      return lastVisitedPaths[urlKey] || `${URL_PATHS[urlKey]}?type=teacher`;
    }

    return lastVisitedPaths[urlKey] || URL_PATHS[urlKey];
  };

  const isPathActive = (urlKey: UrlKeys): boolean => {
    const currentUrlKey = getCurrentUrlKey();
    const pathWithoutParams = getPathWithoutParams(currentPath);

    if (urlKey === "ROOT") {
      return pathWithoutParams === "/";
    }

    if (!(urlKey in URL_GROUPS)) {
      console.warn(`URL key ${urlKey} not found in URL_GROUPS`);
      return false;
    }

    if (urlKey === "COMMUNITY" && isCommunityPost()) {
      return true;
    }

    return (
      currentUrlKey !== undefined && URL_GROUPS[urlKey].includes(currentUrlKey)
    );
  };

  const shouldUseBackNavigation = (): boolean => {
    const currentUrlKey = getCurrentUrlKey();
    return (
      currentUrlKey !== undefined &&
      BACK_NAVIGATION_PAGES.includes(currentUrlKey)
    );
  };

  return (
    <nav className="fixed bottom-0 mx-auto flex h-14 w-full min-w-80 max-w-3xl items-center justify-between border-t border-opacity-5 bg-white px-8 py-3 text-xs font-bold">
      {NAV_BAR_ITEMS.map(
        ({ label, urlKey, ariaLabel, dataButtonName, iconPaths }) => {
          if (!(urlKey in URL_PATHS)) {
            console.warn(`Invalid URL key: ${urlKey}`);
            return null;
          }

          const isActive = isPathActive(urlKey);
          const linkPath = getUrlForKey(urlKey);
          const useBackNavigation = shouldUseBackNavigation();

          // 편집 페이지에서만 활성화된 네비게이션 탭에 뒤로가기 적용
          const shouldGoBack = useBackNavigation && isActive;

          const handleClick = (e: React.MouseEvent) => {
            if (shouldGoBack) {
              e.preventDefault();
              window.history.back();
            }
          };

          return (
            <Link
              key={label}
              to={shouldGoBack ? "#" : linkPath}
              aria-label={ariaLabel}
              data-button-name={dataButtonName}
              data-section-name="gnb"
              onClick={handleClick}
              className={`flex flex-col items-center text-xxs ${isActive ? "text-primary" : "text-primary-normal03"}`}
            >
              <img
                src={isActive ? iconPaths.active : iconPaths.inactive}
                alt={`${label} 아이콘`}
                width="24"
                height="24"
              />
              <span>{label}</span>
            </Link>
          );
        }
      )}
    </nav>
  );
}
