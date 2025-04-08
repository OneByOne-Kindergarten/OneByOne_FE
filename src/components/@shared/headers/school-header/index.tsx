import { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import Header from "@/components/@shared/headers/base-header";
import Input from "@/components/@shared/form/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/@shared/form";
import { SVG_PATHS } from "@/constants/assets-path";
import SchoolSearchAside from "@/components/school/school-search-aside";
import {
  checkFavoriteStatus,
  toggleFavorite as toggleFavoriteService,
} from "@/services/favoriteService";
import { useFavorites } from "@/hooks/useFavorites";

interface SchoolHeaderProps {
  title?: string;
  hasBorder?: boolean;
  hasBackButton?: boolean;
  onBackButtonClick?: () => void;
  kindergartenId?: string;
  showBookmark?: boolean;
}

interface SearchFormValues {
  search: string;
}

export default function SchoolHeader({
  title = "원바원",
  hasBorder,
  hasBackButton,
  onBackButtonClick,
  kindergartenId,
  showBookmark = false,
}: SchoolHeaderProps) {
  const form = useForm<SearchFormValues>({
    defaultValues: {
      search: "",
    },
  });
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { refetch } = useFavorites();

  // 검색 모드 활성화
  useEffect(() => {
    if (isSearching && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearching]);

  // 즐겨찾기 상태 확인
  useEffect(() => {
    if (showBookmark && kindergartenId) {
      fetchFavoriteStatus();
    }
  }, [showBookmark, kindergartenId]);

  const fetchFavoriteStatus = async () => {
    if (!kindergartenId) return;

    try {
      const response = await checkFavoriteStatus(Number(kindergartenId));
      setIsFavorite(response);
    } catch (error) {
      console.error("즐겨찾기 상태 확인 실패:", error);
    }
  };

  // 즐겨찾기 토글
  const handleToggleFavorite = useCallback(async () => {
    if (!kindergartenId || favoriteLoading) return;

    try {
      setFavoriteLoading(true);
      const result = await toggleFavoriteService(Number(kindergartenId));

      if (result.success) {
        setIsFavorite(result.isFavorite);
        refetch();
      }
    } catch (error) {
      console.error("즐겨찾기 토글 실패:", error);
    } finally {
      setFavoriteLoading(false);
    }
  }, [kindergartenId, favoriteLoading, refetch]);

  const handleSearch = () => {
    setIsSearching(true);
  };

  // 최근 검색어 선택 처리
  const handleSearchQuerySelect = async (query: string) => {
    form.setValue("search", query);
    setSearchQuery(query);
  };

  // 검색 폼 제출 처리
  const handleSearchSubmit = async (data: SearchFormValues) => {
    if (data.search.trim() !== "") {
      setSearchQuery(data.search);
    }
  };

  // 검색 결과 닫기
  const handleCloseSearchResult = () => {
    setIsSearching(false);
    setSearchQuery("");
    form.reset();
  };

  // 검색어 지우기
  const handleClearSearch = () => {
    form.setValue("search", "");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleMap = () => {
    // TODO: 맵 기능
  };

  return (
    <>
      {isSearching ? (
        <Header
          hasBackButton={true}
          hasBorder={false}
          onBackButtonClick={handleCloseSearchResult}
        >
          <div className="relative w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSearchSubmit)}
                className="w-full"
              >
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }: { field: any }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="유치원 이름을 검색해보세요"
                          variant="default"
                          className="py-1.5 pr-9 text-sm font-normal text-primary-dark01 w-full pl-9"
                          {...field}
                          ref={(e) => {
                            inputRef.current = e;
                            field.ref(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <img
                  src={SVG_PATHS.SEARCH}
                  alt="돋보기"
                  width={17}
                  height={17}
                  className="absolute top-2 left-3 opacity-30 z-10"
                />
                {form.watch("search") && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="flex items-center justify-center w-4 h-4 bg-primary-normal01 rounded-full absolute top-2 right-3 z-10"
                    aria-label="검색어 초기화"
                  >
                    <img
                      src={SVG_PATHS.CANCEL}
                      alt="X 아이콘"
                      width={12}
                      height={12}
                      className="opacity-30"
                    />
                  </button>
                )}
              </form>
            </Form>
          </div>
        </Header>
      ) : (
        <Header
          title={title}
          hasBorder={hasBorder}
          hasBackButton={hasBackButton}
          onBackButtonClick={onBackButtonClick}
        >
          <div className="flex items-center gap-4">
            {showBookmark && (
              <button
                onClick={handleToggleFavorite}
                aria-label={isFavorite ? "즐겨찾기 취소" : "즐겨찾기 추가"}
                disabled={favoriteLoading}
                className={favoriteLoading ? "opacity-50" : ""}
              >
                <img
                  src={
                    isFavorite
                      ? SVG_PATHS.BOOKMARKER.active
                      : SVG_PATHS.BOOKMARKER.inactive
                  }
                  alt="북마크"
                  className="w-6 h-6"
                />
              </button>
            )}
            <button onClick={handleMap} aria-label="지도">
              <img src={SVG_PATHS.MAP} alt="지도" className="w-6 h-6" />
            </button>
            <button onClick={handleSearch} aria-label="검색">
              <img src={SVG_PATHS.SEARCH} alt="검색" className="w-6 h-6" />
            </button>
          </div>
        </Header>
      )}

      {isSearching && (
        <SchoolSearchAside
          isOpen={isSearching}
          onClose={handleCloseSearchResult}
          searchQuery={searchQuery}
          onSearchQuerySelect={handleSearchQuerySelect}
        />
      )}
    </>
  );
}
