import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { getKindergartenDetail } from "@/entities/kindergarten/api";
import { Kindergarten } from "@/entities/kindergarten/DTO.d";
import NavBar from "@/features/nav/ui/NavBar";
import { STATIC_CACHE_CONFIG } from "@/shared/config/query";
import { SVG_PATHS } from "@/shared/constants/assets-path";
import { URL_PATHS } from "@/shared/constants/url-path";
import {
  calculateStats,
  calculateStudentStats,
} from "@/widgets/kindergarten-info-panel/lib/calculateStats";
import { buildReviewCategoryOptions } from "@/widgets/kindergarten-info-panel/lib/category";
import { formatDate } from "@/widgets/kindergarten-info-panel/lib/formatDate";
import SchoolDetailMap from "@/widgets/kindergarten-info-panel/ui/SchoolDetailMap";
import SchoolInfoChart from "@/widgets/kindergarten-info-panel/ui/SchoolInfoChart";
import SchoolInfoItem from "@/widgets/kindergarten-info-panel/ui/SchoolInfoItem";

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
    ...STATIC_CACHE_CONFIG,
  });

  const classStats = calculateStats(kindergarten);
  const studentStats = calculateStudentStats(kindergarten);

  // 부모 컴포넌트에 유치원 이름 전달 (useEffect 사용)
  useEffect(() => {
    if (onKindergartenLoad && kindergarten.name) {
      onKindergartenLoad(kindergarten.name);
    }
  }, [onKindergartenLoad, kindergarten.name]);

  const REVIEW_CATEGORY_OPTIONS = buildReviewCategoryOptions(safeId);

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
              icon={SVG_PATHS.KINDERGARTEN_INFO.LOCATION.PIN}
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
            icon={SVG_PATHS.KINDERGARTEN_INFO.CONTACT.CALL}
            title="전화"
            altText="전화기 아이콘"
          >
            <p className="text-base font-semibold text-primary-dark02">
              {kindergarten.phoneNumber}
            </p>
          </SchoolInfoItem>

          <SchoolInfoItem
            icon={SVG_PATHS.KINDERGARTEN_INFO.BUILDING}
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
              icon={SVG_PATHS.KINDERGARTEN_INFO.CONTACT.HOMEPAGE}
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
