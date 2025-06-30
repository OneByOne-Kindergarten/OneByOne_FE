import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import RecentSearches, {
  addToRecentSearches,
} from "@/components/@shared/search/recent-searches";
import SchoolSearchResult from "@/components/school/school-search-result";
import { useSearchKindergartens } from "@/hooks/useSearchKindergartens";
import type { KindergartenSearchParams } from "@/types/kindergartenDTO";

interface SchoolSearchAsideProps {
  onClose: () => void;
  searchQuery: string;
  onSearchQuerySelect: (query: string) => void;
}

export default function SchoolSearchAside({
  onClose,
  searchQuery,
  onSearchQuerySelect,
}: SchoolSearchAsideProps) {
  const navigate = useNavigate();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [searchParams, setSearchParams] = useState<KindergartenSearchParams>({
    name: searchQuery,
  });

  // 검색어가 변경될 때마다 검색 파라미터 업데이트
  useEffect(() => {
    setSearchParams({ name: searchQuery });

    if (searchQuery && searchQuery.trim() !== "") {
      addToRecentSearches(searchQuery);
    }
  }, [searchQuery]);

  // 초기 렌더링 이후 상태 업데이트
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    }
  }, []);

  const {
    results,
    totalItems,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchKindergartens(searchParams);

  const handleKindergartenClick = (id: string) => {
    navigate(`/school/${id}`);
    onClose();
  };

  const isSearchResult = searchQuery && results.length > 0;

  return (
    <div
      className={`absolute inset-0 top-14 z-40 ${
        isSearchResult ? "bg-primary-foreground" : "bg-white"
      }`}
    >
      {results.length > 0 ? (
        <SchoolSearchResult
          searchQuery={searchQuery}
          results={results}
          totalItems={totalItems}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          onKindergartenClick={handleKindergartenClick}
        />
      ) : (
        searchQuery && (
          <p className="py-8 text-center text-sm text-primary-normal03">
            검색 결과가 없습니다.
          </p>
        )
      )}

      {!isInitialRender && !isSearchResult && (
        <RecentSearches onSelectQuery={onSearchQuerySelect} />
      )}
    </div>
  );
}
