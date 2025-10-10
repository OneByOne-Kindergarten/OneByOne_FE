import { Link } from "react-router-dom";

import {
  getCurrentUrlKey,
  isCommunityPost,
  isUrlKeyActive,
} from "@/features/nav/lib/isUrlKeyActive";
import { useUrlNavigation } from "@/features/nav/lib/useUrlNavigation";
import { SVG_PATHS } from "@/shared/constants/assets-path";
import { URL_PATHS } from "@/shared/constants/url-path";
import { getPathWithoutParams, UrlKeys } from "@/shared/utils/getUrl";

interface GlobalNavBarProps {
  currentPath: string;
}

interface NavigationItem {
  label: string;
  urlKey: UrlKeys;
  ariaLabel: string;
  dataButtonName: string;
  iconPaths: {
    active: string;
    inactive: string;
  };
}

const NAV_BAR_ITEMS: NavigationItem[] = [
  {
    label: "홈",
    urlKey: "HOME",
    ariaLabel: "홈 페이지로 이동",
    dataButtonName: "홈",
    iconPaths: SVG_PATHS.NAV.HOME,
  },
  {
    label: "유치원",
    urlKey: "KINDERGARTEN",
    ariaLabel: "유치원 찾기 페이지로 이동",
    dataButtonName: "유치원",
    iconPaths: SVG_PATHS.NAV.KINDERGARTEN,
  },
  {
    label: "커뮤니티",
    urlKey: "COMMUNITY",
    ariaLabel: "커뮤니티 페이지로 이동",
    dataButtonName: "커뮤니티",
    iconPaths: SVG_PATHS.NAV.COMMUNITY,
  },
  {
    label: "리뷰",
    urlKey: "REVIEW",
    ariaLabel: "리뷰 페이지로 이동",
    dataButtonName: "리뷰",
    iconPaths: SVG_PATHS.NAV.REVIEW,
  },
  {
    label: "프로필",
    urlKey: "USER",
    ariaLabel: "유저 페이지로 이동",
    dataButtonName: "프로필",
    iconPaths: SVG_PATHS.NAV.USER,
  },
];

/**
 * 특정 URL 키가 현재 활성 상태인지 확인
 */
const isPathActive = (urlKey: UrlKeys, currentPath: string): boolean => {
  const currentUrlKey = getCurrentUrlKey(currentPath);
  const pathWithoutParams = getPathWithoutParams(currentPath);

  if (urlKey === "ROOT") {
    return pathWithoutParams === "/";
  }

  if (urlKey === "COMMUNITY" && isCommunityPost(currentPath)) {
    return true;
  }

  return isUrlKeyActive(urlKey, currentUrlKey);
};

export default function GlobalNavBar({ currentPath }: GlobalNavBarProps) {
  const { getTabUrl } = useUrlNavigation();

  return (
    <nav
      className="fixed bottom-0 z-50 mx-auto flex h-14 w-full min-w-80 max-w-3xl items-center justify-between border-t border-opacity-5 bg-white px-8 py-3 text-xs font-bold"
      role="navigation"
      aria-label="글로벌 네비게이션"
    >
      {NAV_BAR_ITEMS.map((item) => {
        // URL 키 유효성 검사
        if (!(item.urlKey in URL_PATHS)) {
          console.warn(`🚨 Invalid URL key: ${item.urlKey}`);
          return null;
        }

        // 상태 및 URL 계산
        const isActive = isPathActive(item.urlKey, currentPath);
        const linkPath = getTabUrl(item.urlKey);

        return (
          <Link
            key={item.label}
            to={linkPath}
            aria-label={item.ariaLabel}
            data-button-name={item.dataButtonName}
            data-section-name="gnb"
            className={`flex flex-col items-center text-xxs transition-colors duration-200 active:brightness-90 ${
              isActive
                ? "text-primary"
                : "text-primary-normal03 hover:text-primary-normal02"
            }`}
          >
            <img
              src={isActive ? item.iconPaths.active : item.iconPaths.inactive}
              alt={`${item.label} 아이콘`}
              width="24"
              height="24"
              className="mb-1"
            />
            <span className="text-center leading-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
