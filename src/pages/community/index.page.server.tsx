import { URL } from "@/constants/url";

import Main from "@/components/@shared/layout/main";
import Header from "@/components/@shared/headers/header";
import Wrapper from "@/components/@shared/layout/wrapper";
import GlobalNavBar from "@/components/@shared/nav/global-nav-bar";
import CategoryNav from "@/components/@shared/nav/category-nav";
import Badge from "@/components/@shared/badge";
import Button from "@/components/@shared/buttons/button";

export function Page() {
  // 카테고리
  const categoryItems = [
    { href: URL.COMMUNITY, label: "교사" },
    { href: URL.COMMUNITY_STUDENT, label: "예비교사" },
  ];

  return (
    <Wrapper bg="gray">
      <Header>커뮤니티</Header>
      <Main bg="white" className="flex flex-col gap-6 pb-5 mb-32">
        <CategoryNav items={categoryItems} currentPath={URL.COMMUNITY} />
        <div className="px-5 flex flex-col gap-9">
          <menu className="flex gap-2 w-full overflow-x-auto scrollbar-x-hidden whitespace-nowrap">
            <Button shape="full">Top 10</Button>
            <Button shape="full">전체</Button>
            <Button shape="full">자유</Button>
            <Button shape="full">월급/취업</Button>
            <Button shape="full">수업/환경구성</Button>
            <Button shape="full">유아지도</Button>
          </menu>
          <section className="flex flex-col gap-9">
            <div>
              <h2 className="font-semibold text-lg">실시간 인기 게시글</h2>
            </div>
            <ul className="font-semibold text-primary-dark01 flex flex-col gap-5">
              <li className="flex items-center gap-3 flex-1 pb-4 border-b">
                <span>1</span>
                <div className="flex flex-col gap-1.5 flex-1">
                  <Badge variant="secondary">category</Badge>
                  <p>title</p>
                </div>
              </li>
              <li className="flex items-center gap-3 flex-1 pb-4 border-b">
                <span>2</span>
                <div className="flex flex-col gap-1.5 flex-1">
                  <Badge variant="secondary">category</Badge>
                  <p>title</p>
                </div>
              </li>
              <li className="flex items-center gap-3 flex-1 pb-4 border-b">
                <span>3</span>
                <div className="flex flex-col gap-1.5 flex-1">
                  <Badge variant="secondary">category</Badge>
                  <p>title</p>
                </div>
              </li>
              <li className="flex items-center gap-3 flex-1 pb-4 border-b">
                <span>4</span>
                <div className="flex flex-col gap-1.5 flex-1">
                  <Badge variant="secondary">category</Badge>
                  <p>title</p>
                </div>
              </li>
              <li className="flex items-center gap-3 flex-1 pb-4 border-b">
                <span>5</span>
                <div className="flex flex-col gap-1.5 flex-1">
                  <Badge variant="secondary">category</Badge>
                  <p>title</p>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </Main>
      <GlobalNavBar currentPath={URL.COMMUNITY} />
    </Wrapper>
  );
}

Page.getMetadata = () => {
  return {
    title: "원바원 | 커뮤니티",
    description: "유치원 교사와 예비 교사들의 커뮤니티",
  };
};
