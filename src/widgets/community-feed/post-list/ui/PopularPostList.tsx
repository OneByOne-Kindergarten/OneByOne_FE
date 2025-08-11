import { useEffect, useRef, useState } from "react";

import { usePopularPosts } from "@/entities/community/hooks";
import Empty from "@/shared/ui/layout/empty";
import { getCategoryLabel } from "@/shared/utils/categoryUtils";
import PostCard from "@/widgets/community-feed/post-list/ui/PostCard";

export default function PopularPostList() {
  const { data: popularPostsData } = usePopularPosts();
  const posts = popularPostsData?.data || [];
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const firstCardRef = useRef<HTMLLIElement | null>(null);

  // 게시글 카드 애니메이션 시작
  useEffect(() => {
    if (!firstCardRef.current || posts.length === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAnimationStarted(true);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    observer.observe(firstCardRef.current);

    return () => observer.disconnect();
  }, [posts.length]);

  return (
    <>
      {posts.length === 0 ? (
        <Empty
          title="게시글이 없습니다."
          subTitle="첫 번째 게시글을 작성해보세요!"
        />
      ) : (
        <ul className="flex flex-col gap-5">
          {posts.map((post, index) => (
            <li
              key={`post-${post.id}-${index}`}
              ref={index === 0 ? firstCardRef : null}
              className={`transform transition-all duration-500 ease-out ${
                isAnimationStarted
                  ? "translate-x-0 scale-100 opacity-100"
                  : "translate-x-8 scale-95 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <PostCard
                post={post}
                index={index}
                currentCategory="top10"
                getCategoryLabel={getCategoryLabel}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
