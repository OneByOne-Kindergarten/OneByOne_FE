import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/shared/hooks/useToast";
import { LearningReviewFormValues } from "@/widgets/review-editor/ui/LearningReviewForm";

import { createInternshipReview } from "../api";
import { LikeResponse } from "../DTO.d";

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
      let errorMessage = "잠시 후 다시 시도해주세요.";

      if (error instanceof Error && error.message) {
        if (error.message !== "Failed to fetch") {
          errorMessage = error.message;
        }
      }

      toast({
        title: "실습 리뷰 등록 실패",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};
