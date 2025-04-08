import { useState, useEffect } from "react";
import { SVG_PATHS } from "@/constants/assets-path";

// 최근 검색어 관리 상수
const RECENT_SEARCHES_KEY = "recentSearches";
const MAX_RECENT_SEARCHES = 5;

interface RecentSearchesProps {
  onSelectQuery: (query: string) => void;
}

export default function RecentSearches({ onSelectQuery }: RecentSearchesProps) {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // 컴포넌트 마운트 시 최근 검색어 불러오기
  useEffect(() => {
    loadRecentSearches();
  }, []);

  // 최근 검색어 불러오기
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

  // 최근 검색어 삭제
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
    <div className="overflow-y-auto h-full flex flex-col px-6 py-1 gap-5 mb-6">
      <div className="flex text-sm justify-between items-center">
        <h3 className="font-semibold text-primary-dark01">최근 검색어</h3>
        {recentSearches.length > 0 && (
          <button
            onClick={clearAllRecentSearches}
            className="font-semibold text-primary-normal03 hover:opacity-70"
          >
            전체삭제
          </button>
        )}
      </div>

      {recentSearches.length === 0 ? (
        <p className="text-primary-normal03 text-sm font-semibold py-2">
          최근 검색 내역이 없습니다.
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
              >
                {query}
              </button>
              <button
                onClick={(e) => removeRecentSearch(query, e)}
                className="ml-1 text-gray-400 hover:text-gray-600 text-xs"
                aria-label="삭제"
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
    </div>
  );
}

// 외부에서 최근 검색어 추가를 위한 유틸리티 함수
export const addToRecentSearches = (query: string) => {
  if (!query || query.trim() === "") return;

  try {
    // 로컬 스토리지에서 직접 가져와 최신 값 보장
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
