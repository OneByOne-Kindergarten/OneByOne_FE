import { useParams } from "react-router-dom";
import { URL } from "@/constants/url";
import { SVG_PATHS } from "@/constants/assets-path";
import { REVIEW_TYPES } from "@/constants/review";
import PageLayout from "@/components/@shared/layout/page-layout";
import NavBar from "@/components/@shared/nav/nav-bar";
import SchoolInfoItem from "@/components/school/school-info-item";
import SchoolInfoChart from "@/components/school/school-info-chart";

export default function SchoolDetail() {
  const { id } = useParams<{ id: string }>();
  const safeId = id || "unknown";

  const CATEGORY_OPTIONS = [
    { href: `/school/${safeId}`, label: "기관정보" },
    {
      href: `/school/${safeId}/review?type=${REVIEW_TYPES.WORK}`,
      label: "근무리뷰",
    },
    {
      href: `/school/${safeId}/review?type=${REVIEW_TYPES.LEARNING}`,
      label: "실습리뷰",
    },
  ];

  const SCHOOL_DETAIL_INFO = {
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

  return (
    <PageLayout
      title={`원바원 | ${safeId} 상세정보`}
      description={`${safeId} 유치원 상세 정보`}
      headerTitle={`${safeId}`}
      currentPath={URL.SCHOOL_DETAIL.replace(":id", safeId)}
      wrapperBg="white"
    >
      <NavBar
        id={safeId}
        options={CATEGORY_OPTIONS}
        currentPath={URL.SCHOOL_DETAIL.replace(":id", safeId)}
      />
      <section className="px-5 pt-3 pb-20">
        <h1 className="text-xl font-bold mb-3 text-primary-dark02">{safeId}</h1>
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
                  {SCHOOL_DETAIL_INFO.address}
                </p>
              </SchoolInfoItem>
              <div className="bg-primary-normal01 h-40 rounded-md">map</div>
            </div>

            <SchoolInfoItem
              icon={SVG_PATHS.BOSS}
              title="원장"
              altText="원장 아이콘"
            >
              {SCHOOL_DETAIL_INFO.bossName}
            </SchoolInfoItem>

            <SchoolInfoItem
              icon={SVG_PATHS.BUILDING}
              title="설립"
              altText="건물 아이콘"
            >
              <div className="flex flex-col gap-3">
                <p className="text-base font-semibold text-primary-dark02">
                  {SCHOOL_DETAIL_INFO.establishmentType}
                </p>
                <div className="flex flex-col">
                  <p>
                    설립 <span>{SCHOOL_DETAIL_INFO.establishmentDate}</span>
                  </p>
                  <p>
                    개원 <span>{SCHOOL_DETAIL_INFO.openDate}</span>
                  </p>
                </div>
              </div>
            </SchoolInfoItem>

            <SchoolInfoItem
              icon={SVG_PATHS.CLOCK}
              title="운영시간"
              altText="시계 아이콘"
            >
              {SCHOOL_DETAIL_INFO.operationHours}
            </SchoolInfoItem>

            <SchoolInfoChart
              title="학급"
              totalCount={SCHOOL_DETAIL_INFO.classes.total}
              unit="class"
              stats={SCHOOL_DETAIL_INFO.classes.stats}
            />

            <SchoolInfoChart
              title="원생"
              totalCount={SCHOOL_DETAIL_INFO.students.total}
              unit="student"
              stats={SCHOOL_DETAIL_INFO.students.stats}
            />

            <SchoolInfoItem
              icon={SVG_PATHS.HOME}
              title="링크"
              altText="홈 아이콘"
            >
              <a
                href={SCHOOL_DETAIL_INFO.homepage}
                className="text-primary-dark02 font-semibold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {SCHOOL_DETAIL_INFO.homepage}
              </a>
            </SchoolInfoItem>
          </ul>
        </div>
      </section>
    </PageLayout>
  );
}
