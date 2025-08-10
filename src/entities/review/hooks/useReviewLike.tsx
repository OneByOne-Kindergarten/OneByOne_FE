import { useMutation, useQueryClient } from "@tanstack/react-query";

import { likeInternshipReview, likeWorkReview } from "@/entities/review/api";
import { REVIEW_TYPES } from "@/shared/constants/review";

export function useReviewLike(type: string, reviewId: number) {
  const queryClient = useQueryClient();
  const queryKey =
    type === REVIEW_TYPES.WORK ? "workReviews" : "internshipReviews";

  const { mutate: handleLike, isPending } = useMutation({
    mutationFn: () => {
      if (type === REVIEW_TYPES.WORK) {
        return likeWorkReview(reviewId);
      }
      return likeInternshipReview(reviewId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  const getIsLiked = () => {
    const data = queryClient.getQueryData([queryKey]) as any;
    if (!data?.content) return false;

    const review = data.content.find((r: any) => {
      if (type === REVIEW_TYPES.WORK) {
        return r.workReviewId === reviewId;
      }
      return r.internshipReviewId === reviewId;
    });

    if (!review) return false;
    return review.isLiked || false;
  };

  return {
    handleLike,
    isPending,
    isLiked: getIsLiked(),
  };
}
