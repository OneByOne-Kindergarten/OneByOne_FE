import type { InternshipReview, WorkReview } from "@/entities/review/DTO.d";
import { REVIEW_TYPES } from "@/shared/constants/review";
import { BoxRatingGroup } from "@/shared/ui/rating/box-rating";
import type { ReviewFieldConfig } from "@/widgets/review-panel/lib/config";

interface ReviewContentProps {
  review: InternshipReview | WorkReview;
  type: string;
  fieldConfigs: ReviewFieldConfig[];
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function ReviewContent({
  review,
  type,
  fieldConfigs,
  isExpanded,
  onToggleExpand,
}: ReviewContentProps) {
  const truncateText = (text: string, maxLength: number = 40) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + " …";
  };

  // 필드별 점수와 내용 가져오기
  const getFieldData = (fieldKey: string) => {
    if (type === REVIEW_TYPES.WORK && "workReviewId" in review) {
      const workReview = review;
      switch (fieldKey) {
        case "welfare":
          return {
            score: workReview.benefitAndSalaryScore,
            content: workReview.benefitAndSalaryComment || "",
          };
        case "workLabel":
          return {
            score: workReview.workLifeBalanceScore,
            content: workReview.workLifeBalanceComment || "",
          };
        case "atmosphere":
          return {
            score: workReview.workEnvironmentScore,
            content: workReview.workEnvironmentComment || "",
          };
        case "manager":
          return {
            score: workReview.managerScore,
            content: workReview.managerComment || "",
          };
        case "customer":
          return {
            score: workReview.customerScore,
            content: workReview.customerComment || "",
          };
        default:
          return { score: 0, content: "" };
      }
    } else if ("internshipReviewId" in review) {
      const internshipReview = review;
      switch (fieldKey) {
        case "atmosphere":
          return {
            score: internshipReview.workEnvironmentScore,
            content: internshipReview.workEnvironmentComment || "",
          };
        case "studyHelp":
          return {
            score: internshipReview.learningSupportScore,
            content: internshipReview.learningSupportComment || "",
          };
        case "teacherGuide":
          return {
            score: internshipReview.instructionTeacherScore,
            content: internshipReview.instructionTeacherComment || "",
          };
        default:
          return { score: 0, content: "" };
      }
    }
    return { score: 0, content: "" };
  };

  return (
    <>
      <ul className="flex flex-col gap-3">
        {fieldConfigs.map((config) => {
          const { score, content } = getFieldData(config.key);

          return (
            <li key={config.key} className="flex flex-col gap-1.5 text-xs">
              <div className="flex items-center">
                <h3 className="w-14 font-semibold">{config.label}</h3>
                <BoxRatingGroup value={score} size="xs" className="gap-0.5" />
              </div>
              <p className={isExpanded ? "" : "line-clamp-1"}>
                {isExpanded ? content : truncateText(content)}
              </p>
            </li>
          );
        })}
      </ul>
      <button
        onClick={onToggleExpand}
        className="text-left text-xs font-semibold text-primary-normal03 underline"
      >
        {isExpanded ? "접기" : "더보기"}
      </button>
    </>
  );
}
