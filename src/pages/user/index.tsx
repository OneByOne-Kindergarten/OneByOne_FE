import { useAtom } from "jotai";
import { userAtom } from "@/stores/userStore";
import { Link } from "react-router-dom";

import PageLayout from "@/components/@shared/layout/page-layout";
import ProfileImage from "@/components/user/ProfileImage";
import ProfileDetail from "@/components/user/ProfileDetail";
import MenuItem from "@/components/user/MenuItem";
import CertificationBanner from "@/components/user/CertificationBanner";

import { URL_PATHS } from "@/constants/url-path";
import { SVG_PATHS } from "@/constants/assets-path";

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
    >
      {/* 유저 프로필 */}
      <section className="flex flex-col">
        <div className="flex items-center justify-between bg-white px-5 w-full py-4">
          <div className="flex items-center gap-7">
            <ProfileImage role={user?.role} />
            <ProfileDetail user={user} />
          </div>
          <Link to={URL_PATHS.USER_PROFILE_EDITOR}>
            <img
              src={SVG_PATHS.ARROW.right}
              alt="오른쪽 방향 화살표 아이콘"
              width="20"
              height="20"
            />
          </Link>
        </div>
        <CertificationBanner />
      </section>

      <div className="flex flex-col gap-2">
        <section className="flex flex-col gap-4 p-5 font-bold bg-white">
          <h2 className="text-primary-dark02">내 설정</h2>
          <menu className="text-primary-dark01 flex flex-col gap-6">
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
              to="?alarm"
              label="알림 설정"
            />
          </menu>
        </section>

        <section className="flex flex-col gap-4 p-5 font-bold bg-white">
          <h2 className="text-primary-dark02">서비스 안내 · 문의</h2>
          <menu className="text-primary-dark01 flex flex-col gap-6">
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
              to="?policy"
              label="운영 정책"
            />
          </menu>
        </section>
      </div>
    </PageLayout>
  );
}
