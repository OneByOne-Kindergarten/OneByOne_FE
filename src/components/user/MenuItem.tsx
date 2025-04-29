import { Link } from "react-router-dom";
import { SVG_PATHS } from "@/constants/assets-path";

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

  return (
    <li className="flex flex-1 items-center justify-between">
      <div className="flex items-center gap-5">
        <img src={iconPath} alt={iconAlt} width="20" height="20" />
        <span>{label}</span>
      </div>
      {to ? (
        <Link to={to}>{arrowIcon}</Link>
      ) : (
        <button onClick={onClick}>{arrowIcon}</button>
      )}
    </li>
  );
}
