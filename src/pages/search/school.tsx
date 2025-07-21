import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchPageLayout from "@/components/@shared/layout/search-page-layout";
import RecentSearches from "@/components/@shared/search/recent-searches";
import SchoolSearchResult from "@/components/school/SchoolSearchResult";
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

  const handleBackClick = () => {
    const lastSchoolPath = getSchoolPath();

    // 저장된 경로가 검색 페이지이거나 없으면 기본 학교 페이지로 이동
    if (!lastSchoolPath || lastSchoolPath.includes("/search/")) {
      navigate(URL_PATHS.SCHOOL);
    } else {
      navigate(lastSchoolPath);
    }
  };

  const handleSchoolClick = (id: string) => {
    navigate(URL_PATHS.SCHOOL_DETAIL.replace(":id", id), {
      replace: true,
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
      placeholder="유치원 이름으로 검색해보세요"
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
