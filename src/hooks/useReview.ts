import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import type { LearningReviewFormValues } from "@/components/review/LearningReviewForm";
import type { WorkReviewFormValues } from "@/components/review/WorkReviewForm";
import { REVIEW_TYPES } from "@/constants/review";
import { useToast } from "@/hooks/useToast";
import {
  createInternshipReview,
  createWorkReview,
  getInternshipReviews,
  getWorkReviews,
} from "@/services/reviewService";
import type {
  InternshipReview,
  LikeResponse,
  WorkReview,
} from "@/types/reviewDTO";
import { SortType } from "@/types/reviewDTO";
import { safeParseId } from "@/utils/idValidation";

type ReviewData = InternshipReview | WorkReview;

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

/**
 * 근무 리뷰 데이터를 가져오는 훅
 * @param kindergartenId 유치원 ID
 * @param sortType 정렬 타입
 * @returns 근무 리뷰 데이터
 */
export const useWorkReviews = (kindergartenId: string, sortType?: SortType) => {
  const numericId = safeParseId(kindergartenId);

  return useSuspenseQuery({
    queryKey: ["workReviews", kindergartenId, sortType],
    queryFn: () => {
      if (!numericId) {
        return Promise.resolve({ content: [], totalPages: 0 });
      }
      return getWorkReviews(numericId, sortType);
    },
  });
};

/**
 * 실습 리뷰 데이터를 가져오는 훅
 * @param kindergartenId 유치원 ID
 * @param sortType 정렬 타입  (popular/latest)
 * @returns 실습 리뷰 데이터
 */
export const useInternshipReviews = (
  kindergartenId: string,
  sortType?: SortType
) => {
  const numericId = safeParseId(kindergartenId);

  return useSuspenseQuery({
    queryKey: ["internshipReviews", kindergartenId, sortType],
    queryFn: () => {
      if (!numericId) {
        return Promise.resolve({ content: [], totalPages: 0 });
      }
      return getInternshipReviews(numericId, sortType);
    },
  });
};

/**
 * 리뷰 데이터를 가져오는 훅
 * @param id 유치원 ID
 * @param type 리뷰 타입 (work/learning)
 * @param sortType 정렬 타입 (popular/latest)
 * @returns 리뷰 데이터
 */
export function useReview(
  id: string,
  type: string,
  sortType: SortType
): ReviewResponse {
  const numericId = safeParseId(id);

  const { data: workReviews } = useSuspenseQuery({
    queryKey: ["workReviews", id, sortType],
    queryFn: () => {
      if (!numericId) {
        return Promise.resolve({ content: [], totalElements: 0 });
      }
      return getWorkReviews(numericId, sortType);
    },
  });

  const { data: internshipReviews } = useSuspenseQuery({
    queryKey: ["internshipReviews", id, sortType],
    queryFn: () => {
      if (!numericId) {
        return Promise.resolve({ content: [], totalElements: 0 });
      }
      return getInternshipReviews(numericId, sortType);
    },
  });

  if (!workReviews && !internshipReviews) {
    return EMPTY_REVIEW_RESPONSE;
  }

  const reviews =
    type === REVIEW_TYPES.WORK
      ? workReviews?.content || []
      : internshipReviews?.content || [];

  const totalRating =
    reviews.reduce((acc: number, review: ReviewData) => {
      if (type === REVIEW_TYPES.WORK && "workReviewId" in review) {
        return (
          acc +
          (review.benefitAndSalaryScore +
            review.workLifeBalanceScore +
            review.workEnvironmentScore +
            review.managerScore +
            review.customerScore) /
            5
        );
      } else if ("internshipReviewId" in review) {
        return (
          acc +
          (review.workEnvironmentScore +
            review.learningSupportScore +
            review.instructionTeacherScore) /
            3
        );
      }
      return acc;
    }, 0) / reviews.length || 0;

  // 평균 점수 계산
  const scores = reviews.reduce(
    (acc: Record<string, number>, review: ReviewData) => {
      if (type === REVIEW_TYPES.WORK && "workReviewId" in review) {
        acc.welfare = (acc.welfare || 0) + review.benefitAndSalaryScore;
        acc.workLabel = (acc.workLabel || 0) + review.workLifeBalanceScore;
        acc.atmosphere = (acc.atmosphere || 0) + review.workEnvironmentScore;
        acc.manager = (acc.manager || 0) + review.managerScore;
        acc.customer = (acc.customer || 0) + review.customerScore;
      } else if ("internshipReviewId" in review) {
        acc.atmosphere = (acc.atmosphere || 0) + review.workEnvironmentScore;
        acc.studyHelp = (acc.studyHelp || 0) + review.learningSupportScore;
        acc.teacherGuide =
          (acc.teacherGuide || 0) + review.instructionTeacherScore;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  // 평균 계산
  Object.keys(scores).forEach((key) => {
    scores[key] = scores[key] / reviews.length || 0;
  });

  return {
    reviews,
    rating: {
      total: totalRating,
    },
    scores,
  };
}

/**
 * 실습 리뷰 생성 훅
 * @returns mutation 객체
 */
export const useCreateInternshipReview = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<
    LikeResponse,
    Error,
    LearningReviewFormValues & { kindergartenId: number; workType: string }
  >({
    mutationFn: createInternshipReview,
    onSuccess: (_, variables) => {
      // 해당 유치원의 실습 리뷰 목록을 다시 불러오기
      queryClient.invalidateQueries({
        queryKey: ["internshipReviews", variables.kindergartenId.toString()],
      });

      toast({
        title: "실습 리뷰 작성 완료",
        description: "게시된 리뷰를 확인해보세요. 🧐",
        variant: "default",
      });
    },
    onError: (error) => {
      const errorMessage =
        (() => {
          try {
            return JSON.parse(error.message).data?.message;
          } catch {
            return error.message;
          }
        })() || "잠시 후 다시 시도해주세요.";

      toast({
        title: "실습 리뷰 등록 실패",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("실습 리뷰 생성 에러:", error);
    },
  });
};

/**
 * 근무 리뷰 생성 훅
 * @returns mutation 객체
 */
export const useCreateWorkReview = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<
    LikeResponse,
    Error,
    WorkReviewFormValues & { kindergartenId: number }
  >({
    mutationFn: createWorkReview,
    onSuccess: (_, variables) => {
      // 해당 유치원의 근무 리뷰 목록을 다시 불러오기
      queryClient.invalidateQueries({
        queryKey: ["workReviews", variables.kindergartenId.toString()],
      });

      toast({
        title: "근무 리뷰 작성 완료",
        description: "게시된 리뷰를 확인해보세요. 🧐",
        variant: "default",
      });
    },
    onError: (error) => {
      const errorMessage =
        (() => {
          try {
            return JSON.parse(error.message).data?.message;
          } catch {
            return error.message;
          }
        })() || "잠시 후 다시 시도해주세요.";

      toast({
        title: "근무 리뷰 등록 실패",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("근무 리뷰 생성 에러:", error);
    },
  });
};
