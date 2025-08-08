import Empty from "@/components/@shared/layout/empty";
import PostCard from "@/components/community/PostCard";
import { usePopularPosts } from "@/hooks/useCommunity";
import { useStaggeredAnimation } from "@/hooks/useStaggeredAnimation";
import { getCategoryLabel } from "@/utils/categoryUtils";

export default function PopularPostList() {
  const { data: popularPostsData } = usePopularPosts();
  const posts = popularPostsData?.data || [];
  const { getAnimationProps } = useStaggeredAnimation({
    items: posts,
    delay: 150,
  });

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
            <li key={`post-${post.id}-${index}`} {...getAnimationProps(index)}>
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
