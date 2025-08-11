import { useAtom } from "jotai";
import { Link } from "react-router-dom";

import { userAtom } from "@/entities/auth/model";
import ProfileDetail from "@/features/user-profile/ProfileDetail";
import ProfileImage from "@/features/user-profile/ProfileImage";
import { SVG_PATHS } from "@/shared/constants/assets-path";
import { URL_PATHS } from "@/shared/constants/url-path";
import PageLayout from "@/shared/ui/layout/page-layout";
import MenuItem from "@/widgets/user-dashboard/ui/MenuItem";

export default function User() {
  const [user] = useAtom(userAtom);

  return (
    <PageLayout
      title="원바원 | 프로필"
      description="사용자 프로필 및 설정"
      headerLogo={true}
      currentPath={URL_PATHS.USER}
      mainBg="gray"
      hasBackButton={false}
      mainClassName="flex flex-col gap-0 pb-5 mt-14 mb-24"
      showAlarmButton={true}
    >
      {/* 유저 프로필 */}
      <section className="flex flex-col">
        <div className="flex w-full items-center justify-between bg-white px-5 py-4">
          <div className="flex items-center gap-7">
            <ProfileImage role={user?.role} />
            <ProfileDetail user={user} />
          </div>
          <Link
            to={URL_PATHS.USER_PROFILE}
            className="duration-200 active:brightness-75"
          >
            <img
              src={SVG_PATHS.ARROW.right}
              alt="오른쪽 방향 화살표 아이콘"
              width="20"
              height="20"
            />
          </Link>
        </div>
        {/* <CertificationBanner /> */}
      </section>

      <div className="mt-2 flex flex-col gap-2">
        <section className="flex flex-col gap-4 bg-white p-5 font-bold">
          <h2 className="text-primary-dark02">내 설정</h2>
          <menu className="flex flex-col gap-6 text-primary-dark01">
            <MenuItem
              iconPath={SVG_PATHS.POST.edit}
              iconAlt="게시물 관리 아이콘"
              to={URL_PATHS.USER_POST}
              label="작성한 리뷰 관리"
            />
            <MenuItem
              iconPath={SVG_PATHS.SETTING}
              iconAlt="설정 아이콘"
              to={URL_PATHS.USER_ACCOUNT_SETTING}
              label="계정 설정"
            />
            <MenuItem
              iconPath={SVG_PATHS.ALARM}
              iconAlt="알림 아이콘"
              to={URL_PATHS.ALARM_SETTING}
              label="알림 설정"
            />
            <MenuItem
              iconPath={SVG_PATHS.LEAVE}
              iconAlt="차단 아이콘"
              to={URL_PATHS.BLOCK}
              label="차단 설정"
            />
          </menu>
        </section>

        <section className="flex flex-col gap-4 bg-white p-5 font-bold">
          <h2 className="text-primary-dark02">서비스 안내 · 문의</h2>
          <menu className="flex flex-col gap-6 text-primary-dark01">
            <MenuItem
              iconPath={SVG_PATHS.DOCUMENT}
              iconAlt="문서 아이콘"
              to={URL_PATHS.NOTICE}
              label="공지사항"
            />
            <MenuItem
              iconPath={SVG_PATHS.INQUIRY}
              iconAlt="설정 아이콘"
              to={URL_PATHS.INQUIRY}
              label="문의"
            />
            <MenuItem
              iconPath={SVG_PATHS.POLICY}
              iconAlt="설정 아이콘"
              to="https://abounding-leather-799.notion.site/229a1b804ebf80d9968addf0c2733f36?source=copy_link"
              label="운영 정책"
            />
          </menu>
        </section>
      </div>
    </PageLayout>
  );
}
