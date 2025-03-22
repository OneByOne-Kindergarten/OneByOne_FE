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
  "COMMUNITY_TEACHER",
  "BOOKMARKS",
  "USER",
];

// 상위 UrlKey 및 하위 UrlKey 그룹화
const URL_GROUPS: Record<UrlKeys, UrlKeys[]> = {
  HOME: ["HOME"],
  SCHOOL: [
    "SCHOOL",
    "SCHOOL_DETAIL",
    "SCHOOL_REVIEW_WORK",
    "SCHOOL_REVIEW_LEARNING",
  ],
  COMMUNITY_TEACHER: ["COMMUNITY_TEACHER", "COMMUNITY_STUDENT"],
  BOOKMARKS: ["BOOKMARKS"],
  USER: ["USER"],
  COMMUNITY_STUDENT: [],
  SCHOOL_DETAIL: [],
  SCHOOL_REVIEW_WORK: [],
  SCHOOL_REVIEW_LEARNING: [],
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
    urlKey: "COMMUNITY_TEACHER" as UrlKeys,
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
  // 현재 경로를 UrlKey로 변환
  const getCurrentUrlKey = (): UrlKeys | undefined => {
    return Object.entries(URL).find(([, path]) => {
      const pathPattern =
        path.replace(/:[^/]+/g, "[^/]+").replace(/\//g, "\\/") + "$";
      const regex = new RegExp(pathPattern);
      return regex.test(currentPath);
    })?.[0] as UrlKeys | undefined;
  };

  // 세션 스토리지에서 마지막으로 방문한 경로 정보 가져오기
  const getLastVisitedPaths = (): Record<UrlKeys, string> => {
    const storedPaths = sessionStorage.getItem(LAST_VISITED_PATHS_KEY);
    return storedPaths ? JSON.parse(storedPaths) : {};
  };

  // 세션 스토리지에 마지막으로 방문한 경로 정보 저장
  const saveLastVisitedPath = (urlKey: UrlKeys, path: string) => {
    const lastVisitedPaths = getLastVisitedPaths();
    lastVisitedPaths[urlKey] = path;
    sessionStorage.setItem(
      LAST_VISITED_PATHS_KEY,
      JSON.stringify(lastVisitedPaths)
    );
  };

  useEffect(() => {
    const currentUrlKey = getCurrentUrlKey();
    if (!currentUrlKey) return;

    // 현재 경로가 속한 상위 메뉴 찾기
    const parentUrlKey = ROOT_URL_KEYS.find((rootKey) =>
      URL_GROUPS[rootKey]?.includes(currentUrlKey)
    );

    if (parentUrlKey) {
      saveLastVisitedPath(parentUrlKey, currentPath);
    }
  }, [currentPath]);

  // 해당 URL 키에 대한 경로 가져오기
  const getUrlForKey = (urlKey: UrlKeys): string => {
    // URL 객체에 해당 키가 없는 경우 대비
    if (!(urlKey in URL)) {
      console.warn(`URL key ${urlKey} not found in URL object`);
      return "/";
    }

    if (!ROOT_URL_KEYS.includes(urlKey)) {
      return URL[urlKey];
    }

    const lastVisitedPaths = getLastVisitedPaths();
    return lastVisitedPaths[urlKey] || URL[urlKey];
  };

  // 현재 경로가 urlKey 그룹에 속하는지 확인
  const isPathActive = (urlKey: UrlKeys): boolean => {
    const currentUrlKey = getCurrentUrlKey();

    if (urlKey === "HOME") {
      return currentPath === "/";
    }

    // URL_GROUPS에 해당 키가 없는 경우 대비
    if (!(urlKey in URL_GROUPS)) {
      console.warn(`URL key ${urlKey} not found in URL_GROUPS`);
      return false;
    }

    return (
      currentUrlKey !== undefined && URL_GROUPS[urlKey].includes(currentUrlKey)
    );
  };

  return (
    <nav className="fixed bottom-0 h-14 items-center w-full text-xs min-w-80 max-w-3xl bg-white flex py-3 px-8 mx-auto justify-between border-t border-opacity-5 font-bold">
      {NAV_BAR_ITEMS.map(
        ({ label, urlKey, ariaLabel, dataButtonName, iconPaths }) => {
          // URL 객체에 없는 키가 사용되었는지 확인
          if (!(urlKey in URL)) {
            console.warn(`Invalid URL key: ${urlKey}`);
            return null;
          }

          const isActive = isPathActive(urlKey);
          const linkPath = getUrlForKey(urlKey);

          return (
            <Link
              key={label}
              to={linkPath}
              aria-label={ariaLabel}
              data-button-name={dataButtonName}
              data-section-name="gnb"
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
