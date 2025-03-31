import BarRating from "@/components/@shared/rating/bar-rating";
import { StarRating } from "@/components/@shared/rating/star-rating";

interface TotalRatingCardProps {
  total: number;
  welfare: number;
  workLabel: number;
  atmosphere: number;
  manager: number;
  customer: number;
}

export default function TotalRatingCard({
  total,
  welfare,
  workLabel,
  atmosphere,
  manager,
  customer,
}: TotalRatingCardProps) {
  return (
    <div className="px-2 w-full py-4 bg-primary-foreground mx-auto rounded-lg flex items-center gap-6 justify-center">
      <div className="flex flex-col items-center justify-center">
        <p className="font-bold text-3xl">{total}</p>
        <StarRating value={total} />
      </div>
      <hr className="w-px h-20 bg-primary-normal01" />
      <ul className="flex flex-col font-semibold text-xs w-1/2">
        <li className="flex flex-1 text-primary-normal02">
          <p className="w-24">복지/급여</p>
          <div className="flex w-full items-center gap-3">
            <BarRating value={welfare} className="py-0.5 w-full" />
            <span>{welfare}</span>
          </div>
        </li>
        <li className="flex flex-1 text-primary-normal02">
          <p className="w-24">워라벨</p>
          <div className="flex w-full items-center gap-3">
            <BarRating value={workLabel} className="py-0.5 w-full" />
            <span>{workLabel}</span>
          </div>
        </li>
        <li className="flex flex-1 text-primary-normal02">
          <p className="w-24">분위기</p>
          <div className="flex w-full items-center gap-3">
            <BarRating value={atmosphere} className="py-0.5 w-full" />
            <span>{atmosphere}</span>
          </div>
        </li>
        <li className="flex flex-1 text-primary-normal02">
          <p className="w-24">관리자</p>
          <div className="flex w-full items-center gap-3">
            <BarRating value={manager} className="py-0.5 w-full" />
            <span>{manager}</span>
          </div>
        </li>
        <li className="flex flex-1 text-primary-normal02">
          <p className="w-24">고객</p>
          <div className="flex w-full items-center gap-3">
            <BarRating value={customer} className="py-0.5 w-full" />
            <span>{customer}</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
