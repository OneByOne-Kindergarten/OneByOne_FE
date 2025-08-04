import Empty from "@/components/@shared/layout/empty";
import Error from "@/components/@shared/layout/error";
import PageLayout from "@/components/@shared/layout/page-layout";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import BlockedUserList from "@/components/user/BlockedUserList";
import { URL_PATHS } from "@/constants/url-path";
import { useBlock } from "@/hooks/useBlock";

export default function BlockPage() {
  const { useGetBlockedUsers } = useBlock();
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
