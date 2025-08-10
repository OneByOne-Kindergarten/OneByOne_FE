import BarRating from "@/shared/ui/rating/bar-rating";
import { StarRating } from "@/shared/ui/rating/star-rating";

export type RatingFieldConfig = {
  key: string;
  label: string;
};

export interface TotalRatingCardProps {
  total: number;
  scoreData: Record<string, number>;
  fieldConfigs: RatingFieldConfig[];
}

export default function TotalRatingCard({
  total,
  scoreData,
  fieldConfigs,
}: TotalRatingCardProps) {
  return (
    <div className="mx-auto flex w-full items-center justify-center gap-6 rounded-lg bg-primary-foreground px-2 py-4">
      <div className="flex flex-col items-center justify-center">
        <p className="text-3xl font-bold">{Number(total).toFixed(1)}</p>
        <StarRating value={total} />
      </div>
      <hr className="h-20 w-px bg-primary-normal01" />
      <ul className="flex w-1/2 flex-col text-xs font-semibold">
        {fieldConfigs.map((field) => {
          const value = scoreData[field.key] || 0;
          return (
            <li key={field.key} className="flex flex-1 text-primary-normal02">
              <p className="w-24">{field.label}</p>
              <div className="flex w-full items-center gap-3">
                <BarRating value={value} className="w-full py-0.5" />
                <span>{Number(value).toFixed(1)}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
