import { Link } from "react-router-dom";

import Button from "@/components/@shared/buttons/base-button";
import PostCard from "@/components/community/PostCard";
import { getCategoryLabel } from "@/utils/categoryUtils";
import { URL_PATHS } from "@/constants/url-path";
import { usePopularPosts } from "@/hooks/useCommunity";

export default function PopularPostsPreview() {
  const { data: posts } = usePopularPosts();

  return (
    <section className="flex flex-col gap-2.5">
      <h1 className="text-lg font-bold text-primary-dark02">인기 게시글</h1>
      <div className="flex flex-col gap-5 rounded-lg border border-primary-light02 px-5 py-4">
        {[0, 1, 2].map((i) =>
          posts?.data[i] ? (
            <PostCard
              key={posts.data[i].id}
              post={posts.data[i]}
              index={i}
              currentCategory="top10"
              getCategoryLabel={getCategoryLabel}
            />
          ) : null
        )}
        <Link to={URL_PATHS.COMMUNITY}>
          <Button
            variant="secondary"
            type="button"
            size="lg"
            className="w-full"
          >
            인기글 전체보기
          </Button>
        </Link>
      </div>
    </section>
  );
}
