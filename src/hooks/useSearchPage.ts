import { useRecentSearches } from "@/hooks/useRecentSearches";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface UseSearchPageReturn<T = unknown> {
  searchQuery: string;
  isInitialRender: boolean;
  handleBackClick: () => void;
  handleSearchSubmit: (query: string) => void;
  handleClearSearch: () => void;
  handleRecentSearchSelect: (query: string) => void;
  isSearchResult: (results: T[]) => boolean;
}

/**
 * 검색 페이지 공통 로직을 제공하는 훅
 *
 * @returns 검색 페이지에서 필요한 상태와 핸들러들
 */
export function useSearchPage<T = unknown>(
  paramName: string = "query"
): UseSearchPageReturn<T> {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addRecentSearch } = useRecentSearches();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get(paramName) || ""
  );
  const [isInitialRender, setIsInitialRender] = useState(true);

  // URL 파라미터 변경 시 검색어 상태 업데이트
  useEffect(() => {
    const queryFromUrl = searchParams.get(paramName) || "";
    setSearchQuery(queryFromUrl);
  }, [searchParams, paramName]);

  // 초기 렌더링 후 상태 업데이트
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    }
  }, [isInitialRender]);

  const handleBackClick = () => {
    navigate(-1);
  };

  // 검색 제출 핸들러 - 여기서만 최근 검색어에 추가
  const handleSearchSubmit = (query: string) => {
    if (!query.trim()) return;

    // URL 파라미터 업데이트 (history 교체)
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set(paramName, query);
        return newParams;
      },
      { replace: true }
    );

    // 최근 검색어에 추가
    addRecentSearch(query);
  };

  const handleClearSearch = () => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.delete(paramName);
        return newParams;
      },
      { replace: true }
    );
  };

  const handleRecentSearchSelect = (query: string) => {
    handleSearchSubmit(query);
  };

  const isSearchResult = (results: T[]) => {
    return !!(searchQuery && results.length > 0);
  };

  return {
    searchQuery,
    isInitialRender,
    handleBackClick,
    handleSearchSubmit,
    handleClearSearch,
    handleRecentSearchSelect,
    isSearchResult,
  };
}
