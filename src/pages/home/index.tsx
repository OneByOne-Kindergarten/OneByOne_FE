import { Link } from "react-router-dom";

import { IMAGE_PATHS } from "@/shared/constants/assets-path";
import { URL_PATHS } from "@/shared/constants/url-path";
import QueryErrorBoundary from "@/shared/ui/error-boundary/QueryErrorBoundary";
import PageLayout from "@/shared/ui/layout/page-layout";
import NoticeCard from "@/widgets/home-dashboard/ui/NoticeCard";
import PopularPostsPreview from "@/widgets/home-dashboard/ui/PopularPostsPreview";
import RecentReviewPreview from "@/widgets/home-dashboard/ui/RecentReviewPreview";
import ShortCutList from "@/widgets/shortcut-list";

export default function HomePage() {
  return (
    <PageLayout
      title="원바원 | 홈"
      description="유치원 교사들을 위한 유치원 리뷰 및 커뮤니티 서비스 홈"
      ogImage={IMAGE_PATHS.OPEN_GRAPH}
      ogUrl={window.location.href}
      headerType="base"
      headerLogo={true}
      currentPath={URL_PATHS.HOME}
      hasBackButton={false}
      wrapperBg="white"
      mainClassName="flex flex-col gap-9 px-5 py-4 mt-14 mb-24"
      showAlarmButton={true}
    >
      <section className="flex flex-col gap-4">
        <NoticeCard />
        <Link
          to={URL_PATHS.KINDERGARTEN}
          className="block overflow-hidden rounded-3xl"
        >
          <img
            src={IMAGE_PATHS.BANNER.KINDERGARTEN}
            alt="유치원 찾기 배너"
            width={335}
            height={190}
            className="h-full w-full object-cover transition-all duration-300 ease-out hover:scale-110 active:scale-110"
          />
        </Link>
      </section>
      <ShortCutList />

      <section className="flex flex-col gap-2.5">
        <h1 className="text-lg font-bold text-primary-dark02">실시간 리뷰</h1>
        <QueryErrorBoundary className="rounded-lg border border-primary-light02">
          <RecentReviewPreview />
        </QueryErrorBoundary>
      </section>

      <section>
        <img
          src={IMAGE_PATHS.BANNER.COMMUNITY}
          alt="리뷰 배너"
          width={335}
          height={104}
          className="h-full w-full rounded-lg object-cover"
        />
      </section>

      <section className="flex flex-col gap-2.5">
        <h1 className="text-lg font-bold text-primary-dark02">인기 게시글</h1>
        <QueryErrorBoundary className="rounded-lg border border-primary-light02">
          <PopularPostsPreview />
        </QueryErrorBoundary>
      </section>
    </PageLayout>
  );
}
