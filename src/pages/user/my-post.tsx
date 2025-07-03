import { Suspense } from "react";

import PageLayout from "@/components/@shared/layout/page-layout";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import MyPostList from "@/components/user/MyPostList";
import { URL_PATHS } from "@/constants/url-path";

export default function MyPostPage() {
  return (
    <PageLayout
      title="원바원 | 작성한 리뷰 관리"
      description="작성한 리뷰 관리"
      headerTitle="작성한 리뷰 관리"
      currentPath={URL_PATHS.USER}
      wrapperBg="white"
      mainClassName="p-5 mt-14"
    >
      <Suspense fallback={<LoadingSpinner />}>
        <MyPostList />
      </Suspense>
    </PageLayout>
  );
}
