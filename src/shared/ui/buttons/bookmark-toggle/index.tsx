import { useCallback, useEffect, useState } from "react";

import {
  checkFavoriteStatus,
  toggleFavorite as toggleFavoriteService,
} from "@/entities/favorites/api";
import { useGetFavorites } from "@/entities/favorites/hooks/useGetFavorites";
import { SVG_PATHS } from "@/shared/constants/assets-path";
import { isValidId, safeParseId } from "@/shared/utils/idValidation";

interface BookmarkToggleProps {
  kindergartenId?: string;
  className?: string;
  iconSize?: number;
}

export default function BookmarkToggle({
  kindergartenId,
  className = "",
  iconSize = 24,
}: BookmarkToggleProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const { refetch } = useGetFavorites({ enabled: !!kindergartenId });

  // 즐겨찾기 상태 확인
  useEffect(() => {
    if (kindergartenId && isValidId(kindergartenId)) {
      fetchFavoriteStatus();
    }
  }, [kindergartenId]);

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
  const handleToggle = useCallback(async () => {
    if (!kindergartenId || loading || !isValidId(kindergartenId)) return;

    const numericId = safeParseId(kindergartenId);
    if (!numericId) return;

    try {
      setLoading(true);
      const result = await toggleFavoriteService(numericId);

      if (result.success) {
        setIsFavorite(result.data.favorite);
        refetch();
      }
    } catch (error) {
      console.error("즐겨찾기 토글 실패:", error);
    } finally {
      setLoading(false);
    }
  }, [kindergartenId, loading, refetch]);

  if (!kindergartenId || !isValidId(kindergartenId)) {
    return null;
  }

  return (
    <button
      onClick={handleToggle}
      aria-label={isFavorite ? "즐겨찾기 취소" : "즐겨찾기 추가"}
      disabled={loading}
      className={`${loading ? "opacity-50" : ""} ${className}`}
    >
      <img
        src={
          isFavorite
            ? SVG_PATHS.BOOKMARKER.ACTIVE
            : SVG_PATHS.BOOKMARKER.INACTIVE
        }
        alt="북마크"
        width={iconSize}
        height={iconSize}
        className="duration-200 hover:opacity-80 active:opacity-60"
      />
    </button>
  );
}
