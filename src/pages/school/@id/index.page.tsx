import { URL } from "@/constants/url";
import { SVG_PATHS } from "@/constants/assets-path";
import Main from "@/components/@shared/layout/main";
import Header from "@/components/@shared/headers/header";
import Wrapper from "@/components/@shared/layout/wrapper";
import GlobalNavBar from "@/components/@shared/nav/global-nav-bar";
import CategoryNav from "@/components/@shared/nav/category-nav";
import SchoolInfoItem from "@/components/school/school-info-item";
import SchoolInfoChart from "@/components/school/school-info-chart";

export function Page({ id }: { id: string }) {
  // mockData
  const schoolData = {
    address: "서울특별시 강남구 테헤란로 123",
    bossName: "홍길동",
    establishmentType: "사립",
    establishmentDate: "2010년 03월 01일",
    openDate: "2010년 03월 15일",
    operationHours: "08:00 ~ 18:00",
    homepage: "https://example.com",
    classes: {
      total: 9,
      stats: [
        { age: 3, count: 3, percent: "33%", color: "bg-star" },
        { age: 4, count: 3, percent: "33%", color: "bg-green" },
        { age: 5, count: 3, percent: "33%", color: "bg-tertiary-3" },
      ],
    },
    students: {
      total: 180,
      stats: [
        { age: 3, count: 60, percent: "33%", color: "bg-star" },
        { age: 4, count: 60, percent: "33%", color: "bg-green" },
        { age: 5, count: 60, percent: "33%", color: "bg-tertiary-3" },
      ],
    },
  };

  // 카테고리
  const categoryItems = [
    { href: URL.SCHOOL_DETAIL.replace(":id", id), label: "기관정보" },
    { href: URL.SCHOOL_REVIEW_WORK.replace(":id", id), label: "근무리뷰" },
    { href: URL.SCHOOL_REVIEW_LEARNING.replace(":id", id), label: "실습리뷰" },
  ];

  return (
    <Wrapper bg="white">
      <Header>{id}</Header>
      <Main bg="white">
        <CategoryNav
          id={id}
          items={categoryItems}
          currentPath={URL.SCHOOL_DETAIL.replace(":id", id)}
        />
        <section className="px-5 pt-3 pb-20">
          <h1 className="text-xl font-bold mb-3 text-primary-dark02">{id}</h1>
          <div className="flex flex-col gap-7">
            <div className="w-full h-52 bg-primary-normal01 rounded-lg">
              images
            </div>
            <ul className="flex flex-col flex-1 gap-7">
              <div className="flex flex-col gap-1.5">
                <SchoolInfoItem
                  icon={SVG_PATHS.LOCATION}
                  title="위치정보"
                  altText="위치 아이콘"
                >
                  <p className="text-base font-semibold text-primary-dark02">
                    {schoolData.address}
                  </p>
                </SchoolInfoItem>
                <div className="bg-primary-normal01 h-40 rounded-md">map</div>
              </div>

              <SchoolInfoItem
                icon={SVG_PATHS.BOSS}
                title="원장"
                altText="원장 아이콘"
              >
                {schoolData.bossName}
              </SchoolInfoItem>

              <SchoolInfoItem
                icon={SVG_PATHS.BUILDING}
                title="설립"
                altText="건물 아이콘"
              >
                <div className="flex flex-col gap-3">
                  <p className="text-base font-semibold text-primary-dark02">
                    {schoolData.establishmentType}
                  </p>
                  <div className="flex flex-col">
                    <p>
                      설립 <span>{schoolData.establishmentDate}</span>
                    </p>
                    <p>
                      개원 <span>{schoolData.openDate}</span>
                    </p>
                  </div>
                </div>
              </SchoolInfoItem>

              <SchoolInfoItem
                icon={SVG_PATHS.CLOCK}
                title="운영시간"
                altText="시계 아이콘"
              >
                {schoolData.operationHours}
              </SchoolInfoItem>

              <SchoolInfoChart
                title="학급"
                totalCount={schoolData.classes.total}
                unit="class"
                stats={schoolData.classes.stats}
              />

              <SchoolInfoChart
                title="원생"
                totalCount={schoolData.students.total}
                unit="student"
                stats={schoolData.students.stats}
              />

              <SchoolInfoItem
                icon={SVG_PATHS.HOME}
                title="링크"
                altText="홈 아이콘"
              >
                <a
                  href={schoolData.homepage}
                  className="text-primary-dark02 font-semibold hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {schoolData.homepage}
                </a>
              </SchoolInfoItem>
            </ul>
          </div>
        </section>
      </Main>
      <GlobalNavBar currentPath={URL.SCHOOL} />
    </Wrapper>
  );
}

Page.getMetadata = (props: any) => {
  const id = props?.id || "유치원";
  return {
    title: `원바원 | ${id} 상세정보`,
    description: `${id} 유치원 상세 정보`,
  };
};
