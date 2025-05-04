import { Suspense } from "react";

import PageLayout from "@/components/@shared/layout/page-layout";
import NoticeList from "@/components/notice/NoticeList";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import { URL_PATHS } from "@/constants/url-path";

export default function NoticePage() {
  return (
    <PageLayout
      title="원바원 | 공지사항"
      description="공지사항 목록"
      headerTitle="공지사항"
      currentPath={URL_PATHS.USER}
      hasBackButton={true}
      wrapperBg="white"
      mainClassName="px-5 py-2.5"
    >
      <Suspense fallback={<LoadingSpinner type="page" />}>
        <NoticeList />
      </Suspense>
    </PageLayout>
  );
}
