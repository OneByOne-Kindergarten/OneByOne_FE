import { Link } from "react-router-dom";

// iconPath를 문자열 대신 객체로 받도록 변경
interface Option {
  href: string;
  label: string;
  icon?: {
    path: string;
    alt?: string;
    width?: string | number;
    height?: string | number;
  };
}

interface NavBarProps {
  id?: string;
  options: Option[];
  currentPath: string;
  className?: string;
}

function Option({
  id,
  href,
  label,
  icon,
  currentPath,
}: Option & { id?: string; currentPath: string }) {
  const resolvedHref = id ? href.replace(":id", id) : href;

  // 쿼리 파라미터가 있는 경우
  const isActive = (() => {
    const [path, params] = currentPath.split("?");
    const [targetPath, targetParams] = resolvedHref.split("?");

    if (!currentPath.startsWith(targetPath) && !targetPath.startsWith(path)) {
      return false;
    }

    if (params && targetParams) {
      return currentPath === resolvedHref;
    }

    return path === targetPath;
  })();

  const activeStyle = "text-primary";
  const inactiveStyle = "text-primary-normal03";

  const isClientSide = typeof window !== "undefined";

  const renderContent = () => (
    <div className="flex items-center gap-1.5">
      {icon && (
        <img
          src={icon.path}
          alt={icon.alt || label}
          width={icon.width || "20"}
          height={icon.height || "18"}
        />
      )}
      <span className={isActive ? "font-bold" : ""}>{label}</span>
    </div>
  );

  if (isClientSide) {
    return (
      <Link
        to={resolvedHref}
        className={isActive ? activeStyle : inactiveStyle}
      >
        {isActive ? (
          <div className="pb-1 border-b-2 border-primary">
            {renderContent()}
          </div>
        ) : (
          renderContent()
        )}
      </Link>
    );
  }

  return (
    <Link to={resolvedHref} className={isActive ? activeStyle : inactiveStyle}>
      {isActive ? (
        <div className="pb-1 border-b-2 border-primary">{renderContent()}</div>
      ) : (
        renderContent()
      )}
    </Link>
  );
}

// 메인 카테고리 네비게이션
export default function NavBar({
  id,
  options,
  currentPath,
  className = "flex bg-white gap-5 px-5 py-3 font-semibold text-lg",
}: NavBarProps) {
  return (
    <nav className={className}>
      {options.map((item, index) => (
        <Option
          key={index}
          id={id}
          href={item.href}
          label={item.label}
          icon={item.icon}
          currentPath={currentPath}
        />
      ))}
    </nav>
  );
}
