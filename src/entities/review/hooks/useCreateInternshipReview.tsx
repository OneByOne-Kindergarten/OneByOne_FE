import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getUserInfo } from "@/entities/user/api";
import { useToast } from "@/shared/hooks/useToast";
import { LearningReviewFormValues } from "@/widgets/review-editor/ui/LearningReviewForm";

import { createInternshipReview } from "../api";
import { LikeResponse } from "../DTO.d";

export const useCreateInternshipReview = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<
    LikeResponse,
    Error,
    LearningReviewFormValues & { kindergartenId: number; workType: string }
  >({
    mutationFn: createInternshipReview,
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["internshipReviews", variables.kindergartenId.toString()],
      });

      queryClient.invalidateQueries({
        queryKey: ["myPosts"],
      });

      await getUserInfo();

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
