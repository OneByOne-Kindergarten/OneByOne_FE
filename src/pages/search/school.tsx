import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchPageLayout from "@/components/@shared/layout/search-page-layout";
import RecentSearches from "@/components/@shared/search/recent-searches";
import SchoolSearchResult from "@/components/school/school-search-result";
import { URL_PATHS } from "@/constants/url-path";
import { useSearchKindergartens } from "@/hooks/useSearchKindergartens";
import { useSearchPage } from "@/hooks/useSearchPage";
import type {
  Kindergarten,
  KindergartenSearchParams,
} from "@/types/kindergartenDTO";
import { getSchoolPath } from "@/utils/lastVisitedPathUtils";

export default function SchoolSearchPage() {
  const navigate = useNavigate();

  // 공통 검색 로직 사용
  const {
    searchQuery,
    isInitialRender,
    handleSearchSubmit,
    handleClearSearch,
    handleRecentSearchSelect,
    isSearchResult,
  } = useSearchPage<Kindergarten>("query");

  const handleBackClick = () => {
    const lastSchoolPath = getSchoolPath();

    if (lastSchoolPath) {
      navigate(lastSchoolPath);
    } else {
      navigate(URL_PATHS.SCHOOL);
    }
  };

  // 유치원 검색 파라미터 설정
  const [kindergartenSearchParams, setKindergartenSearchParams] =
    useState<KindergartenSearchParams>({
      name: searchQuery,
    });

  // 검색어 변경 시 파라미터 업데이트
  useEffect(() => {
    setKindergartenSearchParams({ name: searchQuery });
  }, [searchQuery]);

  const {
    results,
    totalItems,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchKindergartens(kindergartenSearchParams);

  const handleSchoolClick = (id: string) => {
    navigate(URL_PATHS.SCHOOL_DETAIL.replace(":id", id), {
      state: {
        fromSearch: true,
        searchQuery: searchQuery,
      },
    });
  };

  const hasSearchResults = isSearchResult(results);

  return (
    <SearchPageLayout
      title="유치원 검색"
      placeholder="유치원명으로 검색"
      searchValue={searchQuery}
      onSearchSubmit={handleSearchSubmit}
      onSearchClear={handleClearSearch}
      onBackButtonClick={handleBackClick}
    >
      <div className="flex flex-1 flex-col overflow-hidden">
        {results.length > 0 ? (
          <div
            className={hasSearchResults ? "bg-primary-foreground" : "bg-white"}
          >
            <SchoolSearchResult
              searchQuery={searchQuery}
              results={results}
              totalItems={totalItems}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
              onKindergartenClick={handleSchoolClick}
            />
          </div>
        ) : (
          searchQuery && (
            <div className="flex-1 bg-white">
              <p className="py-8 text-center text-sm text-primary-normal03">
                검색 결과가 없습니다.
              </p>
            </div>
          )
        )}

        {!isInitialRender && !hasSearchResults && (
          <div className="flex-1 bg-white">
            <RecentSearches onSelectQuery={handleRecentSearchSelect} />
          </div>
        )}
      </div>
    </SearchPageLayout>
  );
}
