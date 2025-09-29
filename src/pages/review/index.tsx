import { Suspense } from "react";

import { IMAGE_PATHS } from "@/shared/constants/assets-path";
import { URL_PATHS } from "@/shared/constants/url-path";
import PageLayout from "@/shared/ui/layout/page-layout";
import LoadingSpinner from "@/shared/ui/loading/loading-spinner";
import AllReviewList from "@/widgets/all-review-list";

export default function AllReviewPage() {
  return (
    <PageLayout
      title="원바원 | 리뷰"
      description="유치원 교사들의 근무 및 실습 리뷰를 모아볼 수 있는 페이지"
      ogImage={IMAGE_PATHS.OPEN_GRAPH}
      ogUrl={window.location.href}
      headerTitle="리뷰"
      headerType="base"
      currentPath={URL_PATHS.REVIEW}
      hasBackButton={false}
      mainBg="gray"
      mainClassName="gap-0 mt-14 mb-28"
    >
      <Suspense fallback={<LoadingSpinner />}>
        <AllReviewList />
      </Suspense>
    </PageLayout>
  );
}
