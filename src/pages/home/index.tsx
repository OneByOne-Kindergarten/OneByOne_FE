import { Link } from "react-router-dom";

import PageLayout from "@/components/@shared/layout/page-layout";
import NoticeCard from "@/components/home/NoticeCard";
import PopularPostsPreview from "@/components/home/PopularPostsPreview";
import ShortCutList from "@/components/home/ShortCutList";
import { IMAGE_PATHS } from "@/constants/assets-path";
import { URL_PATHS } from "@/constants/url-path";

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
          to={URL_PATHS.SCHOOL}
          className="block overflow-hidden rounded-3xl"
        >
          <img
            src={IMAGE_PATHS.BANNER.SCHOOL}
            alt="유치원 찾기 배너"
            width={335}
            height={190}
            className="h-full w-full object-cover transition-all duration-300 ease-out hover:scale-110 active:scale-110"
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
          className="h-full w-full rounded-lg object-cover"
        />
      </section>
      <PopularPostsPreview />
    </PageLayout>
  );
}
