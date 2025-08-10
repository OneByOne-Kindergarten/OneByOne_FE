import { Link } from "react-router-dom";

import { SVG_PATHS } from "@/shared/constants/assets-path";

interface MenuItemProps {
  iconPath: string;
  iconAlt: string;
  label: string;
  to?: string;
  onClick?: () => void;
}

export default function MenuItem({
  iconPath,
  iconAlt,
  label,
  to,
  onClick,
}: MenuItemProps) {
  const arrowIcon = (
    <img
      src={SVG_PATHS.ARROW.right}
      alt="오른쪽 방향 화살표 아이콘"
      width="20"
      height="20"
    />
  );

  const content = (
    <>
      <div className="flex items-center gap-5">
        <img src={iconPath} alt={iconAlt} width="20" height="20" />
        <span>{label}</span>
      </div>
      {arrowIcon}
    </>
  );

  return (
    <li className="flex flex-1 items-center justify-between duration-200 active:brightness-75">
      {to ? (
        <Link to={to} className="flex flex-1 items-center justify-between">
          {content}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className="flex flex-1 items-center justify-between"
        >
          {content}
        </button>
      )}
    </li>
  );
}
