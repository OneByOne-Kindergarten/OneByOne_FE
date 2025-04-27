import { SVG_PATHS } from "@/constants/assets-path";
import { useState, useRef, useCallback } from "react";

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
        src={SVG_PATHS.QUESTION}
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
        className={`
          px-2.5 py-1 absolute top-5 bg-tertiary-3 text-nowrap rounded-md
          transition-all duration-100 ease-in-out
          ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-1 pointer-events-none"
          }
        `}
        role="tooltip"
        aria-hidden={!isOpen}
      >
        <p className="text-xs text-white">{children}</p>
      </div>
    </div>
  );
}
