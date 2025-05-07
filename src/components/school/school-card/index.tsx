import { Link } from "react-router-dom";

import { SVG_PATHS } from "@/constants/assets-path";
import { URL_PATHS } from "@/constants/url-path";
import Badge from "@/components/@shared/badge";
import { Kindergarten } from "@/types/kindergartenDTO";

interface SchoolCardProps {
  schoolName?: string;
  location?: string;
  workReviewAggregate?: Kindergarten["workReviewAggregate"];
  establishment?: string;
  id: string;
}

export default function SchoolCard({
  schoolName = "기관 이름",
  location = "위치",
  workReviewAggregate,
  establishment = "설립 유형",
  id,
}: SchoolCardProps) {
  const calculateAverageScore = (
    aggregate: Kindergarten["workReviewAggregate"]
  ) => {
    if (!aggregate) return 0;
    const scores = [
      aggregate.benefitAndSalaryScoreAggregate,
      aggregate.workLiftBalanceScoreAggregate,
      aggregate.workEnvironmentScoreAggregate,
      aggregate.managerScoreAggregate,
      aggregate.customerScoreAggregate,
    ];
    const sum = scores.reduce((acc, score) => acc + score, 0);
    return Math.round((sum / scores.length) * 10) / 10;
  };

  const score = workReviewAggregate
    ? calculateAverageScore(workReviewAggregate)
    : 0;

  return (
    <div className="px-5 py-4 bg-white">
      <Link
        to={`${URL_PATHS.SCHOOL}/${id}`}
        className="flex w-full justify-between items-center"
      >
        <div className="flex flex-col gap-2.5">
          <Badge variant="tertiary">{establishment}</Badge>
          <div className="gap-1">
            <p className="text-base font-bold ">{schoolName}</p>
            <div className="flex gap-1.5 ">
              <img
                src={SVG_PATHS.LOCATION}
                alt="위치 아이콘"
                width="18"
                height="18"
              />
              <address className="not-italic text-primary-normal03 text-sm font-light">
                {location}
              </address>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <img
            src={SVG_PATHS.STAR.yellow}
            alt="별점 아이콘"
            width="24"
            height="24"
          />
          <span className="text-base font-bold">{score}</span>
        </div>
      </Link>
    </div>
  );
}
