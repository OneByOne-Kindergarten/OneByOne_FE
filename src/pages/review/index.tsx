import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import clsx from "clsx";

import PageLayout from "@/components/@shared/layout/page-layout";
import NavBar from "@/components/@shared/nav/nav-bar";
import PostButton from "@/components/@shared/buttons/post-button";
import RatingFilter from "@/components/review/rating-filter";
import Toggle from "@/components/@shared/buttons/base-toggle";
import TotalRatingCard from "@/components/review/total-rating-card";
import ReviewCard from "@/components/review/review-card";
import { useSchoolNavigation } from "@/hooks/useSchoolNavigation";
import { useFetchReviewData } from "@/hooks/useFetchReviewData";
import { getFieldConfigsByType } from "@/utils/fieldConfigsUtils";
import { REVIEW_TYPES, REVIEW_TYPE_LABELS } from "@/constants/review";
import { setReviewState } from "@/utils/lastVisitedPathUtils";

type SortType = "recommended" | "latest";

const SORT_OPTIONS: { type: SortType; label: string }[] = [
  { type: "recommended", label: "추천순" },
  { type: "latest", label: "최신순" },
];

export function useReviewPage(id: string, type: string, sortType: SortType) {
  const { schoolOptions } = useSchoolNavigation(id);
  const fieldConfigs = getFieldConfigsByType(type);
  const reviewData = useFetchReviewData(id, type, sortType);

  // 세션 스토리지에 현재 경로 저장
  useEffect(() => {
    setReviewState({
      path: `/school/${id}/review?type=${type}`,
      type: type as "work" | "learning",
    });
  }, [id, type]);

  return {
    schoolOptions,
    fieldConfigs,
    reviewData,
    pageTitle: `원바원 | ${id} ${REVIEW_TYPE_LABELS[type as "work" | "learning"]}`,
    currentPath: `/school/${id}/review?type=${type}`,
  };
}

export default function ReviewPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || REVIEW_TYPES.WORK;
  const navigate = useNavigate();
  const [sortType, setSortType] = useState<SortType>("recommended");

  const safeId = id || "unknown";

  const { schoolOptions, fieldConfigs, reviewData, pageTitle, currentPath } =
    useReviewPage(safeId, type, sortType);

  return (
    <PageLayout
      title={pageTitle}
      headerTitle={safeId}
      headerType="school"
      currentPath={currentPath}
      mainBg="gray"
      mainClassName="gap-0 mt-14 mb-28"
    >
      <NavBar id={safeId} options={schoolOptions} currentPath={currentPath} />

      {/* 리뷰 총점 */}
      <section className="pb-5 px-5 pt-6 flex flex-col bg-white gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex gap-1 text-lg font-bold">
            <p>리뷰</p>
            <span className="text-tertiary-3">{reviewData.reviews.length}</span>
          </div>
          <TotalRatingCard
            total={reviewData.rating.total}
            scoreData={reviewData.scores}
            fieldConfigs={fieldConfigs.rating}
          />
        </div>
      </section>

      {/* 리뷰 목록 */}
      <section className="bg-white flex flex-col gap-5 px-5 py-4 mb-16 mt-2 border-b border-b-primary-normal01">
        <div className="flex justify-between border-b border-b-primary-normal01 pb-4">
          <div className="flex gap-2.5 items-center">
            {SORT_OPTIONS.map(({ type, label }) => (
              <Toggle key={type} size="sm" onClick={() => setSortType(type)}>
                <div
                  className={clsx("w-2 h-2 rounded-full", {
                    "bg-star text-primary": sortType === type,
                    "bg-primary-normal03": sortType !== type,
                  })}
                />
                <span
                  className={clsx("font-semibold text-xs", {
                    "text-primary": sortType === type,
                    "text-primary-normal03": sortType !== type,
                  })}
                >
                  {label}
                </span>
              </Toggle>
            ))}
          </div>
          <RatingFilter />
        </div>
        <ReviewCard
          review={reviewData.reviews}
          fieldConfigs={fieldConfigs.review}
        />
      </section>

      <PostButton
        onClick={() => navigate(`/school/${safeId}/review/new?type=${type}`)}
        label="리뷰쓰기"
      />
    </PageLayout>
  );
}
