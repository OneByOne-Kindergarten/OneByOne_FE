import { URL } from "@/constants/url";
import Button from "@/components/@shared/buttons/button";
import Main from "@/components/@shared/layout/main";
import Header from "@/components/@shared/headers/header";
import Wrapper from "@/components/@shared/layout/wrapper";
import GlobalNavBar from "@/components/@shared/nav/global-nav-bar";
import SchoolCard from "@/components/school/school-card";

export function Page() {
  return (
    <Wrapper>
      <Header>기관 찾기</Header>
      <Main>
        <section className="p-5 flex flex-col gap-3">
          <div className="bg-primary-normal01 h-52 rounded-md text-primary-normal02">
            <span>현재 위치</span>
          </div>
          <Button size="lg">지도에서 유치원 찾기</Button>
        </section>
        <section className="flex flex-col gap-3">
          <h2 className="font-bold text-lg flex flex-col gap-3 px-5">
            주변 유치원
          </h2>
          <ul className="flex flex-col gap-2 pb-5">
            <SchoolCard />
            <SchoolCard />
          </ul>
        </section>
      </Main>
      <GlobalNavBar currentPath={URL.SCHOOL} />
    </Wrapper>
  );
}

Page.getMetadata = () => {
  return {
    title: "원바원 | 기관 찾기",
    description: "지도와 검색을 통해 기관 찾기",
  };
};
