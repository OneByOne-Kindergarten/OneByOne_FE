import { useState, useEffect, useCallback } from "react";
import { URL } from "@/constants/url";
import Main from "@/components/@shared/layout/main";
import Header from "@/components/@shared/headers/header";
import Wrapper from "@/components/@shared/layout/wrapper";
import GlobalNavBar from "@/components/@shared/nav/global-nav-bar";
import CategoryNav from "@/components/@shared/nav/category-nav";
import { usePageContext } from "@/hooks/usePageContext";

export function Page({ id: propId }: { id?: string }) {
  const { urlPathname } = usePageContext();
  const [pageId, setPageId] = useState<string | undefined>(propId);

  // URL에서 ID를 추출하는 함수
  const extractIdFromUrl = useCallback((path: string) => {
    const matches = path.match(/\/school\/([^\/]+)/);
    return matches ? matches[1] : undefined;
  }, []);

  useEffect(() => {
    // props에서 ID가 없을 경우 처리
    if (!pageId) {
      const urlId = extractIdFromUrl(urlPathname);
      if (urlId) {
        setPageId(urlId);
      }
    }
  }, [pageId, urlPathname, extractIdFromUrl]);

  const safeId = pageId || extractIdFromUrl(urlPathname) || "unknown";

  // 카테고리
  const categoryItems = [
    { href: URL.SCHOOL_DETAIL.replace(":id", safeId), label: "학교정보" },
    { href: URL.SCHOOL_REVIEW_WORK.replace(":id", safeId), label: "과제리뷰" },
    {
      href: URL.SCHOOL_REVIEW_LEARNING.replace(":id", safeId),
      label: "실습리뷰",
    },
  ];

  return (
    <Wrapper bg="white">
      <GlobalNavBar currentPath={URL.SCHOOL} />
      <Header>{safeId}</Header>
      <Main bg="white">
        <CategoryNav
          id={safeId}
          items={categoryItems}
          currentPath={URL.SCHOOL_REVIEW_LEARNING.replace(":id", safeId)}
        />
        <section className="p-5 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">학교 실습 리뷰</h2>
            <div className="p-5 bg-gray-light01 rounded-lg">
              <p className="text-primary-normal02">
                실습 리뷰 콘텐츠가 추가될 예정입니다.
              </p>
            </div>
          </div>
        </section>
      </Main>
    </Wrapper>
  );
}

Page.getMetadata = (props: any) => {
  const id = props?.id || "유치원";
  return {
    title: `원바원 | ${id} 실습리뷰`,
    description: `${id} 유치원 실습 리뷰 정보`,
  };
};
