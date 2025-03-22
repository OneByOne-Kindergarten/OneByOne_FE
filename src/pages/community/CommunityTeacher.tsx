import { URL } from "@/constants/url";
import Badge from "@/components/@shared/badge";
import Button from "@/components/@shared/buttons/button";
import CategoryNav from "@/components/@shared/nav/category-nav";
import PageLayout from "@/components/@shared/layout/page-layout";

export default function CommunityTeacher() {
  const categoryOptions = [
    { href: URL.COMMUNITY_TEACHER, label: "교사" },
    { href: URL.COMMUNITY_STUDENT, label: "예비교사" },
  ];

  return (
    <PageLayout
      title="원바원 | 교사 커뮤니티"
      description="유치원 교사 커뮤니티"
      headerTitle="커뮤니티"
      currentPath={URL.COMMUNITY_TEACHER}
    >
      <CategoryNav
        options={categoryOptions}
        currentPath={URL.COMMUNITY_TEACHER}
      />
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
    </PageLayout>
  );
}
