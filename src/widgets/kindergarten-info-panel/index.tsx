import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { getKindergartenDetail } from "@/entities/kindergarten/api";
import { Kindergarten } from "@/entities/kindergarten/DTO.d";
import NavBar from "@/features/nav/nav-bar";
import { SVG_PATHS } from "@/shared/constants/assets-path";
import { REVIEW_TYPES } from "@/shared/constants/review";
import { URL_PATHS } from "@/shared/constants/url-path";
import SchoolInfoChart from "@/widgets/kindergarten-info-panel/ui/SchoolInfoChart";
import SchoolInfoItem from "@/widgets/kindergarten-info-panel/ui/SchoolInfoItem";
import SchoolDetailMap from "@/widgets/kindergarten-map/SchoolDetailMap";

const SCHOOL_STATS_COLORS = {
  AGE_3: "bg-star",
  AGE_4: "bg-green",
  AGE_5: "bg-tertiary-3",
};

const SCHOOL_STATS_AGES = [3, 4, 5];

const SCHOOL_QUERY_CONFIG = {
  staleTime: 1000 * 60 * 5, // 5분
  gcTime: 1000 * 60 * 30, // 30분
  refetchOnWindowFocus: false,
};

type StatsType = keyof typeof SCHOOL_STATS_COLORS;

interface KindergartenInfoPanelProps {
  safeId: string;
  onKindergartenLoad?: (name: string) => void;
}

export default function KindergartenInfoPanel({
  safeId,
  onKindergartenLoad,
}: KindergartenInfoPanelProps) {
  const { data: kindergarten } = useSuspenseQuery<Kindergarten, Error>({
    queryKey: ["kindergarten", "detail", safeId],
    queryFn: () => getKindergartenDetail(Number(safeId)),
    ...SCHOOL_QUERY_CONFIG,
  });

  const REVIEW_CATEGORY_OPTIONS = [
    { href: `/kindergarten/${safeId}`, label: "기관정보" },
    {
      href: `/kindergarten/${safeId}/review?type=${REVIEW_TYPES.WORK}`,
      label: "근무리뷰",
    },
    {
      href: `/kindergarten/${safeId}/review?type=${REVIEW_TYPES.LEARNING}`,
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

  const classStats = calculateStats(kindergarten);
  const studentStats = calculateStudentStats(kindergarten);

  // 부모 컴포넌트에 유치원 이름 전달 (useEffect 사용)
  useEffect(() => {
    if (onKindergartenLoad && kindergarten.name) {
      onKindergartenLoad(kindergarten.name);
    }
  }, [onKindergartenLoad, kindergarten.name]);

  return (
    <>
      <NavBar
        id={safeId}
        options={REVIEW_CATEGORY_OPTIONS}
        currentPath={URL_PATHS.KINDERGARTEN_DETAIL.replace(":id", safeId)}
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
            <SchoolDetailMap
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
                  설립 <span>{formatDate(kindergarten.establishmentDate)}</span>
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
}
