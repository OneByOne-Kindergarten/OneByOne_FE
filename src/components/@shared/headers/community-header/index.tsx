import { Link, useNavigate } from "react-router-dom";

import Header from "@/components/@shared/headers/base-header";
import { SVG_PATHS } from "@/constants/assets-path";
import { URL_PATHS } from "@/constants/url-path";

interface CommunityHeaderProps {
  title?: string;
  headerLogo?: boolean;
  hasBackButton?: boolean;
  onBackButtonClick?: () => void;
  hasWriteButton?: boolean;
  category?: "TEACHER" | "PROSPECTIVE_TEACHER";
  hasBorder?: boolean;
}

export default function CommunityHeader({
  title,
  headerLogo,
  hasBackButton = false,
  onBackButtonClick,
  hasWriteButton = false,
  category = "TEACHER",
  hasBorder = true,
}: CommunityHeaderProps) {
  const navigate = useNavigate();

  const handleSearch = () => {
    const searchPath = `${URL_PATHS.SEARCH_COMMUNITY}?category=${category}`;
    navigate(searchPath);
  };

  return (
    <Header
      title={title}
      headerLogo={headerLogo}
      hasBackButton={hasBackButton}
      onBackButtonClick={onBackButtonClick}
      hasBorder={hasBorder}
    >
      <div className="flex items-center gap-4">
        <button onClick={handleSearch} aria-label="검색">
          <img
            src={SVG_PATHS.SEARCH}
            alt="검색"
            width={24}
            height={24}
            className="duration-200 hover:opacity-80 active:opacity-70"
          />
        </button>
        {hasWriteButton && (
          <Link
            to="/community/write"
            className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-normal01"
            aria-label="글쓰기"
          >
            <img
              src={SVG_PATHS.POST.create}
              alt="연필 아이콘"
              height={12}
              width={12}
            />
          </Link>
        )}
      </div>
    </Header>
  );
}
