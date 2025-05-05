import BarRating from "@/components/@shared/rating/bar-rating";
import { StarRating } from "@/components/@shared/rating/star-rating";

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
    <div className="px-2 w-full py-4 bg-primary-foreground mx-auto rounded-lg flex items-center gap-6 justify-center">
      <div className="flex flex-col items-center justify-center">
        <p className="font-bold text-3xl">{Number(total).toFixed(1)}</p>
        <StarRating value={total} />
      </div>
      <hr className="w-px h-20 bg-primary-normal01" />
      <ul className="flex flex-col font-semibold text-xs w-1/2">
        {fieldConfigs.map((field) => {
          const value = scoreData[field.key] || 0;
          return (
            <li key={field.key} className="flex flex-1 text-primary-normal02">
              <p className="w-24">{field.label}</p>
              <div className="flex w-full items-center gap-3">
                <BarRating value={value} className="py-0.5 w-full" />
                <span>{Number(value).toFixed(1)}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
