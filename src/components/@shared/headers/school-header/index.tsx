import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "@/components/@shared/headers/base-header";
import { SVG_PATHS } from "@/constants/assets-path";
import { URL_PATHS } from "@/constants/url-path";
import { useFavorites } from "@/hooks/useFavorites";
import {
  checkFavoriteStatus,
  toggleFavorite as toggleFavoriteService,
} from "@/services/favoriteService";

interface SchoolHeaderProps {
  title?: string;
  headerLogo?: boolean;
  hasBorder?: boolean;
  hasBackButton?: boolean;
  onBackButtonClick?: () => void;
  kindergartenId?: string;
  showBookmark?: boolean;
}

export default function SchoolHeader({
  title,
  headerLogo,
  hasBorder,
  hasBackButton,
  onBackButtonClick,
  kindergartenId,
  showBookmark = false,
}: SchoolHeaderProps) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const { refetch } = useFavorites();

  // 즐겨찾기 상태 확인
  useEffect(() => {
    if (showBookmark && kindergartenId) {
      fetchFavoriteStatus();
    }
  }, [showBookmark, kindergartenId]);

  const fetchFavoriteStatus = async () => {
    if (!kindergartenId) return;

    try {
      const response = await checkFavoriteStatus(Number(kindergartenId));
      setIsFavorite(response.data);
    } catch (error) {
      console.error("즐겨찾기 상태 확인 실패:", error);
    }
  };

  // 즐겨찾기 토글
  const handleToggleFavorite = useCallback(async () => {
    if (!kindergartenId || favoriteLoading) return;

    try {
      setFavoriteLoading(true);
      const result = await toggleFavoriteService(Number(kindergartenId));

      if (result.success) {
        setIsFavorite(result.data.favorite);
        refetch();
      }
    } catch (error) {
      console.error("즐겨찾기 토글 실패:", error);
    } finally {
      setFavoriteLoading(false);
    }
  }, [kindergartenId, favoriteLoading, refetch]);

  const handleSearch = () => {
    navigate(URL_PATHS.SEARCH_SCHOOL);
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
        {showBookmark && (
          <button
            onClick={handleToggleFavorite}
            aria-label={isFavorite ? "즐겨찾기 취소" : "즐겨찾기 추가"}
            disabled={favoriteLoading}
            className={favoriteLoading ? "opacity-50" : ""}
          >
            <img
              src={
                isFavorite
                  ? SVG_PATHS.BOOKMARKER.active
                  : SVG_PATHS.BOOKMARKER.inactive
              }
              alt="북마크"
              width={24}
              height={24}
            />
          </button>
        )}
        {/* <button onClick={handleMap} aria-label="지도">
          <img src={SVG_PATHS.MAP} alt="지도" width={24} height={24} />
        </button> */}
        <button onClick={handleSearch} aria-label="검색">
          <img src={SVG_PATHS.SEARCH} alt="검색" width={24} height={24} />
        </button>
      </div>
    </Header>
  );
}
