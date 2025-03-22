import { Link } from "react-router-dom";

interface CategoryOption {
  href: string;
  label: string;
}

interface CategoryNavProps {
  id?: string;
  options: CategoryOption[];
  currentPath: string;
  className?: string;
}

// 카테고리 옵션
function CategoryOption({
  id,
  href,
  label,
  currentPath,
}: CategoryOption & { id?: string; currentPath: string }) {
  const resolvedHref = id ? href.replace("id", id) : href;

  const isActive = currentPath === resolvedHref;
  const activeStyle = "text-primary";
  const inactiveStyle = "text-primary-normal03";

  // 환경에 따라 Link 또는 a 태그 사용
  const isClientSide = typeof window !== "undefined";

  if (isClientSide) {
    return (
      <Link
        to={resolvedHref}
        className={isActive ? activeStyle : inactiveStyle}
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
export default function CategoryNav({
  id,
  options,
  currentPath,
  className = "flex gap-5 px-5 py-3 font-semibold text-lg",
}: CategoryNavProps) {
  return (
    <nav className={className}>
      {options.map((item, index) => (
        <CategoryOption
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
