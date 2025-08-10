import { lazy, Suspense } from "react";

import { useAlarms, useReadAllAlarms } from "@/entities/alarm/hooks";
import { URL_PATHS } from "@/shared/constants/url-path";
import Button from "@/shared/ui/buttons/base-button";
import PageLayout from "@/shared/ui/layout/page-layout";
import LoadingSpinner from "@/shared/ui/loading/loading-spinner";

const AlarmList = lazy(() => import("@/widgets/content-list/alarm-list"));

export default function AlarmPage() {
  const { mutate: readAllAlarms, isPending } = useReadAllAlarms();

  const handleReadAll = () => {
    readAllAlarms();
  };

  return (
    <PageLayout
      title="원바원 | 알림함"
      description="알림 목록"
      headerTitle="알림함"
      currentPath={URL_PATHS.USER}
      hasBackButton={true}
      wrapperBg="white"
      mainClassName="mt-14"
    >
      <Suspense fallback={<LoadingSpinner />}>
        <AlarmPageContent handleReadAll={handleReadAll} isPending={isPending} />
      </Suspense>
    </PageLayout>
  );
}

function AlarmPageContent({
  handleReadAll,
  isPending,
}: {
  handleReadAll: () => void;
  isPending: boolean;
}) {
  const { hasUnreadAlarms } = useAlarms();

  return (
    <>
      <div className="flex items-center justify-end p-4">
        <Button
          variant="transparent"
          size="sm"
          onClick={handleReadAll}
          disabled={isPending || !hasUnreadAlarms}
          className={`text-sm ${
            hasUnreadAlarms
              ? "text-primary-normal01"
              : "cursor-not-allowed text-gray-400"
          }`}
        >
          {isPending ? "처리중..." : "모두 읽음"}
        </Button>
      </div>
      <AlarmList />
    </>
  );
}
