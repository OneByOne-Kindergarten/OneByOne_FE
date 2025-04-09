import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

import PostCard from "@/components/community/post-card";
import Button from "@/components/@shared/buttons/base-button";
import Badge from "@/components/@shared/badge";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import { getMockPosts } from "@/services/mockApi";
import { CommunityPostData } from "@/types/communityDTO";
import { formatDate } from "@/utils/dateUtils";
import { SVG_PATHS } from "@/constants/assets-path";
import {
  PRE_TEACHER_CATEGORIES,
  TEACHER_CATEGORIES,
  CATEGORY_LABELS,
  CategoryOption,
} from "@/constants/community";
import { setCommunityState } from "@/utils/lastVisitedPathUtils";

interface CommunityLayoutProps {
  type: "teacher" | "pre-teacher";
  categoryOptions: CategoryOption[];
  children?: React.ReactNode;
  isEditor?: boolean;
}

export default function CommunityLayout({
  type,
  categoryOptions,
  children,
  isEditor = false,
}: CommunityLayoutProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<
    (CommunityPostData & { author: string })[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentCategory = searchParams.get("category") || "top10";

  const handleCategoryChange = (category: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("category", category);
    newSearchParams.set("type", type);
    setSearchParams(newSearchParams);

    // 커뮤니티 상태 한번에 저장
    setCommunityState({
      category: category,
      path: `/community?type=${type}&category=${category}`,
    });
  };

  // 필터 변경
  useEffect(() => {
    if (isEditor) return;

    setIsLoading(true);

    // API 호출 지연 시뮬레이터
    const timer = setTimeout(() => {
      const fetchedPosts = getMockPosts(type, currentCategory);

      const postsWithAuthor = fetchedPosts.map((post) => ({
        ...post,
        author:
          type === "teacher"
            ? `선생님${post.id.toString().substring(1)}`
            : `예비교사${post.id.toString().substring(1)}`,
      }));

      setPosts(postsWithAuthor);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentCategory, type, isEditor]);

  // 커뮤니티 카테고리
  const getCategoryLabel = (categoryValue: string) => {
    return CATEGORY_LABELS[categoryValue] || categoryValue;
  };

  const getCategoryOptions = () => {
    return type === "pre-teacher" ? PRE_TEACHER_CATEGORIES : TEACHER_CATEGORIES;
  };

  if (isEditor) {
    return (
      <div className="px-5 flex flex-col gap-9">
        <section className="flex gap-2 w-full overflow-x-auto scrollbar-x-hidden whitespace-nowrap">
          {getCategoryOptions().map((option) => (
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
        {getCategoryOptions().map((option) => (
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
          {posts.length === 0 ? (
            <div className="text-center py-16 text-primary-normal03">
              게시글이 없습니다.
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {posts.map((post, index) => (
                <PostCard
                  key={post.id}
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
