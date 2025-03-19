import { URL } from "@/constants/url";

import Main from "@/components/@shared/layout/main";
import Header from "@/components/@shared/headers/header";
import Wrapper from "@/components/@shared/layout/wrapper";
import GlobalNavBar from "@/components/@shared/nav/global-nav-bar";
import SchoolCard from "@/components/school/school-card";

export function Page() {
  return (
    <Wrapper>
      <Header>즐겨찾기</Header>
      <Main>
        <ul className="flex flex-col gap-2 my-3">
          <SchoolCard />
          <SchoolCard />
        </ul>
      </Main>
      <GlobalNavBar currentPath={URL.BOOKMARKS} />
    </Wrapper>
  );
}

Page.getMetadata = () => {
  return {
    title: "원바원 | 즐겨찾기",
    description: "즐겨찾기한 유치원 목록",
  };
};
