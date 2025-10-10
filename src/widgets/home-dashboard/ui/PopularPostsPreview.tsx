import { Link } from "react-router-dom";

import { usePopularPosts } from "@/entities/community/hooks/usePopularPosts";
import { URL_PATHS } from "@/shared/constants/url-path";
import Button from "@/shared/ui/buttons/base-button";
import { getCategoryLabel } from "@/shared/utils/categoryUtils";
import PostCard from "@/widgets/community-feed/post-list/ui/PostCard";

export default function PopularPostsPreview() {
  const { data: posts } = usePopularPosts();

  return (
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
        <Button variant="secondary" type="button" size="lg" className="w-full">
          인기글 전체보기
        </Button>
      </Link>
    </div>
  );
}
