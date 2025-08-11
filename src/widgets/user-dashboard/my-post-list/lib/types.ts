import type { InternshipReview, WorkReview } from "@/entities/review/DTO.d";

// 내 게시물 목록에서 사용하는 확장된 리뷰 타입 (kindergartenId 포함)
export type MyReviewData = (WorkReview | InternshipReview) & {
  kindergartenId: number;
};
