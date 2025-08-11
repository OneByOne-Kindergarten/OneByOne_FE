import clsx from "clsx";

import { SVG_PATHS } from "@/shared/constants/assets-path";

interface InquiryExpandButtonProps {
  expanded: boolean;
  onClick: () => void;
  ariaLabel?: string;
}

export default function InquiryExpandButton({
  expanded,
  onClick,
  ariaLabel = "문의 펼치기",
}: InquiryExpandButtonProps) {
  return (
    <button
      className="flex items-center gap-2"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <img
        src={SVG_PATHS.ARROW.right}
        width={28}
        height={28}
        alt="더보기"
        className={clsx(
          "transform-gpu transition-transform duration-200 ease-out will-change-transform motion-reduce:transition-none",
          expanded ? "rotate-90" : "rotate-0"
        )}
      />
    </button>
  );
}
