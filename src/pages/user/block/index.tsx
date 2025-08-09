import { URL_PATHS } from "@/common/constants/url-path";
import Empty from "@/common/ui/layout/empty";
import Error from "@/common/ui/layout/error";
import PageLayout from "@/common/ui/layout/page-layout";
import LoadingSpinner from "@/common/ui/loading/loading-spinner";
import { useGetBlockedUsers } from "@/entities/block/hooks";
import BlockedUserList from "@/features/user/BlockedUserList";

export default function BlockPage() {
  const { data, isLoading, error } = useGetBlockedUsers();

  const blockedUsers = data?.data || [];

  return (
    <PageLayout
      title="원바원 | 차단 설정"
      description="차단한 유저 관리"
      headerTitle="차단 설정"
      currentPath={URL_PATHS.USER}
      hasBackButton={true}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : data ? (
        <>
          {blockedUsers.length === 0 ? (
            <Empty type="page" title="차단한 사용자가 없습니다." />
          ) : (
            <BlockedUserList blockedUsers={blockedUsers} />
          )}
        </>
      ) : (
        <Error type="page">{error?.message}</Error>
      )}
    </PageLayout>
  );
}
