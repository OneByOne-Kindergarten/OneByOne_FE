import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import Button from "@/components/@shared/buttons/base-button";
import BottomSheet from "@/components/@shared/modal/bottom-sheet";
import { RadioGroup, RadioGroupItem } from "@/components/@shared/radio-group";
import { SVG_PATHS } from "@/constants/assets-path";
import { KindergartenSortOption } from "@/types/kindergartenDTO";

interface SortOptionType {
  value: KindergartenSortOption;
  label: string;
}

const SCHOOL_SORT_OPTIONS: SortOptionType[] = [
  { value: "RATING", label: "별점순" },
  { value: "REVIEW_COUNT", label: "리뷰순" },
];

export default function SchoolSearchOrder() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // URL에서 현재 정렬 상태 읽기
  const currentSort =
    (searchParams.get("sort") as KindergartenSortOption) || "RATING";
  const [selectedSort, setSelectedSort] =
    useState<KindergartenSortOption>(currentSort);

  const currentSortLabel =
    SCHOOL_SORT_OPTIONS.find((option) => option.value === currentSort)?.label ||
    "별점순";

  const handleBottomSheetOpen = () => {
    setSelectedSort(currentSort); // 현재 선택된 정렬로 초기화
    setIsBottomSheetOpen(true);
  };

  const handleBottomSheetClose = () => {
    setSelectedSort(currentSort); // 취소 시 원래 선택으로 되돌림
    setIsBottomSheetOpen(false);
  };

  const handleConfirm = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("sort", selectedSort);
      return newParams;
    });
    setIsBottomSheetOpen(false);
  };

  return (
    <>
      <button
        onClick={handleBottomSheetOpen}
        className="flex items-center gap-1"
      >
        <span className="text-sm font-semibold text-primary-dark01">
          {currentSortLabel}
        </span>
        <img
          src={SVG_PATHS.ARROW.left}
          width={20}
          height={20}
          alt="아래 화살표"
          className="-rotate-90"
        />
      </button>

      <BottomSheet
        title="정렬 필터"
        isOpen={isBottomSheetOpen}
        onClose={handleBottomSheetClose}
        closeOnOverlayClick={true}
        footer={
          <Button
            variant="secondary"
            onClick={handleConfirm}
            className="w-full"
          >
            확인
          </Button>
        }
      >
        <RadioGroup
          value={selectedSort}
          onValueChange={(value) =>
            setSelectedSort(value as KindergartenSortOption)
          }
          className="flex flex-col gap-6"
        >
          {SCHOOL_SORT_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center gap-3">
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className="flex-shrink-0"
              />
              <label
                htmlFor={option.value}
                className="cursor-pointer text-base font-medium text-primary-dark01"
              >
                {option.label}
              </label>
            </div>
          ))}
        </RadioGroup>
      </BottomSheet>
    </>
  );
}
