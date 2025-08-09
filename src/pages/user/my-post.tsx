import { Suspense } from "react";

import { URL_PATHS } from "@/common/constants/url-path";
import PageLayout from "@/common/ui/layout/page-layout";
import LoadingSpinner from "@/common/ui/loading/loading-spinner";
import MyPostList from "@/features/user/MyPostList";

export default function MyPostPage() {
  return (
    <PageLayout
      title="원바원 | 작성한 리뷰 관리"
      description="작성한 리뷰 관리"
      headerTitle="작성한 리뷰 관리"
      currentPath={URL_PATHS.USER_POST}
      wrapperBg="white"
      mainClassName="mt-14"
    >
      <Suspense fallback={<LoadingSpinner />}>
        <MyPostList />
      </Suspense>
    </PageLayout>
  );
}
