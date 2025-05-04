import { Link } from "react-router-dom";

import Button from "@/components/@shared/buttons/base-button";
import PostCard from "@/components/community/post-card";
import { mockPosts } from "@/constants/mockData";
import { getCategoryLabel } from "@/utils/categoryUtils";
import { URL_PATHS } from "@/constants/url-path";

export default function PopularPostsPreview() {
  return (
    <section className="flex flex-col gap-2.5">
      <h1 className="text-lg font-bold text-primary-dark02">인기 게시글</h1>
      <div className="flex flex-col gap-5 rounded-md border border-primary-light02 py-4 px-5">
        <PostCard
          post={mockPosts[0]}
          index={0}
          currentCategory="top10"
          getCategoryLabel={getCategoryLabel}
        />
        <PostCard
          post={mockPosts[1]}
          index={1}
          currentCategory="top10"
          getCategoryLabel={getCategoryLabel}
        />
        <PostCard
          post={mockPosts[2]}
          index={2}
          currentCategory="top10"
          getCategoryLabel={getCategoryLabel}
        />
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
