import { Link } from "react-router-dom";

import PageLayout from "@/components/@shared/layout/page-layout";
import NoticeCard from "@/components/home/NoticeCard";
import ShortCutList from "@/components/home/ShortCutList";
import PostCard from "@/components/community/post-card";
import PopularPostsPreview from "@/components/home/PopularPostsPreview";
import Button from "@/components/@shared/buttons/base-button";
import { URL_PATHS } from "@/constants/url-path";
import { IMAGE_PATHS } from "@/constants/assets-path";
import { getCategoryLabel } from "@/utils/categoryUtils";
import { mockPosts } from "@/constants/mockData";

export default function HomePage() {
  return (
    <PageLayout
      title="원바원 | 홈"
      description="원바원 홈"
      headerLogo={true}
      currentPath={URL_PATHS.HOME}
      wrapperBg="white"
      mainClassName="flex flex-col gap-9 px-5 py-4 mt-14 mb-24"
    >
      <section className="flex flex-col gap-4">
        <NoticeCard />
        <Link to={URL_PATHS.SCHOOL}>
          <img
            src={IMAGE_PATHS.BANNER.SCHOOL}
            alt="유치원 찾기 배너"
            width={335}
            height={190}
            className="rounded-md w-full h-full object-cover"
          />
        </Link>
      </section>
      <ShortCutList />
      <section>
        <img
          src={IMAGE_PATHS.BANNER.COMMUNITY}
          alt="리뷰 배너"
          width={335}
          height={104}
          className="rounded-md w-full h-full object-cover"
        />
      </section>
      <PopularPostsPreview />
    </PageLayout>
  );
}
