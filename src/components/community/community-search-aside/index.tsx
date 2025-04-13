import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import RecentSearches, {
  addToRecentSearches,
} from "@/components/@shared/search/recent-searches";
import CommunitySearchResult from "@/components/community/community-search-result";
import { useSearch } from "@/hooks/useSearch";
import { CommunityPostItem } from "@/types/communityDTO";

interface CommunitySearchAsideProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchQuerySelect: (query: string) => void;
  category?: "TEACHER" | "PROSPECTIVE_TEACHER";
}

export default function CommunitySearchAside({
  isOpen,
  onClose,
  searchQuery,
  onSearchQuerySelect,
  category = "TEACHER",
}: CommunitySearchAsideProps) {
  const navigate = useNavigate();
  const [isInitialRender, setIsInitialRender] = useState(true);

  if (!isOpen) return null;

  const search = useSearch<CommunityPostItem>({
    type: "community",
    initialQuery: searchQuery,
  });

  const fetchResults = (query: string, categoryParam?: string) => {
    return search.fetchResults(query, categoryParam || category);
  };

  const {
    results,
    totalItems,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = fetchResults(searchQuery, category);

  // 초기 렌더링 이후 상태 업데이트
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    }
  }, []);

  // 최근 검색어 추가
  useEffect(() => {
    if (searchQuery && searchQuery.trim() !== "") {
      addToRecentSearches(searchQuery);
    }
  }, [searchQuery]);

  const handlePostClick = (id: string) => {
    navigate(`/community/${id}`);
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
        <CommunitySearchResult
          searchQuery={searchQuery}
          results={results}
          totalItems={totalItems}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          error={error}
          onPostClick={handlePostClick}
        />
      ) : (
        <p className="text-sm text-center text-primary-normal03 py-8">
          검색 결과가 없습니다.
        </p>
      )}

      {!isInitialRender && !isSearchResult && (
        <RecentSearches onSelectQuery={onSearchQuerySelect} />
      )}
    </div>
  );
}
