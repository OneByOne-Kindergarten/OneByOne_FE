import { Suspense } from "react";

import { URL_PATHS } from "@/common/constants/url-path";
import PageLayout from "@/common/ui/layout/page-layout";
import LoadingSpinner from "@/common/ui/loading/loading-spinner";
import NoticeList from "@/widgets/noticeList";

export default function NoticePage() {
  return (
    <PageLayout
      title="원바원 | 공지사항"
      description="공지사항 목록"
      headerTitle="공지사항"
      currentPath={URL_PATHS.USER}
      hasBackButton={true}
      wrapperBg="white"
      mainClassName="px-5 py-2.5 mt-14"
    >
      <Suspense fallback={<LoadingSpinner />}>
        <NoticeList />
      </Suspense>
    </PageLayout>
  );
}
