import { useCallback, useEffect, useState } from "react";

// 최근 검색어 관리 상수
const RECENT_SEARCHES_KEY = "recentSearches";
const MAX_RECENT_SEARCHES = 8;
const RECENT_SEARCHES_EVENT = "recentSearchesUpdate";

interface UseRecentSearchesReturn {
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  removeRecentSearch: (query: string) => void;
  clearAllRecentSearches: () => void;
}

/**
 * 최근 검색어 관리 훅
 * 로컬스토리지와 동기화되며 실시간 업데이트 지원
 */
export function useRecentSearches(): UseRecentSearchesReturn {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // 로컬스토리지에서 최근 검색어 로드
  const loadRecentSearches = useCallback(() => {
    try {
      const savedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (savedSearches) {
        const parsed = JSON.parse(savedSearches);
        setRecentSearches(parsed);
        return parsed;
      }
      return [];
    } catch (error) {
      console.error("최근 검색어 불러오기 실패:", error);
      return [];
    }
  }, []);

  // 컴포넌트 마운트 시 로컬스토리지에서 로드
  useEffect(() => {
    loadRecentSearches();
  }, [loadRecentSearches]);

  // 로컬스토리지 변경 이벤트 감지 (다른 탭/창에서의 변경)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === RECENT_SEARCHES_KEY) {
        loadRecentSearches();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loadRecentSearches]);

  // 같은 탭 내 다른 컴포넌트에서 업데이트 감지
  useEffect(() => {
    const handleRecentSearchesUpdate = () => {
      loadRecentSearches();
    };

    window.addEventListener(RECENT_SEARCHES_EVENT, handleRecentSearchesUpdate);
    return () => {
      window.removeEventListener(
        RECENT_SEARCHES_EVENT,
        handleRecentSearchesUpdate
      );
    };
  }, [loadRecentSearches]);

  // 최근 검색어 추가
  const addRecentSearch = useCallback((query: string) => {
    if (!query || query.trim() === "") return;

    try {
      const currentSearches = JSON.parse(
        localStorage.getItem(RECENT_SEARCHES_KEY) || "[]"
      );
      const updatedSearches = [
        query,
        ...currentSearches.filter((item: string) => item !== query),
      ].slice(0, MAX_RECENT_SEARCHES);

      localStorage.setItem(
        RECENT_SEARCHES_KEY,
        JSON.stringify(updatedSearches)
      );
      setRecentSearches(updatedSearches);

      // 같은 탭 내 다른 컴포넌트에 업데이트 알림
      window.dispatchEvent(new CustomEvent(RECENT_SEARCHES_EVENT));
    } catch (error) {
      console.error("최근 검색어 저장 실패:", error);
    }
  }, []);

  // 최근 검색어 개별 삭제
  const removeRecentSearch = useCallback((query: string) => {
    try {
      const currentSearches = JSON.parse(
        localStorage.getItem(RECENT_SEARCHES_KEY) || "[]"
      );
      const updatedSearches = currentSearches.filter(
        (item: string) => item !== query
      );

      localStorage.setItem(
        RECENT_SEARCHES_KEY,
        JSON.stringify(updatedSearches)
      );
      setRecentSearches(updatedSearches);

      // 같은 탭 내 다른 컴포넌트에 업데이트 알림
      window.dispatchEvent(new CustomEvent(RECENT_SEARCHES_EVENT));
    } catch (error) {
      console.error("최근 검색어 삭제 실패:", error);
    }
  }, []);

  // 최근 검색어 전체 삭제
  const clearAllRecentSearches = useCallback(() => {
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
      setRecentSearches([]);

      // 같은 탭 내 다른 컴포넌트에 업데이트 알림
      window.dispatchEvent(new CustomEvent(RECENT_SEARCHES_EVENT));
    } catch (error) {
      console.error("최근 검색어 전체 삭제 실패:", error);
    }
  }, []);

  return {
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearAllRecentSearches,
  };
}
