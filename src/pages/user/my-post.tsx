import { Suspense } from "react";

import MyPostList from "@/features/user/MyPostList";
import { URL_PATHS } from "@/shared/constants/url-path";
import PageLayout from "@/shared/ui/layout/page-layout";
import LoadingSpinner from "@/shared/ui/loading/loading-spinner";

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
