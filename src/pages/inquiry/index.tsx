import { useAtomValue } from "jotai";

import PageLayout from "@/components/@shared/layout/page-layout";
import MenuItem from "@/components/user/MenuItem";
import { URL_PATHS } from "@/constants/url-path";
import { SVG_PATHS } from "@/constants/assets-path";
import { userAtom } from "@/stores/userStore";

export default function InquiryPage() {
  const user = useAtomValue(userAtom);

  return (
    <PageLayout
      title="원바원 | 문의"
      description="사용자 문의사항 목록"
      headerTitle="문의"
      currentPath={URL_PATHS.USER}
      hasBackButton={true}
      mainBg="gray"
    >
      <section className="flex flex-col gap-4 bg-white p-5 font-bold">
        <menu className="flex flex-col gap-6 text-primary-dark01">
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
