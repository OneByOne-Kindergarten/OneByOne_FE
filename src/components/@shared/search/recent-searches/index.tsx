import { useState, useEffect } from "react";
import { SVG_PATHS } from "@/constants/assets-path";

// 최근 검색어 관리 상수
const RECENT_SEARCHES_KEY = "recentSearches";
const MAX_RECENT_SEARCHES = 8;

interface RecentSearchesProps {
  onSelectQuery: (query: string) => void;
}

export default function RecentSearches({ onSelectQuery }: RecentSearchesProps) {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = () => {
    try {
      const savedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches));
      }
    } catch (error) {
      console.error("최근 검색어 불러오기 실패:", error);
    }
  };

  // 최근 검색어 개별 삭제
  const removeRecentSearch = (query: string, event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      const updatedSearches = recentSearches.filter((item) => item !== query);
      setRecentSearches(updatedSearches);
      localStorage.setItem(
        RECENT_SEARCHES_KEY,
        JSON.stringify(updatedSearches)
      );
    } catch (error) {
      console.error("최근 검색어 삭제 실패:", error);
    }
  };

  // 최근 검색어 전체 삭제
  const clearAllRecentSearches = () => {
    try {
      setRecentSearches([]);
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch (error) {
      console.error("최근 검색어 전체 삭제 실패:", error);
    }
  };

  // 최근 검색어 클릭
  const handleRecentSearchClick = (query: string) => {
    onSelectQuery(query);
  };

  return (
    <section className="overflow-y-auto h-full flex flex-col px-6 py-1.5 gap-5 mb-6">
      <div className="flex text-sm justify-between items-center">
        <h1 className="font-semibold text-primary-dark01">최근 검색어</h1>
        {recentSearches.length > 0 && (
          <button
            onClick={clearAllRecentSearches}
            aria-label="검색어 전체 삭제"
            className="font-semibold text-primary-normal03 hover:opacity-70"
          >
            전체삭제
          </button>
        )}
      </div>

      {recentSearches.length === 0 ? (
        <p className="text-primary-normal03 text-center text-sm py-20">
          최근 검색어가 없습니다.
        </p>
      ) : (
        <ul className="flex flex-col gap-5">
          {recentSearches.map((query, index) => (
            <li
              key={`${query}-${index}`}
              className="flex justify-between items-center"
            >
              <button
                onClick={() => handleRecentSearchClick(query)}
                className="text-sm text-primary-dark01 hover:opacity-70"
                aria-label={`${query} 검색`}
              >
                {query}
              </button>
              <button
                onClick={(e) => removeRecentSearch(query, e)}
                className="ml-1 text-gray-400 hover:text-gray-600 text-xs"
                aria-label="검색어 삭제"
              >
                <img
                  src={SVG_PATHS.CANCEL}
                  alt="X 아이콘"
                  width={18}
                  height={18}
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// 외부에서 최근 검색어 추가를 위한 유틸리티 함수
export const addToRecentSearches = (query: string) => {
  if (!query || query.trim() === "") return;

  try {
    const savedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
    let currentSearches: string[] = [];

    if (savedSearches) {
      try {
        currentSearches = JSON.parse(savedSearches);
      } catch (e) {
        console.error("기존 검색어 파싱 오류:", e);
      }
    }

    const updatedSearches = [
      query,
      ...currentSearches.filter((item) => item !== query),
    ].slice(0, MAX_RECENT_SEARCHES);

    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedSearches));
  } catch (error) {
    console.error("최근 검색어 저장 실패:", error);
  }
};
