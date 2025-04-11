import PostCard from "@/components/community/post-card";
import Empty from "@/components/@shared/layout/empty";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import { SVG_PATHS } from "@/constants/assets-path";
import { usePopularPosts } from "@/hooks/useCommunity";
import { getCategoryLabel } from "@/utils/categoryUtils";

export default function PopularPostsList() {
  const { data: popularPostsData, isLoading } = usePopularPosts();
  const posts = popularPostsData?.data || [];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="flex flex-col gap-9 mb-12 pb-1.5">
      <div className="flex gap-2 items-center">
        <img src={SVG_PATHS.CHART} alt="그래프" width="20" height="18" />
        <h2 className="font-semibold text-lg">실시간 인기 게시글</h2>
      </div>

      {posts.length === 0 ? (
        <Empty>
          <p className="text-sm">게시글이 없습니다.</p>
        </Empty>
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
