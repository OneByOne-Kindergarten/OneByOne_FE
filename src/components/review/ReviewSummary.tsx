import TotalRatingCard from "@/components/review/TotalRatingCard";
import { ReviewFieldConfig } from "@/components/review/ReviewContent";

interface ReviewSummaryProps {
  reviewCount: number;
  totalRating: number;
  scoreData: Record<string, number>;
  fieldConfigs: ReviewFieldConfig[];
}

export default function ReviewSummary({
  reviewCount,
  totalRating,
  scoreData,
  fieldConfigs,
}: ReviewSummaryProps) {
  return (
    <section className="flex flex-col gap-3 bg-white px-5 pb-5 pt-6">
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 text-lg font-bold">
          <p>리뷰</p>
          <span className="text-tertiary-3">{reviewCount}</span>
        </div>
        <TotalRatingCard
          total={totalRating}
          scoreData={scoreData}
          fieldConfigs={fieldConfigs}
        />
      </div>
    </section>
  );
}
