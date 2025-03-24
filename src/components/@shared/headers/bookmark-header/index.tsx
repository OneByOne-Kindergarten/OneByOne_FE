import { SVG_PATHS } from "@/constants/assets-path";
import Header from "@/components/@shared/headers/base-header";

interface BookmarkHeaderProps {
  title?: string;
  hasBorder?: boolean;
  hasBackButton?: boolean;
  onBackButtonClick?: () => void;
}

export default function BookmarkHeader({
  title,
  hasBorder,
  hasBackButton,
  onBackButtonClick,
}: BookmarkHeaderProps) {
  const handleBookmark = () => {
    // TODO: 북마크 기능
  };

  return (
    <Header
      title={title}
      hasBorder={hasBorder}
      hasBackButton={hasBackButton}
      onBackButtonClick={onBackButtonClick}
    >
      <button onClick={handleBookmark} aria-label="북마크">
        <img src={SVG_PATHS.BOOKMARKER} alt="북마크" className="w-6 h-6" />
      </button>
    </Header>
  );
}
