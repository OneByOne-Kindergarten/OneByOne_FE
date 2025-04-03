import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Button from "@/components/@shared/buttons/base-button";
import Badge from "@/components/@shared/badge";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import { getMockPosts } from "@/services/mockApi";
import type { Post } from "@/types/community";
import { formatDate } from "@/utils/dateUtils";
import { SVG_PATHS } from "@/constants/assets-path";
import { COMMUNITY_CATEGORIES, CATEGORY_LABELS } from "@/constants/community";
import { setCommunityState } from "@/utils/lastVisitedPathUtils";

interface CategoryOption {
  value: string;
  label: string;
}

interface CommunityLayoutProps {
  type: "teacher" | "pre-teacher";
  categoryOptions: CategoryOption[];
}

// Post 타입을 확장한 인터페이스(화면 표시용)
interface DisplayPost extends Post {
  author?: string;
}

export default function CommunityLayout({
  type,
  categoryOptions,
}: CommunityLayoutProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<DisplayPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentCategory =
    searchParams.get("category") || COMMUNITY_CATEGORIES.TOP10;

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
    setIsLoading(true);

    // API 호출 지연 시뮬레이터
    const timer = setTimeout(() => {
      const fetchedPosts = getMockPosts(type, currentCategory);

      // 서버 응답을 표시용 데이터로 변환
      const postsWithAuthor = fetchedPosts.map((post) => ({
        ...post,
        author:
          type === "teacher"
            ? `선생님${post.id.substring(1)}`
            : `예비교사${post.id.substring(1)}`,
      }));

      setPosts(postsWithAuthor);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentCategory, type]);

  // 카테고리명 가져오기
  const getCategoryLabel = (categoryValue: string) => {
    return CATEGORY_LABELS[categoryValue] || categoryValue;
  };

  return (
    <div className="px-5 flex flex-col gap-9">
      <menu className="flex gap-2 w-full overflow-x-auto scrollbar-x-hidden whitespace-nowrap">
        {categoryOptions.map((option) => (
          <Button
            key={option.value}
            shape="full"
            variant={currentCategory === option.value ? "secondary" : "default"}
            onClick={() => handleCategoryChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </menu>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <section className="flex flex-col gap-9">
          {currentCategory === COMMUNITY_CATEGORIES.TOP10 && (
            <div className="flex gap-2 items-center">
              <img src={SVG_PATHS.CHART} alt="그래프" width="20" height="18" />
              <h2 className="font-semibold text-lg">실시간 인기 게시글</h2>
            </div>
          )}

          {posts.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              게시글이 없습니다.
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {posts.map((post, index) => (
                <li
                  key={post.id}
                  className="flex items-center gap-3 flex-1 pb-4 border-b"
                >
                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="flex gap-2">
                      {currentCategory === COMMUNITY_CATEGORIES.TOP10 && (
                        <Badge variant="secondary">{index + 1}</Badge>
                      )}
                      <Badge variant="primary">
                        {getCategoryLabel(post.category)}
                      </Badge>
                    </div>
                    <Link to={`/community/${post.id}`}>
                      <p className="font-semibold text-primary-dark01">
                        {post.title}
                      </p>
                    </Link>
                    <div className="flex justify-between text-xs text-primary-normal03">
                      <div className="flex gap-4">
                        <div className="flex gap-1 items-center">
                          <img
                            src={SVG_PATHS.THUMB_UP}
                            alt="좋아요 아이콘"
                            width="15"
                            height="15"
                          />
                          <span>{post.likeCount}</span>
                        </div>
                        <div className="flex gap-1 items-center">
                          <img
                            src={SVG_PATHS.CHAT.line}
                            alt="말풍선 아이콘"
                            width="15"
                            height="15"
                          />
                          <span>{post.commentCount}</span>
                        </div>
                        <div className="flex gap-1 items-center">
                          <img
                            src={SVG_PATHS.EYE.on}
                            alt="눈 아이콘"
                            width="15"
                            height="15"
                          />
                          <span>{post.viewCount || post.views}</span>
                        </div>
                      </div>
                      <div>
                        <span>
                          {post.author || "작성자"} ·{" "}
                          {formatDate(post.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}
