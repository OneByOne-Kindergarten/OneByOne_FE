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
    "USER_PROFILE_EDITOR",
    "USER_PASSWORD_EDITOR",
    "USER_ACCOUNT_SETTING",
    "INQUIRY",
    "NOTICE",
    "NOTICE_DETAIL",
    "USER_POST",
  ],
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
  INQUIRY: [],
  NOTICE: [],
  NOTICE_DETAIL: [],
  USER_PROFILE_EDITOR: [],
  USER_NICKNAME_EDITOR: [],
  USER_PASSWORD_EDITOR: [],
  USER_ACCOUNT_SETTING: [],
  PERMISSION_TEST: [],
  TEST: [],
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

export default function GlobalNavBar({ currentPath }: GlobalNavBarProps) {
  // 경로 UrlKey로 변환 - 공통 유틸 함수 사용
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
      // 게시글 작성 페이지일 경우 커뮤니티로 처리
      if (isCommunityPost()) {
        saveLastVisitedPath("COMMUNITY", currentPath);
      }
      return;
    }

    // 현재 경로가 속한 상위 페이지 검색
    const parentUrlKey = ROOT_URL_KEYS.find((rootKey) =>
      URL_GROUPS[rootKey]?.includes(currentUrlKey)
    );

    if (parentUrlKey) {
      saveLastVisitedPath(parentUrlKey, currentPath);
    }
  }, [currentPath]);

  const getUrlForKey = (urlKey: UrlKeys): string => {
    // URL_PATHS 객체에 해당 키가 없는 경우 대비
    if (!(urlKey in URL_PATHS)) {
      console.warn(`URL key ${urlKey} not found in URL_PATHS`);
      return "/";
    }

    if (!ROOT_URL_KEYS.includes(urlKey)) {
      return URL_PATHS[urlKey];
    }

    if (urlKey === "COMMUNITY") {
      const lastVisitedPaths = getLastVisitedPaths();
      return lastVisitedPaths[urlKey] || `${URL_PATHS[urlKey]}?type=teacher`;
    }

    const lastVisitedPaths = getLastVisitedPaths();
    return lastVisitedPaths[urlKey] || URL_PATHS[urlKey];
  };

  // 현재 경로가 urlKey 그룹에 속하는지 확인
  const isPathActive = (urlKey: UrlKeys): boolean => {
    const currentUrlKey = getCurrentUrlKey();
    const pathWithoutParams = getPathWithoutParams(currentPath);

    if (urlKey === "ROOT") {
      return pathWithoutParams === "/";
    }

    // URL_GROUPS에 해당 키가 없는 경우 대비
    if (!(urlKey in URL_GROUPS)) {
      console.warn(`URL key ${urlKey} not found in URL_GROUPS`);
      return false;
    }

    // 커뮤니티 게시글 페이지인 경우
    if (urlKey === "COMMUNITY" && isCommunityPost()) {
      return true;
    }

    return (
      currentUrlKey !== undefined && URL_GROUPS[urlKey].includes(currentUrlKey)
    );
  };

  const isEditingPage = (): boolean => {
    const currentUrlKey = getCurrentUrlKey();
    return (
      currentUrlKey === "REVIEW_EDITOR" ||
      currentUrlKey === "COMMUNITY_POST_EDITOR"
    );
  };

  return (
    <nav className="fixed bottom-0 h-14 items-center w-full text-xs min-w-80 max-w-3xl bg-white flex py-3 px-8 mx-auto justify-between border-t border-opacity-5 font-bold">
      {NAV_BAR_ITEMS.map(
        ({ label, urlKey, ariaLabel, dataButtonName, iconPaths }) => {
          if (!(urlKey in URL_PATHS)) {
            console.warn(`Invalid URL key: ${urlKey}`);
            return null;
          }

          const isActive = isPathActive(urlKey);
          const linkPath = getUrlForKey(urlKey);
          const editing = isEditingPage();

          // 현재 활성화된 네비게이션만 뒤로가기 처리
          const shouldGoBack = editing && isActive;

          // 뒤로가기 적용 페이지
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
              className={`flex flex-col text-xxs items-center ${isActive ? "text-primary" : "text-primary-normal03"}`}
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
