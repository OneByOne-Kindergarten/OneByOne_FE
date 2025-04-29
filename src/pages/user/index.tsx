import { useAtom } from "jotai";
import { userAtom } from "@/stores/userStore";
import { Link, useNavigate } from "react-router-dom";

import PageLayout from "@/components/@shared/layout/page-layout";
import Button from "@/components/@shared/buttons/base-button";
import ProfileImage from "@/components/user/ProfileImage";
import ProfileDetail from "@/components/user/ProfileDetail";

import { URL_PATHS } from "@/constants/url-path";
import { SVG_PATHS, IMAGE_PATHS } from "@/constants/assets-path";

export default function User() {
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();

  return (
    <PageLayout
      title="원바원 | 프로필"
      description="사용자 프로필 및 설정"
      headerTitle="프로필"
      currentPath={URL_PATHS.USER}
      mainBg="gray"
      hasBackButton={false}
      mainClassName="flex flex-col gap-0 pb-5 mb-24"
    >
      <section className="flex flex-col">
        {/* 사용자 프로필 */}
        <div className="flex items-center justify-between bg-white px-5 w-full py-4">
          <div className="flex items-center gap-7">
            <ProfileImage profileImageUrl={user?.profileImageUrl} />
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

        {/* 교사 인증 배너 */}
        <div className="flex items-center justify-between bg-secondary-light02 rounded-lg my-2 mx-3 px-5 py-4 shadow-sm">
          <div className="flex items-center gap-2 ">
            <img
              src={IMAGE_PATHS.CERTIFICATION}
              alt="서류 인증 이미지"
              width={43}
              height={40}
            />
            <p className="text-sm text-primary-dark01">
              <strong>교사 인증하면</strong> <br />
              <span className="text-xs">
                인증된 교사의 혜택을 받을 수 있어요!
              </span>
            </p>
          </div>
          <Button variant="primary" size="lg">
            인증하기
          </Button>
        </div>
      </section>

      <div className="flex flex-col gap-2">
        {/* 내 설정  */}
        <section className="flex flex-col gap-4 p-5 font-bold bg-white">
          <h2 className="text-primary-dark02">내 설정</h2>
          <menu className="text-primary-dark01 flex flex-col gap-6">
            <li className="flex items-center flex-1 justify-between">
              <div className="flex items-center gap-5">
                <img
                  src={SVG_PATHS.POST.edit}
                  alt="게시물 관리 아이콘"
                  width="20"
                  height="20"
                />
                <span>작성한 리뷰 관리</span>
              </div>
              <Link to="?post">
                <img
                  src={SVG_PATHS.ARROW.right}
                  alt="오른쪽 방향 화살표 아이콘"
                  width="20"
                  height="20"
                />
              </Link>
            </li>
            <li className="flex items-center flex-1 justify-between">
              <div className="flex items-center gap-5">
                <img
                  src={SVG_PATHS.SETTING}
                  alt="설정 아이콘"
                  width="20"
                  height="20"
                />
                <span>계정 설정</span>
              </div>
              <Link to={URL_PATHS.USER_ACCOUNT_SETTING}>
                <img
                  src={SVG_PATHS.ARROW.right}
                  alt="오른쪽 방향 화살표 아이콘"
                  width="20"
                  height="20"
                />
              </Link>
            </li>
            <li className="flex items-center flex-1 justify-between">
              <div className="flex items-center gap-5">
                <img
                  src={SVG_PATHS.ALARM}
                  alt="알림 아이콘"
                  width="20"
                  height="20"
                />
                <span>알림 설정</span>
              </div>
              <Link to="?alarm">
                <img
                  src={SVG_PATHS.ARROW.right}
                  alt="오른쪽 방향 화살표 아이콘"
                  width="20"
                  height="20"
                />
              </Link>
            </li>
          </menu>
        </section>

        {/* 서비스 안내 · 문의 */}
        <section className="flex flex-col gap-4 p-5 font-bold bg-white">
          <h2 className="text-primary-dark02">서비스 안내 · 문의</h2>
          <menu className="text-primary-dark01 flex flex-col gap-6">
            <li className="flex items-center flex-1 justify-between">
              <div className="flex items-center gap-5">
                <img
                  src={SVG_PATHS.DOCUMENT}
                  alt="문서 아이콘"
                  width="20"
                  height="20"
                />
                <span>공지사항</span>
              </div>
              <Link to="?notice">
                <img
                  src={SVG_PATHS.ARROW.right}
                  alt="오른쪽 방향 화살표 아이콘"
                  width="20"
                  height="20"
                />
              </Link>
            </li>
            <li className="flex items-center flex-1 justify-between">
              <div className="flex items-center gap-5">
                <img
                  src={SVG_PATHS.INQUIRY}
                  alt="설정 아이콘"
                  width="20"
                  height="20"
                />
                <span>문의</span>
              </div>
              <Link to="?inquiry">
                <img
                  src={SVG_PATHS.ARROW.right}
                  alt="오른쪽 방향 화살표 아이콘"
                  width="20"
                  height="20"
                />
              </Link>
            </li>
            <li className="flex items-center flex-1 justify-between">
              <div className="flex items-center gap-5">
                <img
                  src={SVG_PATHS.POLICY}
                  alt="설정 아이콘"
                  width="20"
                  height="20"
                />
                <span>운영 정책</span>
              </div>
              <Link to="?policy">
                <img
                  src={SVG_PATHS.ARROW.right}
                  alt="오른쪽 방향 화살표 아이콘"
                  width="20"
                  height="20"
                />
              </Link>
            </li>
          </menu>
        </section>
      </div>
    </PageLayout>
  );
}
