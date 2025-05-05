import { useState, useEffect, useRef, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Link } from "react-router-dom";

import Header from "@/components/@shared/headers/base-header";
import SearchInput from "@/components/@shared/form/search-input";
import CommunitySearchAside from "@/components/community/community-search-aside";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import Error from "@/components/@shared/layout/error";

import { SVG_PATHS } from "@/constants/assets-path";

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
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // 검색 모드 활성화 시 포커스
  useEffect(() => {
    if (isSearching && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearching]);

  // 검색 모드 활성화
  const handleSearch = () => {
    setIsSearching(true);
  };

  const handleSearchQuerySelect = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
  };

  const handleCloseSearchResult = () => {
    setIsSearching(false);
    setSearchQuery("");
  };

  const handleClearSearch = () => {
    setSearchQuery("");
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
              placeholder="게시물 제목으로 검색해보세요"
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
              onReset={() => {}}
              fallback={
                <Error type="element">
                  오류가 발생했습니다. 다시 시도해주세요.
                </Error>
              }
            >
              <Suspense fallback={<LoadingSpinner type="page" />}>
                <CommunitySearchAside
                  isOpen={isSearching}
                  onClose={handleCloseSearchResult}
                  searchQuery={searchQuery}
                  onSearchQuerySelect={handleSearchQuerySelect}
                  category={category}
                />
              </Suspense>
            </ErrorBoundary>
          </div>
        </aside>
      ) : (
        <Header
          title={title}
          headerLogo={headerLogo}
          hasBackButton={hasBackButton}
          onBackButtonClick={onBackButtonClick}
          hasBorder={hasBorder}
        >
          <div className="flex items-center gap-4">
            <button onClick={handleSearch} aria-label="검색">
              <img src={SVG_PATHS.SEARCH} alt="검색" width={24} height={24} />
            </button>
            {hasWriteButton && (
              <Link
                to="/community/write"
                className="flex items-center justify-center rounded-full w-6 h-6 bg-primary-normal01"
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
      )}
    </>
  );
}
