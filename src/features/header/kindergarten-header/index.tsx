import { useNavigate } from "react-router-dom";

import { SVG_PATHS } from "@/shared/constants/assets-path";
import { URL_PATHS } from "@/shared/constants/url-path";
import BookmarkToggle from "@/shared/ui/buttons/bookmark-toggle";
import ShareButton from "@/shared/ui/buttons/share-button";
import { isValidId } from "@/shared/utils/idValidation";
import { ShareType } from "@/shared/utils/webViewCommunication";

import Header from "../base-header";

interface KindergartenHeaderProps {
  title?: string;
  headerLogo?: boolean;
  hasBorder?: boolean;
  hasBackButton?: boolean;
  onBackButtonClick?: () => void;
  kindergartenId?: string;
  showBookmark?: boolean;
  showShare?: boolean;
}

export default function KindergartenHeader({
  title,
  headerLogo,
  hasBorder,
  hasBackButton,
  onBackButtonClick,
  kindergartenId,
  showBookmark = false,
  showShare = false,
}: KindergartenHeaderProps) {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(URL_PATHS.SEARCH_KINDERGARTEN);
  };

  return (
    <Header
      title={title}
      headerLogo={headerLogo}
      hasBorder={hasBorder}
      hasBackButton={hasBackButton}
      onBackButtonClick={onBackButtonClick}
    >
      <div className="flex items-center gap-4">
        {showShare && kindergartenId && isValidId(kindergartenId) && (
          <ShareButton
            variant="icon-only"
            iconSize={28}
            shareData={{
              title: title || "유치원 정보",
              id: kindergartenId,
              isWork: true,
              shareType: ShareType.KINDERGARTEN,
            }}
          />
        )}
        {showBookmark && <BookmarkToggle kindergartenId={kindergartenId} />}

        <button onClick={handleSearch} aria-label="검색">
          <img
            src={SVG_PATHS.SEARCH}
            alt="검색"
            width={24}
            height={24}
            className="duration-200 hover:opacity-80 active:opacity-60"
          />
        </button>
      </div>
    </Header>
  );
}
