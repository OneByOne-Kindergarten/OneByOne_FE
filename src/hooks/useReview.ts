import { useSuspenseQuery } from "@tanstack/react-query";
import { REVIEW_TYPES } from "@/constants/review";
import { getWorkReviews, getInternshipReviews } from "@/services/reviewService";
import type { WorkReview, InternshipReview } from "@/types/reviewDTO";
import { SortType } from "@/types/reviewDTO";

interface ReviewData {
  id: number;
  title: string;
  type: string;
  createdAt: string;
  likeCount: number;
  workYear: string;
  rating: {
    total: number;
  };
  scores: Record<string, number>;
  contents: Record<string, string>;
}

interface ReviewResponse {
  reviews: ReviewData[];
  rating: {
    total: number;
  };
  scores: Record<string, number>;
}

const EMPTY_REVIEW_RESPONSE: ReviewResponse = {
  reviews: [],
  rating: {
    total: 0,
  },
  scores: {},
};

const transformWorkReview = (data: WorkReview): ReviewData => ({
  id: data.workReviewId,
  title: data.oneLineComment,
  type: "담임",
  createdAt: new Date().toISOString(),
  likeCount: data.likeCount,
  workYear: `${data.workYear}년 전`,
  rating: {
    total:
      (data.benefitAndSalaryScore +
        data.workLifeBalanceScore +
        data.workEnvironmentScore +
        data.managerScore +
        data.customerScore) /
      5,
  },
  scores: {
    welfare: data.benefitAndSalaryScore,
    workLabel: data.workLifeBalanceScore,
    atmosphere: data.workEnvironmentScore,
    manager: data.managerScore,
    customer: data.customerScore,
  },
  contents: {
    welfare: data.benefitAndSalaryComment,
    workLabel: data.workLifeBalanceComment,
    atmosphere: data.workEnvironmentComment,
    manager: data.managerComment,
    customer: data.customerComment,
  },
});

const transformInternshipReview = (data: InternshipReview): ReviewData => ({
  id: data.internshipReviewId,
  title: data.oneLineComment,
  type: "실습생",
  createdAt: new Date().toISOString(),
  likeCount: data.likeCount,
  workYear: "",
  rating: {
    total:
      (data.workEnvironmentScore +
        data.learningSupportScore +
        data.instructionTeacherScore) /
      3,
  },
  scores: {
    atmosphere: data.workEnvironmentScore,
    studyHelp: data.learningSupportScore,
    teacherGuide: data.instructionTeacherScore,
  },
  contents: {
    atmosphere: data.workEnvironmentComment,
    studyHelp: data.learningSupportComment,
    teacherGuide: data.instructionTeacherComment,
  },
});

/**
 * 리뷰 데이터를 가져오는 훅
 * @param id 유치원 ID
 * @param type 리뷰 타입 (work/learning)
 * @param sortType 정렬 타입 (recommended/latest)
 * @returns 리뷰 데이터
 */
export function useReview(
  id: string,
  type: string,
  sortType: SortType
): ReviewResponse {
  const { data: workReviews } = useSuspenseQuery({
    queryKey: ["workReviews", id, type === REVIEW_TYPES.WORK],
    queryFn: () => getWorkReviews(Number(id)),
  });

  const { data: internshipReviews } = useSuspenseQuery({
    queryKey: ["internshipReviews", id, type === REVIEW_TYPES.LEARNING],
    queryFn: () => getInternshipReviews(Number(id)),
  });

  if (!workReviews && !internshipReviews) {
    return EMPTY_REVIEW_RESPONSE;
  }

  const reviews =
    type === REVIEW_TYPES.WORK
      ? workReviews?.content.map(transformWorkReview) || []
      : internshipReviews?.content.map(transformInternshipReview) || [];

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortType === SortType.POPULAR) {
      return b.likeCount - a.likeCount;
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const totalRating =
    reviews.reduce(
      (acc: number, review: ReviewData) => acc + review.rating.total,
      0
    ) / reviews.length || 0;

  const scores = reviews.reduce(
    (acc: Record<string, number>, review: ReviewData) => {
      Object.entries(review.scores).forEach(([key, value]) => {
        acc[key] = (acc[key] || 0) + value;
      });
      return acc;
    },
    {} as Record<string, number>
  );

  Object.keys(scores).forEach((key) => {
    scores[key] = scores[key] / reviews.length || 0;
  });

  return {
    reviews: sortedReviews,
    rating: {
      total: totalRating,
    },
    scores,
  };
}
