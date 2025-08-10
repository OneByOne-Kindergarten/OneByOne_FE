import { useCallback, useRef, useState } from "react";

import { SVG_PATHS } from "@/shared/constants/assets-path";

export default function ToolTip({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const toggleTooltip = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent) => {
    // 현재 요소나 자식 요소로 포커스가 이동하는 경우가 아니라면 닫기
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(e.relatedTarget as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  return (
    <div className="relative" ref={tooltipRef} onBlur={handleBlur} tabIndex={0}>
      <img
        src={SVG_PATHS.QUESTION.BASE}
        alt="도움말 아이콘"
        width={17}
        height={17}
        onClick={toggleTooltip}
        onKeyDown={(e) => e.key === "Enter" && toggleTooltip()} // 키보드 접근성
        className="cursor-pointer hover:opacity-80"
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
      />
      <div
        className={`absolute left-0 top-6 z-50 min-w-max rounded-lg bg-tertiary-3 px-2.5 py-1 transition-all duration-100 ease-in-out ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        } `}
        role="tooltip"
        aria-hidden={!isOpen}
      >
        <p className="max-w-48 break-words text-xs text-white">{children}</p>
      </div>
    </div>
  );
}
