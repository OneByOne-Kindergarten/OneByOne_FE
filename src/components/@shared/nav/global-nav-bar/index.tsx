import { URL } from "@/constants/url";
import { SVG_PATHS } from "@/constants/assets-path";

interface GlobalNavBarProps {
  currentPath: string;
}

type UrlKeys = keyof typeof URL;

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
  return (
    <nav className="fixed bottom-0 h-14 items-center w-full text-xs min-w-80 max-w-3xl bg-white flex py-3 px-8 mx-auto justify-between border-t border-opacity-5 font-bold">
      {NAV_BAR_ITEMS.map(
        ({ label, urlKey, ariaLabel, dataButtonName, iconPaths }) => {
          const isActive = currentPath === URL[urlKey];
          return (
            <a
              key={label}
              aria-label={ariaLabel}
              data-button-name={dataButtonName}
              data-section-name="gnb"
              href={URL[urlKey]}
              className={`flex flex-col text-xxs items-center ${isActive ? "text-primary" : "text-primary-normal03"}`}
            >
              <img
                src={isActive ? iconPaths.active : iconPaths.inactive}
                alt={`${label} 아이콘`}
                width="24"
                height="24"
              />
              <span>{label}</span>
            </a>
          );
        }
      )}
    </nav>
  );
}
