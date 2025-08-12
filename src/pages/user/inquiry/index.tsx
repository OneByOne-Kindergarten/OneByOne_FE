import { useAtomValue } from "jotai";

import { userAtom } from "@/entities/auth/model";
import { SVG_PATHS } from "@/shared/constants/assets-path";
import { URL_PATHS } from "@/shared/constants/url-path";
import PageLayout from "@/shared/ui/layout/page-layout";
import MenuItem from "@/widgets/user-dashboard/ui/MenuItem";

export default function InquiryPage() {
  const user = useAtomValue(userAtom);

  return (
    <PageLayout
      title="원바원 | 문의"
      description="사용자 문의사항 목록"
      headerTitle="문의"
      currentPath={URL_PATHS.USER}
      hasBackButton={true}
      mainBg="white"
      isGlobalNavBar={false}
    >
      <section className="flex flex-col gap-4 px-5 pt-5">
        <menu className="flex flex-col gap-6 font-bold text-primary-dark01">
          {user?.role === "ADMIN" && (
            <MenuItem
              iconPath={SVG_PATHS.QUESTION.GLOBAL}
              to={URL_PATHS.INQUIRY_PUBLIC}
              iconAlt="글로벌 아이콘"
              label="문의 내역 관리"
            />
          )}
          <MenuItem
            iconPath={SVG_PATHS.LOGOUT}
            to={URL_PATHS.INQUIRY_EDITOR}
            iconAlt="유저 아이콘"
            label="1:1 문의하기"
          />
          <MenuItem
            iconPath={SVG_PATHS.QUESTION.BALLOON}
            to={URL_PATHS.INQUIRY_MY}
            iconAlt="질문 풍선 아이콘"
            label="문의 내역"
          />
        </menu>
      </section>
    </PageLayout>
  );
}
