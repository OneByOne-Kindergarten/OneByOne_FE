import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import clsx from "clsx";

import PageLayout from "@/components/@shared/layout/page-layout";
import Empty from "@/components/@shared/layout/empty";
import NavBar from "@/components/@shared/nav/nav-bar";
import PostButton from "@/components/@shared/buttons/post-button";
import RatingFilter from "@/components/review/RatingFilter";
import Toggle from "@/components/@shared/buttons/base-toggle";
import TotalRatingCard from "@/components/review/TotalRatingCard";
import ReviewCard from "@/components/review/ReviewCard";
import { useReviewPage } from "@/hooks/useReviewPage";
import { REVIEW_TYPES } from "@/constants/review";
import { URL_PATHS } from "@/constants/url-path";

type SortType = "recommended" | "latest";

const SCHOOL_DEFAULT_NAME = "유치원";

const SORT_OPTIONS: { type: SortType; label: string }[] = [
  { type: "recommended", label: "추천순" },
  { type: "latest", label: "최신순" },
];

export default function ReviewPage() {
  const { id: kindergartenId } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || REVIEW_TYPES.WORK;
  const navigate = useNavigate();
  const [sortType, setSortType] = useState<SortType>("recommended");

  const safeKindergartenId = kindergartenId || "unknown";

  const {
    schoolOptions,
    fieldConfigs,
    reviewData,
    pageTitle,
    currentPath,
    isDisabled,
  } = useReviewPage(safeKindergartenId, type, sortType);

  const kindergartenName =
    reviewData.reviews[0]?.kindergarten?.name || SCHOOL_DEFAULT_NAME;

  return (
    <PageLayout
      title={pageTitle}
      headerTitle={kindergartenName}
      headerType="school"
      currentPath={currentPath}
      kindergartenId={safeKindergartenId}
      showBookmark={true}
      mainBg="gray"
      mainClassName="gap-0 mt-14 mb-28"
    >
      <NavBar
        id={safeKindergartenId}
        options={schoolOptions}
        currentPath={currentPath}
      />

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
        {reviewData.reviews.length > 0 ? (
          <ReviewCard
            review={reviewData.reviews}
            fieldConfigs={fieldConfigs.review}
          />
        ) : (
          <Empty>
            <p className="text-sm">리뷰가 없습니다.</p>
            <span className="text-xxs text-primary-normal02">
              {kindergartenName}의 첫 리뷰를 작성해보세요!
            </span>
          </Empty>
        )}
      </section>

      <PostButton
        onClick={() =>
          navigate(`/school/${safeKindergartenId}/review/new?type=${type}`)
        }
        label="리뷰쓰기"
        isDisabled={isDisabled}
      />
    </PageLayout>
  );
}
