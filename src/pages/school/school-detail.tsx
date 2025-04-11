import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import PageLayout from "@/components/@shared/layout/page-layout";
import NavBar from "@/components/@shared/nav/nav-bar";
import Button from "@/components/@shared/buttons/base-button";
import Error from "@/components/@shared/layout/error";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import SchoolInfoItem from "@/components/school/school-info-item";
import SchoolInfoChart from "@/components/school/school-info-chart";

import { URL_PATHS } from "@/constants/url-path";
import { SVG_PATHS } from "@/constants/assets-path";
import { REVIEW_TYPES } from "@/constants/review";
import { Kindergarten } from "@/types/kindergartenDTO";
import { getKindergartenDetail } from "@/services/kindergartenService";

const SCHOOL_STATS_COLORS = {
  AGE_3: "bg-star",
  AGE_4: "bg-green",
  AGE_5: "bg-tertiary-3",
};

const SCHOOL_STATS_AGES = [3, 4, 5];
const SCHOOL_DEFAULT_NAME = "유치원";

const SCHOOL_QUERY_CONFIG = {
  staleTime: 1000 * 60 * 5, // 5분
  gcTime: 1000 * 60 * 30, // 30분
  refetchOnWindowFocus: false,
};

type StatsType = keyof typeof SCHOOL_STATS_COLORS;
type AgeType = (typeof SCHOOL_STATS_AGES)[number];

export default function SchoolDetail() {
  const { id } = useParams<{ id: string }>();
  const safeId = id || "unknown";

  const {
    data: kindergarten,
    isLoading,
    error,
  } = useQuery<Kindergarten, Error>({
    queryKey: ["kindergarten", "detail", safeId],
    queryFn: () => getKindergartenDetail(Number(safeId)),
    enabled: !!id && id !== "unknown",
    ...SCHOOL_QUERY_CONFIG,
  });

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

  const calculateStats = (data: Kindergarten) => {
    const totalCount = data.totalClassCount;

    const stats = SCHOOL_STATS_AGES.map((age) => {
      const count = data[`classCount${age}` as keyof Kindergarten] as number;
      return {
        age,
        count,
        percent:
          totalCount > 0 ? `${Math.round((count / totalCount) * 100)}%` : "0%",
        color: SCHOOL_STATS_COLORS[`AGE_${age}` as StatsType],
      };
    });

    return stats;
  };

  const calculateStudentStats = (data: Kindergarten) => {
    const totalCount = data.totalPupilCount;

    const stats = SCHOOL_STATS_AGES.map((age) => {
      const count = data[`pupilCount${age}` as keyof Kindergarten] as number;
      return {
        age,
        count,
        percent:
          totalCount > 0 ? `${Math.round((count / totalCount) * 100)}%` : "0%",
        color: SCHOOL_STATS_COLORS[`AGE_${age}` as StatsType],
      };
    });

    return stats;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner type="page" />;
    }

    if (error || !kindergarten) {
      return (
        <Error type="page">
          {error?.message || "유치원 정보를 찾을 수 없습니다."}
        </Error>
      );
    }

    const classStats = calculateStats(kindergarten);
    const studentStats = calculateStudentStats(kindergarten);

    return (
      <>
        <NavBar
          id={safeId}
          options={CATEGORY_OPTIONS}
          currentPath={URL_PATHS.SCHOOL_DETAIL.replace(":id", safeId)}
        />
        <section className="px-5 pb-20">
          <div className="flex flex-col gap-7">
            <h1 className="text-lg font-bold text-primary-dark02">
              {kindergarten.name}
            </h1>
            <ul className="flex flex-col flex-1 gap-7">
              <div className="flex flex-col gap-1.5">
                <SchoolInfoItem
                  icon={SVG_PATHS.LOCATION}
                  title="위치정보"
                  altText="위치 아이콘"
                >
                  <address className="not-italic text-base font-semibold text-primary-dark02">
                    {kindergarten.address}
                  </address>
                </SchoolInfoItem>
                <div className="relative bg-primary-normal01 h-40 rounded-md flex items-center justify-center">
                  <p>지도</p>
                  <Button
                    variant="secondary"
                    shape="full"
                    size="xs"
                    className="absolute px-1.5 gap-1 text-xxs right-3 top-3"
                  >
                    <img
                      src={SVG_PATHS.MAP}
                      alt="지도 아이콘"
                      width={14}
                      height={14}
                    />
                    지도보기
                  </Button>
                </div>
              </div>

              <SchoolInfoItem
                icon={SVG_PATHS.CALL}
                title="전화"
                altText="전화기 아이콘"
              >
                <p className="text-base font-semibold text-primary-dark02">
                  {kindergarten.phoneNumber}
                </p>
              </SchoolInfoItem>

              <SchoolInfoItem
                icon={SVG_PATHS.BUILDING}
                title="설립"
                altText="건물 아이콘"
              >
                <div className="flex flex-col gap-3">
                  <p className="text-base font-semibold text-primary-dark02">
                    {kindergarten.establishment}
                  </p>
                  <div className="flex flex-col">
                    <p>
                      설립{" "}
                      <span>{formatDate(kindergarten.establishmentDate)}</span>
                    </p>
                    <p>
                      개원 <span>{formatDate(kindergarten.openDate)}</span>
                    </p>
                  </div>
                </div>
              </SchoolInfoItem>

              <SchoolInfoChart
                title="학급"
                totalCount={kindergarten.totalClassCount}
                unit="class"
                stats={classStats}
              />

              <SchoolInfoChart
                title="원생"
                totalCount={kindergarten.totalPupilCount}
                unit="student"
                stats={studentStats}
              />

              {kindergarten.homepage && (
                <SchoolInfoItem
                  icon={SVG_PATHS.HOME}
                  title="홈페이지"
                  altText="홈 아이콘"
                >
                  <a
                    href={kindergarten.homepage}
                    className="text-primary-dark02 font-semibold hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {kindergarten.homepage}
                  </a>
                </SchoolInfoItem>
              )}
            </ul>
          </div>
        </section>
      </>
    );
  };

  return (
    <PageLayout
      title={`원바원 | ${kindergarten?.name || SCHOOL_DEFAULT_NAME} 상세정보`}
      description={`${kindergarten?.name || SCHOOL_DEFAULT_NAME} 상세 정보`}
      headerTitle={kindergarten?.name || SCHOOL_DEFAULT_NAME}
      headerType="school"
      currentPath={URL_PATHS.SCHOOL_DETAIL.replace(":id", safeId)}
      wrapperBg="white"
      kindergartenId={safeId}
      showBookmark={true}
      mainClassName="flex flex-col"
    >
      {renderContent()}
    </PageLayout>
  );
}
