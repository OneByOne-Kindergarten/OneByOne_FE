import { Suspense } from "react";
import PageLayout from "@/components/@shared/layout/page-layout";
import AlarmList from "@/components/alarm/AlarmList";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import Button from "@/components/@shared/buttons/base-button";
import { useReadAllAlarms, useAlarms } from "@/hooks/useAlarm";
import { URL_PATHS } from "@/constants/url-path";

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
      <Suspense fallback={<LoadingSpinner type="page" />}>
        <AlarmPageContent 
          handleReadAll={handleReadAll} 
          isPending={isPending} 
        />
      </Suspense>
    </PageLayout>
  );
}

function AlarmPageContent({ 
  handleReadAll, 
  isPending 
}: { 
  handleReadAll: () => void; 
  isPending: boolean; 
}) {
  const { hasUnreadAlarms } = useAlarms();

  return (
    <>
      <div className="flex justify-end items-center p-4">
        <Button
          variant="transparent"
          size="sm"
          onClick={handleReadAll}
          disabled={isPending || !hasUnreadAlarms}
          className={`text-sm ${
            hasUnreadAlarms 
              ? "text-primary-normal01" 
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          {isPending ? "처리중..." : "모두 읽음"}
        </Button>
      </div>
      <AlarmList />
    </>
  );
} 