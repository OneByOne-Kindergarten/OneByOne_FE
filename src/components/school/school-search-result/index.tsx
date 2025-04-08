import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SchoolCard from "@/components/school/school-card";
import { Kindergarten, KindergartenSearchResponse } from "@/types/kindergarten";
import { searchKindergartens } from "@/services/kindergartenService";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import ErrorMessage from "@/components/@shared/form/error-message";
import { SVG_PATHS } from "@/constants/assets-path";

// 최근 검색어 관리
const RECENT_SEARCHES_KEY = "recentSearches";
const MAX_RECENT_SEARCHES = 5;

interface SchoolSearchResultProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  initialResults?: KindergartenSearchResponse;
  onSearchQuerySelect?: (query: string) => void;
}

export default function SchoolSearchResult({
  isOpen,
  onClose,
  searchQuery,
  initialResults,
  onSearchQuerySelect,
}: SchoolSearchResultProps) {
  const navigate = useNavigate();
  const [results, setResults] = useState<Kindergarten[]>(
    initialResults?.content || []
  );
  const [loading, setLoading] = useState<boolean>(!initialResults);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(initialResults?.totalPages || 0);
  const [totalItems, setTotalItems] = useState(
    initialResults?.totalElements || 0
  );
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    loadRecentSearches();
  }, []);

  // 검색어가 변경될 때마다 최근 검색어에 추가
  useEffect(() => {
    if (searchQuery && searchQuery.trim() !== "") {
      addToRecentSearches(searchQuery);
    }
  }, [searchQuery]);

  // 검색 결과 가져오기
  useEffect(() => {
    // 검색어가 있고, initialResults가 없을 때만 API 호출
    if (
      searchQuery &&
      isOpen &&
      (!initialResults || initialResults.content.length === 0)
    ) {
      fetchSearchResults(searchQuery, 0);
    } else if (initialResults && initialResults.content.length > 0) {
      // initialResults가 있으면 상태 업데이트만 수행
      setResults(initialResults.content);
      setCurrentPage(initialResults.pageNumber);
      setTotalPages(initialResults.totalPages);
      setTotalItems(initialResults.totalElements);
    }
  }, [searchQuery, isOpen, initialResults]);

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

  // 최근 검색어에 추가
  const addToRecentSearches = (query: string) => {
    try {
      // 현재 상태 대신 로컬 스토리지에서 직접 가져와 최신 값 보장
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

      setRecentSearches(updatedSearches);
      localStorage.setItem(
        RECENT_SEARCHES_KEY,
        JSON.stringify(updatedSearches)
      );
    } catch (error) {
      console.error("최근 검색어 저장 실패:", error);
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
    if (onSearchQuerySelect) {
      onSearchQuerySelect(query);
    }
  };

  // 검색
  const fetchSearchResults = async (query: string, page: number) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await searchKindergartens({
        name: query,
        page,
        size: 10,
      });

      setResults(response.content);
      setCurrentPage(response.pageNumber);
      setTotalPages(response.totalPages);
      setTotalItems(response.totalElements);
    } catch (error) {
      console.error("유치원 검색 오류:", error);
      setError("검색 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleKindergartenClick = (id: string) => {
    navigate(`/school/${id}`);
    onClose();
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      fetchSearchResults(searchQuery, newPage);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 top-14 py-1 px-5 bg-white z-40">
      {searchQuery && (
        <div className="flex flex-col">
          <h3 className="font-semibold text-sm text-primary-dark01 mb-2">
            검색 결과 {totalItems > 0 && `(${totalItems})`}
          </h3>

          {loading ? (
            <div className="flex justify-center items-center py-10">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-8">
              <ErrorMessage error={error} />
            </div>
          ) : results.length === 0 ? (
            <div className="flex justify-center items-center text-sm py-8">
              <p>검색 결과가 없습니다.</p>
            </div>
          ) : (
            <div>
              <ul className="flex flex-col gap-2 mb-4">
                {results.map((kindergarten) => (
                  <div
                    key={kindergarten.id}
                    onClick={() =>
                      handleKindergartenClick(kindergarten.id.toString())
                    }
                    className="cursor-pointer"
                  >
                    <SchoolCard
                      id={kindergarten.id.toString()}
                      schoolName={kindergarten.name}
                      location={kindergarten.address}
                      category={kindergarten.establishment}
                      score={0}
                    />
                  </div>
                ))}
              </ul>

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4 pb-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 0}
                    className="px-3 py-1 border rounded-md disabled:opacity-50"
                  >
                    이전
                  </button>
                  <span className="px-3 py-1">
                    {currentPage + 1} / {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                    className="px-3 py-1 border rounded-md disabled:opacity-50"
                  >
                    다음
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="overflow-y-auto h-[calc(100%-50px)] ">
        <div className="flex flex-col gap-5 mb-6">
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
            <ul className="flex flex-col gap-2">
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
      </div>
    </div>
  );
}
