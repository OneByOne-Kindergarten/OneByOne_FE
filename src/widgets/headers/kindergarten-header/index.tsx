import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SVG_PATHS } from "@/common/constants/assets-path";
import { URL_PATHS } from "@/common/constants/url-path";
import { isValidId, safeParseId } from "@/common/utils/idValidation";
import {
  checkFavoriteStatus,
  toggleFavorite as toggleFavoriteService,
} from "@/entities/favorites/api";
import { useGetFavorites } from "@/entities/favorites/hooks/useGetFavorites";

import Header from "../base-header";

interface KindergartenHeaderProps {
  title?: string;
  headerLogo?: boolean;
  hasBorder?: boolean;
  hasBackButton?: boolean;
  onBackButtonClick?: () => void;
  kindergartenId?: string;
  showBookmark?: boolean;
}

export default function KindergartenHeader({
  title,
  headerLogo,
  hasBorder,
  hasBackButton,
  onBackButtonClick,
  kindergartenId,
  showBookmark = false,
}: KindergartenHeaderProps) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const { refetch } = useGetFavorites({ enabled: showBookmark });

  // 즐겨찾기 상태 확인
  useEffect(() => {
    if (showBookmark && kindergartenId && isValidId(kindergartenId)) {
      fetchFavoriteStatus();
    }
  }, [showBookmark, kindergartenId]);

  const fetchFavoriteStatus = async () => {
    if (!kindergartenId || !isValidId(kindergartenId)) return;

    const numericId = safeParseId(kindergartenId);
    if (!numericId) return;

    try {
      const response = await checkFavoriteStatus(numericId);
      setIsFavorite(response.data);
    } catch (error) {
      console.error("즐겨찾기 상태 확인 실패:", error);
    }
  };

  // 즐겨찾기 토글
  const handleToggleFavorite = useCallback(async () => {
    if (!kindergartenId || favoriteLoading || !isValidId(kindergartenId))
      return;

    const numericId = safeParseId(kindergartenId);
    if (!numericId) return;

    try {
      setFavoriteLoading(true);
      const result = await toggleFavoriteService(numericId);

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
              className="duration-200 hover:opacity-80 active:opacity-70"
            />
          </button>
        )}
        <button onClick={handleSearch} aria-label="검색">
          <img
            src={SVG_PATHS.SEARCH}
            alt="검색"
            width={24}
            height={24}
            className="duration-200 hover:opacity-80 active:opacity-70"
          />
        </button>
      </div>
    </Header>
  );
}
