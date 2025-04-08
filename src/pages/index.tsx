import { URL_PATHS } from "@/constants/url-path";
import { SVG_PATHS, IMAGE_PATHS } from "@/constants/assets-path";
import { Link } from "react-router-dom";
import PageLayout from "@/components/@shared/layout/page-layout";
import Button from "@/components/@shared/buttons/base-button";

export default function Home() {
  return (
    <PageLayout
      title="원바원"
      description="유치원 교사들을 위한 유치원 리뷰 및 커뮤니티 서비스"
      currentPath={URL_PATHS.HOME}
      isGlobalNavBar={false}
      mainClassName="my-auto flex flex-col gap-[10vh]"
      wrapperBg="white"
    >
      <section className="pt-[20vh] flex flex-col text-center gap-4 justify-center mx-auto">
        <h2>
          <strong>선생님</strong>들의 <strong>진짜 유치원 이야기</strong>
        </h2>
        <img
          src={IMAGE_PATHS.LOGO.MAIN}
          alt="원바원 로고"
          width={89}
          height={31}
          className="mx-auto"
        />
      </section>
      <section className="flex flex-col gap-9 w-3/4 justify-center mx-auto">
        <div className="flex flex-col gap-3">
          <Button font="md" className="relative bg-[#FAE300] text-black">
            <img
              src={SVG_PATHS.OAUTH.kakao}
              width="24"
              height="24"
              className="absolute left-4"
            />
            KaKao로 시작하기
          </Button>
          <Button font="md" className="relative bg-[#20C803] text-white">
            <img
              src={SVG_PATHS.OAUTH.naver}
              width="24"
              height="24"
              className="absolute left-4"
            />
            Naver로 시작하기
          </Button>
          <Button font="md" className="relative bg-black text-white">
            <img
              src={SVG_PATHS.OAUTH.apple}
              width="24"
              height="24"
              className="absolute left-4"
            />
            Apple로 시작하기
          </Button>
          <Link to={URL_PATHS.SIGNIN}>
            <Button font="md" className="relative w-full text-black">
              <img
                src={SVG_PATHS.EMAIL}
                width="24"
                height="24"
                className="absolute left-4"
              />
              Email로 시작하기
            </Button>
          </Link>
        </div>
        <div className="flex gap-2 justify-center text-xs">
          <p className="text-primary-dark01">아직 회원이 아니신가요?</p>
          <Link
            to={URL_PATHS.SIGNUP}
            className="text-tertiary-3 font-semibold underline"
          >
            회원가입
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
