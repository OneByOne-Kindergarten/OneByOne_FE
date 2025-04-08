import { useState, useEffect, useRef } from "react";
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
import { searchKindergartens } from "@/services/kindergartenService";
import {
  KindergartenSearchParams,
  KindergartenSearchResponse,
} from "@/types/kindergarten";
import SchoolSearchResult from "@/components/school/school-search-result";

interface SchoolHeaderProps {
  title?: string;
  hasBorder?: boolean;
  hasBackButton?: boolean;
  onBackButtonClick?: () => void;
}

interface SearchFormValues {
  search: string;
}

export default function SchoolHeader({
  title = "원바원",
  hasBorder,
  hasBackButton,
  onBackButtonClick,
}: SchoolHeaderProps) {
  const form = useForm<SearchFormValues>({
    defaultValues: {
      search: "",
    },
  });
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] =
    useState<KindergartenSearchResponse | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 검색 모드 활성화 시 자동으로 입력 필드에 포커스
  useEffect(() => {
    if (isSearching && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearching]);

  // 검색 버튼 클릭
  const handleSearch = () => {
    setIsSearching(true);
  };

  // 검색
  const performSearch = async (query: string) => {
    if (!query || query.trim() === "") return;

    setIsLoading(true);
    try {
      const searchParams: KindergartenSearchParams = {
        name: query,
        page: 0,
        size: 10,
      };

      const result = await searchKindergartens(searchParams);

      setSearchQuery(query);
      setSearchResults(result);
    } catch (error) {
      console.error("유치원 검색 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = async (data: SearchFormValues) => {
    await performSearch(data.search);
  };

  const handleSearchQuerySelect = async (query: string) => {
    form.setValue("search", query);
    setSearchQuery(query);
  };

  const handleCloseSearchResult = () => {
    setIsSearching(false);
    setSearchQuery("");
  };

  const handleBookmark = () => {
    // TODO: 북마크 기능
  };

  const handleMap = () => {
    // TODO: 맵 기능
  };

  return (
    <>
      {isSearching ? (
        <Header hasBackButton={true} hasBorder={false}>
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
                          className="py-1.5 pr-4 text-sm font-normal text-primary-normal03 w-full pl-9"
                          {...field}
                          ref={(e) => {
                            inputRef.current = e;
                            field.ref(e);
                          }}
                          disabled={isLoading}
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
                  className="absolute top-2 left-3 opacity-30"
                />
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
            <button onClick={handleBookmark} aria-label="북마크">
              <img
                src={SVG_PATHS.BOOKMARKER}
                alt="북마크"
                className="w-6 h-6"
              />
            </button>
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
        <SchoolSearchResult
          isOpen={isSearching}
          onClose={handleCloseSearchResult}
          searchQuery={searchQuery}
          initialResults={searchResults || undefined}
          onSearchQuerySelect={handleSearchQuerySelect}
        />
      )}
    </>
  );
}
