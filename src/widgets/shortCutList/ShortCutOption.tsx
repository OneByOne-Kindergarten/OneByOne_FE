import { SVG_PATHS } from "@/common/constants/assets-path";
import type { Shortcut } from "@/entities/shortcuts/DTO.d";

interface ShortCutOptionProps {
  option: Shortcut;
  isAdded: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

export default function ShortCutOption({
  option,
  isAdded,
  isDisabled,
  onClick,
}: ShortCutOptionProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`flex items-center justify-between rounded-lg px-6 py-3 text-left ${
        isAdded
          ? "bg-primary-light01 text-primary-dark02 outline outline-1 outline-primary-dark01"
          : isDisabled
            ? "opacity-60"
            : "bg-primary-light01 hover:opacity-80"
      }`}
    >
      <div className="flex items-center gap-5">
        <img src={option.iconName} height={19} width={19} />
        <span className="text-sm">{option.name}</span>
      </div>
      {isAdded && <img src={SVG_PATHS.CHECK.green} height={19} width={19} />}
    </button>
  );
}
