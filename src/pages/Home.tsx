import { URL } from "@/constants/url";
import { Link } from "react-router-dom";
import PageLayout from "@/components/@shared/layout/page-layout";
import Button from "@/components/@shared/buttons/button";

export default function Home() {
  return (
    <PageLayout
      title="원바원"
      description="유치원 교사들을 위한 유치원 리뷰 및 커뮤니티 서비스"
      currentPath={URL.HOME}
      isGlobalNavBar={false}
      mainClassName="my-auto flex flex-col gap-[10vh]"
      wrapperBg="white"
    >
      <section className="pt-[20vh] flex flex-col text-center gap-4 justify-center mx-auto">
        <h2>
          <strong>선생님</strong>들의 <strong>진짜 유치원 이야기</strong>
        </h2>
        <h1 className="text-3xl">원바원</h1>
      </section>
      <section className="flex flex-col gap-9 justify-center mx-auto">
        <div className="flex flex-col gap-3 ">
          <Button>KaKao로 시작하기</Button>
          <Button>Naver로 시작하기</Button>
          <Button>Apple로 시작하기</Button>
          <Button>Email로 시작하기</Button>
        </div>
        <div className="flex gap-2 text-xs">
          <p className="text-primary-dark01">아직 회원이 아니신가요?</p>
          <Link
            to={URL.SIGNUP}
            className="text-tertiary-3 font-semibold underline"
          >
            회원가입
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
