import Empty from "@/components/@shared/layout/empty";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import PostCard from "@/components/community/PostCard";
import { SVG_PATHS } from "@/constants/assets-path";
import { usePopularPosts } from "@/hooks/useCommunity";
import { getCategoryLabel } from "@/utils/categoryUtils";

export default function PopularPostsList() {
  const { data: popularPostsData, isLoading } = usePopularPosts();
  const posts = popularPostsData?.data || [];

  if (isLoading) {
    return <LoadingSpinner type="element" />;
  }

  return (
    <section className="mb-12 flex flex-col gap-9 pb-1.5">
      <div className="flex items-center gap-2">
        <img src={SVG_PATHS.CHART} alt="그래프" width="20" height="18" />
        <h2 className="text-lg font-semibold">실시간 인기 게시글</h2>
      </div>

      {posts.length === 0 ? (
        <Empty
          title="게시글이 없습니다."
          subTitle="첫 번째 게시글을 작성해보세요!"
        />
      ) : (
        <ul className="flex flex-col gap-5">
          {posts.map((post, index) => (
            <PostCard
              key={`post-${post.id}-${index}`}
              post={post}
              index={index}
              currentCategory="top10"
              getCategoryLabel={getCategoryLabel}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
