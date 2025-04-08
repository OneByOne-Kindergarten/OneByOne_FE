import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { KindergartenSearchParams } from "@/types/kindergarten";
import RecentSearches, {
  addToRecentSearches,
} from "@/components/school/recent-searches";
import SchoolSearchResult from "@/components/school/school-search-result";
import { useSearchKindergartens } from "@/hooks/useSearchKindergartens";

interface SchoolSearchAsideProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchQuerySelect: (query: string) => void;
}

export default function SchoolSearchAside({
  isOpen,
  onClose,
  searchQuery,
  onSearchQuerySelect,
}: SchoolSearchAsideProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState<KindergartenSearchParams>({
    name: searchQuery,
  });

  if (!isOpen) return null;

  // 검색어가 변경될 때마다 검색 파라미터 업데이트
  useEffect(() => {
    setSearchParams({ name: searchQuery });

    if (searchQuery && searchQuery.trim() !== "") {
      addToRecentSearches(searchQuery);
    }
  }, [searchQuery]);

  const {
    results,
    totalItems,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useSearchKindergartens(searchParams);

  const handleKindergartenClick = (id: string) => {
    navigate(`/school/${id}`);
    onClose();
  };

  const showRecentSearches =
    !searchQuery || (searchQuery && results.length === 0 && !isLoading);
  const showSearchResults = !!searchQuery;

  return (
    <aside
      className={`absolute inset-0 top-14 z-40 ${
        showSearchResults ? "bg-primary-foreground" : "bg-white"
      }`}
    >
      {showSearchResults && (
        <SchoolSearchResult
          searchQuery={searchQuery}
          results={results}
          totalItems={totalItems}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          error={error}
          onKindergartenClick={handleKindergartenClick}
        />
      )}
      {showRecentSearches && (
        <RecentSearches onSelectQuery={onSearchQuerySelect} />
      )}
    </aside>
  );
}
