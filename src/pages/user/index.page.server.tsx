import { URL } from "@/constants/url";
import { SVG_PATHS } from "@/constants/assets-path";

import Main from "@/components/@shared/layout/main";
import Header from "@/components/@shared/headers/header";
import Wrapper from "@/components/@shared/layout/wrapper";
import GlobalNavBar from "@/components/@shared/nav/global-nav-bar";

import Button from "@/components/@shared/buttons/button";

export function Page() {
  return (
    <Wrapper>
      <Header>프로필</Header>
      <Main className="flex flex-col gap-10">
        <div>
          <section className="flex flex-col">
            <div className="flex items-center gap-7 bg-white pl-5 w-full py-4">
              <div className="w-20 h-20 bg-primary-normal01 rounded-full" />
              <div className="flex flex-col gap-1">
                <h2 className="font-bold text-lg text-primary-dark02">
                  userName
                </h2>
                <p className="font-semibold text-xs text-primary-normal03">
                  userEmail
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between bg-tertiary-2 rounded-lg my-2 mx-3 px-5 py-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary-normal01" />
                <p className="font-semibold text-sm text-primary-dark01">
                  아직 교사 인증을 하지 않았어요!
                </p>
              </div>
              <Button size="md">인증하기</Button>
            </div>
          </section>

          <div className="flex flex-col gap-2">
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
                    작성한 리뷰 관리
                  </div>
                  <a href="?post">
                    <img
                      src={SVG_PATHS.ARROW.right}
                      alt="오른쪽 방향 화살표 아이콘"
                      width="20"
                      height="20"
                    />
                  </a>
                </li>
                <li className="flex items-center flex-1 justify-between">
                  <div className="flex items-center gap-5">
                    <img
                      src={SVG_PATHS.SETTING}
                      alt="설정 아이콘"
                      width="20"
                      height="20"
                    />
                    계정 설정
                  </div>
                  <a href="?account">
                    <img
                      src={SVG_PATHS.ARROW.right}
                      alt="오른쪽 방향 화살표 아이콘"
                      width="20"
                      height="20"
                    />
                  </a>
                </li>
                <li className="flex items-center flex-1 justify-between">
                  <div className="flex items-center gap-5">
                    <img
                      src={SVG_PATHS.ALARM}
                      alt="알림 아이콘"
                      width="20"
                      height="20"
                    />
                    알림 설정
                  </div>
                  <a href="?alarm">
                    <img
                      src={SVG_PATHS.ARROW.right}
                      alt="오른쪽 방향 화살표 아이콘"
                      width="20"
                      height="20"
                    />
                  </a>
                </li>
              </menu>
            </section>
            <section className="flex flex-col gap-4 p-5 font-bold bg-white">
              <h2 className="text-primary-dark02">서비스 안내 · 문의</h2>
              <menu className="text-primary-dark01 flex flex-col gap-6">
                <li className="flex items-center flex-1 justify-between">
                  <div className="flex items-center gap-5">
                    <img
                      src={SVG_PATHS.INQUIRY}
                      alt="설정 아이콘"
                      width="20"
                      height="20"
                    />
                    문의
                  </div>
                  <a href="?inquiry">
                    <img
                      src={SVG_PATHS.ARROW.right}
                      alt="오른쪽 방향 화살표 아이콘"
                      width="20"
                      height="20"
                    />
                  </a>
                </li>
                <li className="flex items-center flex-1 justify-between">
                  <div className="flex items-center gap-5">
                    <img
                      src={SVG_PATHS.POLICY}
                      alt="설정 아이콘"
                      width="20"
                      height="20"
                    />
                    운영 정책
                  </div>
                  <a href="?policy">
                    <img
                      src={SVG_PATHS.ARROW.right}
                      alt="오른쪽 방향 화살표 아이콘"
                      width="20"
                      height="20"
                    />
                  </a>
                </li>
              </menu>
            </section>
          </div>
        </div>

        <div className="mx-5 mb-16">
          <Button size="lg" variant="primary">
            로그아웃
          </Button>
        </div>
      </Main>
      <GlobalNavBar currentPath={URL.USER} />
    </Wrapper>
  );
}

Page.getMetadata = () => {
  return {
    title: "원바원 | 마이페이지",
    description: "기본 정보 설정 및 프로필 관리",
  };
};
