import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchKindergartens } from "@/hooks/useSearchKindergartens";
import { useCommunityPosts } from "@/hooks/useCommunity";
import {
  KindergartenSearchParams,
  Kindergarten,
} from "@/types/kindergartenDTO";
import { CommunityPostItem } from "@/types/communityDTO";

type SearchTypes = "kindergarten" | "community";

// 검색 결과 타입 정의
export interface SearchResults<T> {
  results: T[];
  totalItems: number;
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  error: unknown;
}

interface UseSearchProps {
  type: SearchTypes;
  initialQuery?: string;
}

export function useSearch<T extends Kindergarten | CommunityPostItem>({
  type,
  initialQuery = "",
}: UseSearchProps): {
  searchQuery: string;
  searchType: string;
  category: string;
  handleSearch: (query: string) => void;
  handleCancelSearch: () => void;
  fetchResults: (query: string, category?: string) => SearchResults<T>;
} {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    initialQuery || searchParams.get("query") || ""
  );
  const searchType = searchParams.get("searchType") || "title";
  const category = searchParams.get("category") || "";

  // 검색어 업데이트 시 URL 파라미터도 업데이트
  useEffect(() => {
    if (searchQuery) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("query", searchQuery);
      setSearchParams(newParams);
    }
  }, [searchQuery, searchParams, setSearchParams]);

  // 커뮤니티 검색 결과 가져오기
  const fetchCommunityResults = (
    query: string,
    category?: string
  ): SearchResults<CommunityPostItem> => {
    // category가 "TEACHER" 또는 "PROSPECTIVE_TEACHER"인지 확인
    const communityCategory =
      category === "TEACHER" || category === "PROSPECTIVE_TEACHER"
        ? category
        : "TEACHER"; // 기본값

    const searchParams = query
      ? searchType === "title"
        ? { title: query }
        : { content: query }
      : undefined;

    const {
      data: communityPostsData,
      isLoading,
      hasNextPage,
      fetchNextPage,
      isFetchingNextPage,
      error,
    } = useCommunityPosts(
      10,
      communityCategory as "TEACHER" | "PROSPECTIVE_TEACHER",
      searchParams
    );

    // 모든 페이지의 게시물을 단일 배열로 변환 (중복 제거)
    const allPosts =
      communityPostsData?.pages.flatMap((page) => page.content || []) || [];
    const uniquePosts = Array.from(
      new Map(allPosts.map((post) => [post.id, post])).values()
    );

    return {
      results: uniquePosts,
      totalItems: uniquePosts.length,
      fetchNextPage: () => fetchNextPage(),
      hasNextPage,
      isFetchingNextPage,
      isLoading,
      error,
    };
  };

  // 유치원 검색 결과 가져오기
  const fetchKindergartenResults = (
    query: string
  ): SearchResults<Kindergarten> => {
    const searchParams: KindergartenSearchParams = {
      name: query,
    };

    const {
      results,
      totalItems,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isLoading,
      error,
    } = useSearchKindergartens(searchParams);

    return {
      results,
      totalItems,
      fetchNextPage: () => fetchNextPage(),
      hasNextPage,
      isFetchingNextPage,
      isLoading,
      error,
    };
  };

  // 타입에 따라 검색 함수 선택
  const fetchResults = (query: string, category?: string): SearchResults<T> => {
    if (type === "community") {
      return fetchCommunityResults(
        query,
        category
      ) as unknown as SearchResults<T>;
    } else {
      return fetchKindergartenResults(query) as unknown as SearchResults<T>;
    }
  };

  // 검색어 설정 함수
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // 검색 취소 함수
  const handleCancelSearch = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("query");
    newParams.delete("searchType");
    setSearchParams(newParams);
    setSearchQuery("");
  };

  return {
    searchQuery,
    searchType,
    category,
    handleSearch,
    handleCancelSearch,
    fetchResults,
  };
}
