import { useEffect } from "react";
import { Link } from "react-router-dom";

import { URL } from "@/constants/url";
import { SVG_PATHS } from "@/constants/assets-path";

interface GlobalNavBarProps {
  currentPath: string;
}

type UrlKeys = keyof typeof URL;

const LAST_VISITED_PATHS_KEY = "lastVisitedPaths";

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
};

const NAV_BAR_ITEMS = [
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
  const getPathWithoutParams = (path: string): string => {
    return path.split("?")[0];
  };

  // 경로 UrlKey로 변환
  const getCurrentUrlKey = (): UrlKeys | undefined => {
    const pathWithoutParams = getPathWithoutParams(currentPath);

    const exactMatch = Object.entries(URL).find(
      ([_, path]) => getPathWithoutParams(path) === pathWithoutParams
    );
    if (exactMatch) return exactMatch[0] as UrlKeys;

    // 정확히 일치하지 않는 경우 패턴 매칭
    return Object.entries(URL).find(([, path]) => {
      const pathPattern =
        path.replace(/:[^/]+/g, "[^/]+").replace(/\//g, "\\/") + "$";
      const regex = new RegExp(pathPattern);
      return regex.test(pathWithoutParams);
    })?.[0] as UrlKeys | undefined;
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
    const currentUrlKey = getCurrentUrlKey();

    // 에디터 페이지에서는 이전 페이지로 이동
    if (
      currentUrlKey === "SCHOOL_REVIEW_EDITOR" ||
      currentUrlKey === "COMMUNITY_POST_EDITOR"
    ) {
      return "#";
    }

    // URL 객체에 해당 키가 없는 경우 대비
    if (!(urlKey in URL)) {
      console.warn(`URL key ${urlKey} not found in URL object`);
      return "/";
    }

    if (!ROOT_URL_KEYS.includes(urlKey)) {
      return URL[urlKey];
    }

    if (urlKey === "COMMUNITY") {
      const lastVisitedPaths = getLastVisitedPaths();
      return lastVisitedPaths[urlKey] || `${URL[urlKey]}?type=teacher`;
    }

    const lastVisitedPaths = getLastVisitedPaths();
    return lastVisitedPaths[urlKey] || URL[urlKey];
  };

  // 현재 경로가 urlKey 그룹에 속하는지 확인
  const isPathActive = (urlKey: UrlKeys): boolean => {
    const currentUrlKey = getCurrentUrlKey();
    const pathWithoutParams = getPathWithoutParams(currentPath);

    if (urlKey === "HOME") {
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

  return (
    <nav className="fixed bottom-0 h-14 items-center w-full text-xs min-w-80 max-w-3xl bg-white flex py-3 px-8 mx-auto justify-between border-t border-opacity-5 font-bold">
      {NAV_BAR_ITEMS.map(
        ({ label, urlKey, ariaLabel, dataButtonName, iconPaths }) => {
          if (!(urlKey in URL)) {
            console.warn(`Invalid URL key: ${urlKey}`);
            return null;
          }

          const isActive = isPathActive(urlKey);
          const linkPath = getUrlForKey(urlKey);
          const currentUrlKey = getCurrentUrlKey();

          // 뒤로가기 적용 페이지
          const handleClick = (e: React.MouseEvent) => {
            if (
              currentUrlKey === "SCHOOL_REVIEW_EDITOR" ||
              currentUrlKey === "COMMUNITY_POST_EDITOR"
            ) {
              e.preventDefault();
              window.history.back();
            }
          };

          return (
            <Link
              key={label}
              to={linkPath}
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
