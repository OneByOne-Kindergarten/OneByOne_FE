import { Link } from "react-router-dom";

interface Option {
  href: string;
  label: string;
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

  if (isClientSide) {
    return (
      <Link
        to={resolvedHref}
        className={isActive ? activeStyle : inactiveStyle}
        onClick={(e) => {
          console.log("Navigating to:", resolvedHref);
        }}
      >
        {isActive ? (
          <span className="pb-1 border-b-2 border-primary">{label}</span>
        ) : (
          label
        )}
      </Link>
    );
  }

  return (
    <a href={resolvedHref} className={isActive ? activeStyle : inactiveStyle}>
      {isActive ? (
        <span className="pb-1 border-b-2 border-primary">{label}</span>
      ) : (
        label
      )}
    </a>
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
          currentPath={currentPath}
        />
      ))}
    </nav>
  );
}
