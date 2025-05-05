import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import Error from "@/components/@shared/layout/error";
import Header from "@/components/@shared/headers/base-header";
import SearchInput from "@/components/@shared/form/search-input";
import SchoolSearchAside from "@/components/school/school-search-aside";

import { SVG_PATHS } from "@/constants/assets-path";
import {
  checkFavoriteStatus,
  toggleFavorite as toggleFavoriteService,
} from "@/services/favoriteService";
import { useFavorites } from "@/hooks/useFavorites";

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
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { refetch } = useFavorites();

  // 검색 모드 활성화
  useEffect(() => {
    if (isSearching && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearching]);

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
    setIsSearching(true);
  };

  // 최근 검색어 선택 처리
  const handleSearchQuerySelect = (query: string) => {
    setSearchQuery(query);
  };

  // 검색 폼 제출 처리
  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
  };

  // 검색 결과 닫기
  const handleCloseSearchResult = () => {
    setIsSearching(false);
    setSearchQuery("");
  };

  // 검색어 초기화 처리
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleMap = () => {
    // TODO: 맵 기능
  };

  return (
    <>
      {/* 검색 패널 */}
      {isSearching ? (
        <aside className="fixed inset-0 z-50 flex bg-white flex-col w-full min-w-80 max-w-3xl mx-auto h-full">
          <Header
            hasBackButton={true}
            hasBorder={false}
            onBackButtonClick={handleCloseSearchResult}
          >
            <SearchInput
              placeholder="유치원 이름으로 검색해보세요"
              initialValue={searchQuery}
              onSubmit={handleSearchSubmit}
              onClear={handleClearSearch}
              autoFocus={true}
              ref={inputRef}
            />
          </Header>

          {/* 검색 결과 */}
          <div className="flex-1 flex flex-col h-[calc(100vh-56px)]">
            <ErrorBoundary
              fallback={<Error type="page">잠시 후 다시 시도해주세요.</Error>}
            >
              <Suspense fallback={<LoadingSpinner type="page" />}>
                <SchoolSearchAside
                  onClose={handleCloseSearchResult}
                  searchQuery={searchQuery}
                  onSearchQuerySelect={handleSearchQuerySelect}
                />
              </Suspense>
            </ErrorBoundary>
          </div>
        </aside>
      ) : (
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
            <button onClick={handleMap} aria-label="지도">
              <img src={SVG_PATHS.MAP} alt="지도" width={24} height={24} />
            </button>
            <button onClick={handleSearch} aria-label="검색">
              <img src={SVG_PATHS.SEARCH} alt="검색" width={24} height={24} />
            </button>
          </div>
        </Header>
      )}
    </>
  );
}
