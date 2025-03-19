import { Link } from "react-router-dom";

interface CategoryItem {
  href: string;
  label: string;
}

interface CategoryNavProps {
  id?: string;
  items: CategoryItem[];
  currentPath: string;
  className?: string;
}

// 개별 카테고리
function CategoryItem({
  id,
  href,
  label,
  currentPath,
}: CategoryItem & { id?: string; currentPath: string }) {
  const resolvedHref = id ? href.replace("id", id) : href;

  // 현재 경로와 비교하여 활성 상태 결정
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
  items,
  currentPath,
  className = "flex gap-5 px-5 py-3 font-semibold text-lg",
}: CategoryNavProps) {
  return (
    <nav className={className}>
      {items.map((item, index) => (
        <CategoryItem
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
