import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import Error from "@/components/@shared/layout/error";
import PageLayout from "@/components/@shared/layout/page-layout";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import NavBar from "@/components/@shared/nav/nav-bar";
import SchoolInfoChart from "@/components/school/SchoolInfoChart";
import SchoolInfoItem from "@/components/school/SchoolInfoItem";
import SchoolMap from "@/components/school/SchoolMap";
import { SVG_PATHS } from "@/constants/assets-path";
import { REVIEW_TYPES } from "@/constants/review";
import { URL_PATHS } from "@/constants/url-path";
import { useUrlNavigation } from "@/hooks/useUrlNavigation";
import { getKindergartenDetail } from "@/services/kindergartenService";
import { Kindergarten } from "@/types/kindergartenDTO";

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

export default function SchoolDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const safeId = id || "unknown";

  // 즐겨찾기 페이지에서 접근했을 경우
  const customBackHandler = useCallback(() => {
    if (location.state?.fromBookmarks) {
      navigate(URL_PATHS.BOOKMARKS);
      return true;
    }
    return false; // 기본 네비게이션 로직 사용
  }, [location.state?.fromBookmarks, navigate]);

  const { handleBackNavigation } = useUrlNavigation(customBackHandler);

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

  const REVIEW_CATEGORY_OPTIONS = [
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

  const handleBackClick = () => {
    if (location.state?.fromSearch) {
      const { searchPath } = location.state;
      if (searchPath) {
        // 저장된 검색 페이지 경로로 이동
        navigate(searchPath);
      } else {
        // 기본 검색 페이지로 이동
        const { searchQuery } = location.state;
        const searchPath = `${URL_PATHS.SEARCH_SCHOOL}?query=${encodeURIComponent(searchQuery)}`;
        navigate(searchPath);
      }
    } else {
      // useUrlNavigation 훅 사용
      handleBackNavigation();
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
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
          options={REVIEW_CATEGORY_OPTIONS}
          currentPath={URL_PATHS.SCHOOL_DETAIL.replace(":id", safeId)}
        />
        <section className="px-5 py-5 pb-28">
          <ul className="flex flex-1 flex-col gap-7">
            <div className="flex flex-col gap-1.5">
              <SchoolInfoItem
                icon={SVG_PATHS.LOCATION}
                title="위치정보"
                altText="위치 아이콘"
              >
                <address className="text-base font-semibold not-italic text-primary-dark02">
                  {kindergarten.address}
                </address>
              </SchoolInfoItem>
              <SchoolMap
                latitude={kindergarten.latitude}
                longitude={kindergarten.longitude}
                schoolName={kindergarten.name}
                establishment={kindergarten.establishment}
              />
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
                icon={SVG_PATHS.HOMEPAGE}
                title="홈페이지"
                altText="홈 아이콘"
              >
                <Link
                  to={kindergarten.homepage}
                  className="block truncate font-semibold text-primary-dark02 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {kindergarten.homepage}
                </Link>
              </SchoolInfoItem>
            )}
          </ul>
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
      mainClassName="flex flex-col mt-14"
      hasBackButton={true}
      onBackButtonClick={handleBackClick}
    >
      {renderContent()}
    </PageLayout>
  );
}
