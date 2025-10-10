import clsx from "clsx";

import { SortType } from "@/entities/review/DTO.d";
import { SORT_OPTIONS } from "@/shared/constants/review";
import Toggle from "@/shared/ui/buttons/base-toggle";

interface SortToggleProps {
  currentSortType: SortType;
  onSortChange: (sortType: SortType) => void;
}

export default function SortToggle({
  currentSortType,
  onSortChange,
}: SortToggleProps) {
  return (
    <div className="flex items-center gap-2.5">
      {SORT_OPTIONS.map(({ type: sortOptionType, label }) => (
        <Toggle
          key={sortOptionType}
          size="sm"
          onClick={() => onSortChange(sortOptionType)}
        >
          <div
            className={clsx("h-2 w-2 rounded-full", {
              "bg-star text-primary": currentSortType === sortOptionType,
              "bg-primary-normal03": currentSortType !== sortOptionType,
            })}
          />
          <span
            className={clsx("text-xs font-semibold", {
              "text-primary": currentSortType === sortOptionType,
              "text-primary-normal03": currentSortType !== sortOptionType,
            })}
          >
            {label}
          </span>
        </Toggle>
      ))}
    </div>
  );
}
