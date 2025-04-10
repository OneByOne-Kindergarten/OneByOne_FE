import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import PostCard from "@/components/community/post-card";
import Button from "@/components/@shared/buttons/base-button";
import Empty from "@/components/@shared/layout/empty";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";

import {
  PROSPECTIVE_TEACHER_CATEGORIES,
  TEACHER_CATEGORIES,
  CategoryOption,
} from "@/constants/community";
import { SVG_PATHS } from "@/constants/assets-path";
import { getCategoryLabel } from "@/utils/categoryUtils";
import { setCommunityState } from "@/utils/lastVisitedPathUtils";
import { useCommunityPosts, usePopularPosts } from "@/hooks/useCommunity";

interface CommunityLayoutProps {
  type: "teacher" | "pre-teacher";
  categoryOptions: CategoryOption[];
  children?: React.ReactNode;
  isEditor?: boolean;
}

export default function CommunityLayout({
  type,
  children,
  isEditor = false,
}: CommunityLayoutProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const currentCategory = searchParams.get("category") || "top10";

  const getCommunityParams = () => {
    if (currentCategory === "top10" || currentCategory === "all") {
      return undefined;
    }

    return { categoryName: currentCategory };
  };

  const { data: popularPostsData, isLoading: isPopularLoading } =
    usePopularPosts();

  const { data: communityPostsData, isLoading: isCommunityLoading } =
    useCommunityPosts(
      10,
      type === "teacher" ? "TEACHER" : "PROSPECTIVE_TEACHER",
      getCommunityParams()
    );

  const handleCategoryChange = (category: string) => {
    if (category === currentCategory) return;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("category", category);
    newSearchParams.set("type", type);
    setSearchParams(newSearchParams);

    // 커뮤니티 상태 한번에 저장
    setCommunityState({
      path: `/community?type=${type}&category=${category}`,
      category: type,
      communityCategoryName: category,
    });
  };

  useEffect(() => {
    if (isEditor) return;

    const isDataLoading =
      currentCategory === "top10" ? isPopularLoading : isCommunityLoading;

    setIsLoading(isDataLoading);
  }, [currentCategory, isEditor, isPopularLoading, isCommunityLoading]);

  const getCategoryOptions = () => {
    return type === "pre-teacher"
      ? PROSPECTIVE_TEACHER_CATEGORIES
      : TEACHER_CATEGORIES;
  };

  // 게시물 목록 데이터 중복 제거
  const posts =
    currentCategory === "top10"
      ? popularPostsData?.data || []
      : communityPostsData?.pages.flatMap((page) => page.content || []) || [];

  const uniquePosts =
    currentCategory === "top10"
      ? posts
      : Array.from(new Map(posts.map((post) => [post.id, post])).values());

  if (isEditor) {
    return (
      <div className="px-5 flex flex-col gap-9">
        <section className="flex gap-2 w-full overflow-x-auto scrollbar-x-hidden whitespace-nowrap">
          {getCategoryOptions().map((option: CategoryOption) => (
            <Button
              key={option.value}
              shape="full"
              font="md"
              size="lg"
              variant={
                currentCategory === option.value ? "secondary" : "default"
              }
              onClick={() => handleCategoryChange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </section>
        {children}
      </div>
    );
  }

  return (
    <div className="px-5 flex flex-col gap-9">
      <section className="flex gap-2 w-full overflow-x-auto scrollbar-x-hidden whitespace-nowrap">
        {getCategoryOptions().map((option: CategoryOption) => (
          <Button
            key={option.value}
            shape="full"
            font="md"
            size="lg"
            variant={currentCategory === option.value ? "secondary" : "default"}
            onClick={() => handleCategoryChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </section>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <section className="flex flex-col gap-9">
          {currentCategory === "top10" && (
            <div className="flex gap-2 items-center">
              <img src={SVG_PATHS.CHART} alt="그래프" width="20" height="18" />
              <h2 className="font-semibold text-lg">실시간 인기 게시글</h2>
            </div>
          )}
          {uniquePosts.length === 0 ? (
            <Empty>
              <p className="text-sm">게시글이 없습니다.</p>
            </Empty>
          ) : (
            <ul className="flex flex-col gap-5">
              {uniquePosts.map((post, index) => (
                <PostCard
                  key={`post-${post.id}-${index}`}
                  post={post}
                  index={index}
                  currentCategory={currentCategory}
                  getCategoryLabel={getCategoryLabel}
                />
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}
