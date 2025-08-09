import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { URL_PATHS } from "@/common/constants/url-path";
import SearchPageLayout from "@/common/ui/layout/search-page-layout";
import RecentSearches from "@/common/ui/search/recent-searches";
import {
  Kindergarten,
  KindergartenSearchParams,
} from "@/entities/kindergarten/DTO";
import { useSearchKindergartens } from "@/entities/kindergarten/hooks";
import SchoolSearchResult from "@/features/kindergarten/SchoolSearchResult";
import { useSearchPage } from "@/features/search/useSearchPage";

export default function KindergartenSearchPage() {
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();

  const {
    searchQuery,
    isInitialRender,
    handleSearchSubmit,
    handleClearSearch,
    handleRecentSearchSelect,
    isSearchResult,
  } = useSearchPage<Kindergarten>("query");

  // TODO: 서버에서 sort 지원 시 주석 해제
  // const sortOption = (searchParams.get("sort") as KindergartenSortOption) || "RATING";

  // 유치원 검색 파라미터 설정
  const [kindergartenSearchParams, setKindergartenSearchParams] =
    useState<KindergartenSearchParams>({
      name: searchQuery,
      // TODO: 서버에서 sort 지원 시 주석 해제
      // sort: [sortOption],
    });

  // 검색어 또는 정렬 옵션 변경 시 파라미터 업데이트
  useEffect(() => {
    setKindergartenSearchParams({
      name: searchQuery,
      // TODO: 서버에서 sort 지원 시 주석 해제
      // sort: [sortOption],
    });
  }, [searchQuery]); // TODO: 서버에서 sort 지원 시 sortOption 의존성 추가

  const {
    results,
    totalItems,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchKindergartens(kindergartenSearchParams);

  // 검색 페이지에서 접근한 경우 이동 처리
  const handleSchoolClick = (id: string) => {
    navigate(URL_PATHS.KINDERGARTEN_DETAIL.replace(":id", id), {
      state: { fromSearch: true },
    });
  };

  const hasSearchResults = isSearchResult(results);

  return (
    <SearchPageLayout
      title="유치원 검색"
      placeholder="유치원 이름으로 검색해보세요"
      searchValue={searchQuery}
      onSearchSubmit={handleSearchSubmit}
      onSearchClear={handleClearSearch}
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
