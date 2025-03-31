import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setReviewState } from "@/utils/lastVisitedPathUtils";
import PostButton from "@/components/@shared/buttons/post-button";
import Toggle from "@/components/@shared/buttons/base-toggle";
import RatingFilter from "@/components/review/rating-filter";
import ReviewCard from "@/components/review/review-card";
import TotalRatingCard from "@/components/review/total-rating-card";
import { REVIEW_TYPES } from "@/constants/review";

const REVIEW_DATA = {
  work: {
    type: "담임",
    workYear: "2년 전",
    id: 3,
    title: "리뷰 제목",
    reviewCount: 12,
    likeCount: 10,
    shareCount: 4,
    rating: {
      total: 4.5,
      welfare: 4,
      workLabel: 5,
      atmosphere: 2,
      manager: 3,
      customer: 4,
    },
    reviewScore: {
      welfare: 3,
      workLabel: 4.2,
      atmosphere: 1,
      manager: 2.4,
      customer: 5,
    },
    createdAt: "2025-03-20",
    content: {
      welfare:
        "저는 어쩌구 복지/급여에 관한 리뷰 내용이 들어갈 텍스트 자리입니다. 복지랑 급여 중요해요. 복지/급여에 관한 리뷰 내용이 들어갈 텍스트 자리입니다. ",
      workLabel:
        "저는 어쩌구 워라벨에 관한 리뷰 내용이 들어갈 텍스트 자리입니다. 복지랑 급여 중요해요.  ",
      atmosphere: "분위기 내용",
      manager: "관리자 내용",
      customer: "고객 내용",
    },
  },
};

interface ReviewLayoutProps {
  type: "work" | "learning";
}

export default function ReviewLayout({ type }: ReviewLayoutProps) {
  const { id } = useParams<{ id: string }>();
  const safeId = id || "unknown";
  const navigate = useNavigate();

  // 경로 저장
  useEffect(() => {
    const currentPath = `/school/${safeId}/review?type=${type}`;
    setReviewState({
      path: currentPath,
      type: type,
    });
  }, [safeId, type]);

  const handleWriteReview = () => {
    const redirectPath = `/school/${safeId}/review/new?type=${type}`;
    console.log("Navigating to:", redirectPath);
    navigate(redirectPath);
  };

  return (
    <>
      {type === REVIEW_TYPES.WORK ? (
        <>
          <section className="pb-5 px-5 pt-6 flex flex-col bg-white gap-3">
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 text-lg font-bold">
                <p>리뷰</p>
                <span className="text-tertiary-3">12</span>
              </div>
              <TotalRatingCard {...REVIEW_DATA.work.rating} />
            </div>
          </section>

          <section className="bg-white flex flex-col gap-5 px-5 py-4 mb-16 mt-2 border-b border-b-primary-normal01">
            <div className="flex justify-between border-b border-b-primary-normal01 pb-4">
              <div className="flex gap-2.5 items-center">
                <Toggle variant="default" size="sm">
                  <div className="w-2 h-2 rounded-full bg-star" />
                  <span className="font-semibold text-xs">추천순</span>
                </Toggle>
                <Toggle variant="default" size="sm">
                  <div className="w-2 h-2 rounded-full bg-primary-normal03 " />{" "}
                  <span className="font-semibold text-primary-normal03 text-xs">
                    최신순
                  </span>
                </Toggle>
              </div>
              <RatingFilter />
            </div>
            <ReviewCard review={REVIEW_DATA.work} />
          </section>
        </>
      ) : (
        // 실습 리뷰 콘텐츠
        <section className="p-5 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">학교 실습 리뷰</h2>
            <div className="p-5 bg-gray-light01 rounded-lg">
              <p className="text-primary-normal02">
                실습 리뷰 콘텐츠가 추가될 예정입니다.
              </p>
            </div>
          </div>
        </section>
      )}
      <PostButton onClick={handleWriteReview} label="리뷰쓰기" />
    </>
  );
}
