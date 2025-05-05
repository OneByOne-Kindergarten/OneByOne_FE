import Button from "@/components/@shared/buttons/base-button";
import BottomSheet from "@/components/@shared/modal/bottom-sheet";
import { StarRating } from "@/components/@shared/rating/star-rating";
import { SVG_PATHS } from "@/constants/assets-path";
import { useState } from "react";

interface RatingFilterProps {
  reviewCounts?: {
    [key: number]: number;
  };
}

const DEFAULT_REVIEW_COUNTS = {
  5: 0,
  4: 0,
  3: 0,
  2: 0,
  1: 0,
};

export default function RatingFilter({
  reviewCounts = DEFAULT_REVIEW_COUNTS,
}: RatingFilterProps) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsBottomSheetOpen(true)}
        font="sm_sb"
        className="text-primary-dark01 py-1.5"
        size="sm"
      >
        <img src={SVG_PATHS.STAR.darkgray} alt="드롭다운 아이콘" />
        필터
      </Button>

      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        title="필터"
        footer={
          <Button
            variant="primary"
            className="w-full"
            onClick={() => setIsBottomSheetOpen(false)}
          >
            확인
          </Button>
        }
      >
        <h2 className="text-primary-normal03 text-sm mb-3">별점</h2>
        <div className="flex flex-col gap-2">
          {Object.entries(reviewCounts)
            .reverse()
            .map(([score, count]) => (
              <button
                key={score}
                className="flex items-center justify-between gap-2 border-b pb-2"
              >
                <StarRating
                  value={Number(score)}
                  size="lg"
                  className="pointer-events-none"
                />
                <span className="text-primary-normal03 text-sm">{count}</span>
              </button>
            ))}
        </div>
      </BottomSheet>
    </>
  );
}
