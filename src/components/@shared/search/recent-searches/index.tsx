import { SVG_PATHS } from "@/constants/assets-path";
import { useRecentSearches } from "@/hooks/useRecentSearches";

interface RecentSearchesProps {
  onSelectQuery: (query: string) => void;
}

export default function RecentSearches({ onSelectQuery }: RecentSearchesProps) {
  const { recentSearches, removeRecentSearch, clearAllRecentSearches } =
    useRecentSearches();

  const handleRecentSearchClick = (query: string) => {
    onSelectQuery(query);
  };

  // 검색어 개별 삭제
  const handleRemoveSearch = (query: string, event: React.MouseEvent) => {
    event.stopPropagation();
    removeRecentSearch(query);
  };

  return (
    <section className="mb-6 flex h-full flex-col gap-5 overflow-y-auto px-6 py-1.5">
      <div className="flex items-center justify-between text-sm">
        <h1 className="font-semibold text-primary-dark01">최근 검색어</h1>
        {recentSearches.length > 0 && (
          <button
            onClick={clearAllRecentSearches}
            aria-label="검색어 전체 삭제"
            className="font-semibold text-primary-normal03 hover:opacity-70 focus:outline-none active:scale-95"
          >
            전체삭제
          </button>
        )}
      </div>

      {recentSearches.length === 0 ? (
        <p className="py-20 text-center text-sm text-primary-normal03">
          최근 검색어가 없습니다.
        </p>
      ) : (
        <ul className="flex flex-col gap-5">
          {recentSearches.map((query, index) => (
            <li
              key={`${query}-${index}`}
              className="flex items-center justify-between"
            >
              <button
                onClick={() => handleRecentSearchClick(query)}
                className="text-sm text-primary-dark01 hover:brightness-50 focus:outline-none active:brightness-50"
                aria-label={`${query} 검색`}
              >
                {query}
              </button>
              <button
                onClick={(e) => handleRemoveSearch(query, e)}
                className="ml-1 text-xs text-gray-400 hover:brightness-50 focus:outline-none active:scale-95"
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
