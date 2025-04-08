import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { URL_PATHS } from "@/constants/url-path";
import { SVG_PATHS } from "@/constants/assets-path";
import { REVIEW_TYPES } from "@/constants/review";
import PageLayout from "@/components/@shared/layout/page-layout";
import NavBar from "@/components/@shared/nav/nav-bar";
import Button from "@/components/@shared/buttons/base-button";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import SchoolInfoItem from "@/components/school/school-info-item";
import SchoolInfoChart from "@/components/school/school-info-chart";
import { getKindergartenDetail } from "@/services/kindergartenService";
import { Kindergarten } from "@/types/kindergarten";

export default function SchoolDetail() {
  const { id } = useParams<{ id: string }>();
  const safeId = id || "unknown";
  const [loading, setLoading] = useState<boolean>(true);
  const [kindergarten, setKindergarten] = useState<Kindergarten | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKindergartenDetail = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await getKindergartenDetail(Number(id));
        setKindergarten(data);
      } catch (error) {
        console.error("유치원 상세 정보 조회 실패:", error);
        setError("유치원 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchKindergartenDetail();
  }, [id]);

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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !kindergarten) {
    return (
      <PageLayout
        title="원바원 | 오류"
        description="유치원 상세 정보를 불러오는데 실패했습니다."
        headerTitle="오류"
        headerType="school"
        currentPath={URL_PATHS.SCHOOL_DETAIL.replace(":id", safeId)}
        wrapperBg="white"
      >
        <div className="flex justify-center items-center h-48">
          <p className="text-center text-red-500">
            {error || "유치원 정보를 찾을 수 없습니다."}
          </p>
        </div>
      </PageLayout>
    );
  }

  // 학급 통계 계산
  const classStats = [
    {
      age: 3,
      count: kindergarten.classCount3,
      percent:
        kindergarten.totalClassCount > 0
          ? `${Math.round((kindergarten.classCount3 / kindergarten.totalClassCount) * 100)}%`
          : "0%",
      color: "bg-star",
    },
    {
      age: 4,
      count: kindergarten.classCount4,
      percent:
        kindergarten.totalClassCount > 0
          ? `${Math.round((kindergarten.classCount4 / kindergarten.totalClassCount) * 100)}%`
          : "0%",
      color: "bg-green",
    },
    {
      age: 5,
      count: kindergarten.classCount5,
      percent:
        kindergarten.totalClassCount > 0
          ? `${Math.round((kindergarten.classCount5 / kindergarten.totalClassCount) * 100)}%`
          : "0%",
      color: "bg-tertiary-3",
    },
  ];

  // 원생 통계 계산
  const studentStats = [
    {
      age: 3,
      count: kindergarten.pupilCount3,
      percent:
        kindergarten.totalPupilCount > 0
          ? `${Math.round((kindergarten.pupilCount3 / kindergarten.totalPupilCount) * 100)}%`
          : "0%",
      color: "bg-star",
    },
    {
      age: 4,
      count: kindergarten.pupilCount4,
      percent:
        kindergarten.totalPupilCount > 0
          ? `${Math.round((kindergarten.pupilCount4 / kindergarten.totalPupilCount) * 100)}%`
          : "0%",
      color: "bg-green",
    },
    {
      age: 5,
      count: kindergarten.pupilCount5,
      percent:
        kindergarten.totalPupilCount > 0
          ? `${Math.round((kindergarten.pupilCount5 / kindergarten.totalPupilCount) * 100)}%`
          : "0%",
      color: "bg-tertiary-3",
    },
  ];

  // 설립일자 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  return (
    <PageLayout
      title={`원바원 | ${kindergarten.name} 상세정보`}
      description={`${kindergarten.name} 유치원 상세 정보`}
      headerTitle={`${kindergarten.name}`}
      headerType="school"
      currentPath={URL_PATHS.SCHOOL_DETAIL.replace(":id", safeId)}
      wrapperBg="white"
    >
      <NavBar
        id={safeId}
        options={CATEGORY_OPTIONS}
        currentPath={URL_PATHS.SCHOOL_DETAIL.replace(":id", safeId)}
      />
      <section className="px-5 pt-3 pb-20">
        <div className="flex flex-col gap-7">
          <div className="w-full h-52 bg-primary-normal01 rounded-lg flex items-center justify-center">
            <p>지도 이미지</p>
          </div>
          <h1 className="text-xl font-bold mb-3 text-primary-dark02">
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
                  variant="transparent_gray"
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

            <SchoolInfoItem
              icon={SVG_PATHS.BUILDING}
              title="전화번호"
              altText="전화번호 아이콘"
            >
              <p className="text-base font-semibold text-primary-dark02">
                {kindergarten.phoneNumber}
              </p>
            </SchoolInfoItem>

            <SchoolInfoItem
              icon={SVG_PATHS.HOME}
              title="링크"
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
          </ul>
        </div>
      </section>
    </PageLayout>
  );
}
