import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import SearchPageLayout from "@/components/@shared/layout/search-page-layout";
import RecentSearches from "@/components/@shared/search/recent-searches";
import CommunitySearchResult from "@/components/community/CommunitySearchResult";
import { URL_PATHS } from "@/constants/url-path";
import { useCommunityPosts } from "@/hooks/useCommunity";
import { useSearchPage } from "@/hooks/useSearchPage";
import { CommunityPostItem } from "@/types/communityDTO";
import { getCommunityPath } from "@/utils/lastVisitedPathUtils";

export default function CommunitySearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    searchQuery,
    isInitialRender,
    handleSearchSubmit,
    handleClearSearch,
    handleRecentSearchSelect,
    isSearchResult,
  } = useSearchPage<CommunityPostItem>("query");

  const category =
    (searchParams.get("category") as "TEACHER" | "PROSPECTIVE_TEACHER") ||
    "TEACHER";
  const searchType = searchParams.get("searchType") || "title";

  // 검색 파라미터 생성 (메모이제이션으로 최적화)
  const communitySearchParams = useMemo(() => {
    if (!searchQuery) return undefined;

    switch (searchType) {
      case "title":
        return { title: searchQuery };
      case "content":
        return { content: searchQuery };
      case "userName":
        return { userName: searchQuery };
      default:
        return { title: searchQuery };
    }
  }, [searchQuery, searchType]);

  const {
    data: communityPostsData,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    error,
  } = useCommunityPosts(10, category, communitySearchParams);

  // 모든 페이지의 게시물을 단일 배열로 변환 (중복 제거)
  const uniquePosts = useMemo(() => {
    const allPosts =
      communityPostsData?.pages.flatMap((page) => page.content || []) || [];
    return Array.from(
      new Map(allPosts.map((post) => [post.id, post])).values()
    );
  }, [communityPostsData]);

  const handleBackClick = () => {
    const lastCommunityPath = getCommunityPath();

    // 저장된 경로가 검색 페이지이거나 없으면 기본 커뮤니티 페이지로 이동
    if (!lastCommunityPath || lastCommunityPath.includes("/search/")) {
      navigate(URL_PATHS.COMMUNITY);
    } else {
      navigate(lastCommunityPath);
    }
  };

  const handlePostClick = (id: string) => {
    navigate(URL_PATHS.COMMUNITY_POST.replace(":id", id), {
      replace: true,
      state: {
        fromSearch: true,
        searchQuery: searchQuery,
        category: category,
      },
    });
  };

  const hasSearchResults = isSearchResult(uniquePosts);

  return (
    <SearchPageLayout
      title="커뮤니티 검색"
      placeholder="게시물 제목으로 검색해보세요"
      searchValue={searchQuery}
      onSearchSubmit={handleSearchSubmit}
      onSearchClear={handleClearSearch}
      onBackButtonClick={handleBackClick}
    >
      <div className="flex flex-1 flex-col overflow-hidden">
        {uniquePosts.length > 0 ? (
          <div
            className={hasSearchResults ? "bg-primary-foreground" : "bg-white"}
          >
            <CommunitySearchResult
              searchQuery={searchQuery}
              results={uniquePosts}
              totalItems={uniquePosts.length}
              isLoading={isLoading}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              fetchNextPage={() => fetchNextPage()}
              error={error}
              onPostClick={handlePostClick}
            />
          </div>
        ) : (
          searchQuery && (
            <section className="flex-1 bg-white">
              <p className="py-8 text-center text-sm text-primary-normal03">
                검색 결과가 없습니다.
              </p>
            </section>
          )
        )}

        {/* 최근 검색어 */}
        {!isInitialRender && !hasSearchResults && (
          <div className="flex-1 bg-white">
            <RecentSearches onSelectQuery={handleRecentSearchSelect} />
          </div>
        )}
      </div>
    </SearchPageLayout>
  );
}
