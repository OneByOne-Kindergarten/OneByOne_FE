import { Suspense } from "react";

import { IMAGE_PATHS } from "@/shared/constants/assets-path";
import { URL_PATHS } from "@/shared/constants/url-path";
import QueryErrorBoundary from "@/shared/ui/layout/error/QueryErrorBoundary";
import PageLayout from "@/shared/ui/layout/page-layout";
import LoadingSpinner from "@/shared/ui/loading/loading-spinner";
import AllReviewList from "@/widgets/all-review-list";

export default function AllReviewPage() {
  return (
    <PageLayout
      title="원바원 | 리뷰"
      description="유치원 교사들의 리뷰 모아보기"
      ogImage={IMAGE_PATHS.OPEN_GRAPH}
      ogUrl={window.location.href}
      headerTitle="리뷰"
      headerType="base"
      currentPath={URL_PATHS.REVIEW}
      headerHasBorder={false}
      hasBackButton={false}
      mainClassName="gap-0 mt-14 mb-28"
    >
      <Suspense fallback={<LoadingSpinner />}>
        <QueryErrorBoundary>
          <AllReviewList />
        </QueryErrorBoundary>
      </Suspense>
    </PageLayout>
  );
}
