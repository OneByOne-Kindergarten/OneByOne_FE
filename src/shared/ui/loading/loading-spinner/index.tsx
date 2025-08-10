import clsx from "clsx";

interface LoadingSpinnerProps {
  type?: "element" | "page";
  className?: string;
}

export default function LoadingSpinner({
  type = "page",
  className,
}: LoadingSpinnerProps) {
  return (
    <div
      className={clsx("flex items-center justify-center", className, {
        "py-14": type === "element",
      })}
      style={type === "page" ? { height: "calc(100vh - 112px)" } : undefined}
    >
      <div className="relative h-10 w-10">
        {/* 그라데이션 스피너 */}
        <div
          className="absolute inset-0 animate-spin rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 10%, #FFFFFF 40%, #6CA6ED 100%)",
            maskImage: "radial-gradient(transparent 50%, white 52%)",
            WebkitMaskImage: "radial-gradient(transparent 50%, white 52%)",
          }}
        >
          {/* 파란색 끝 부분에 위치한 원형 점 */}
          <div
            className="absolute h-[5.5px] w-[5.5px] rounded-full bg-[#6CA6ED]"
            style={{
              top: "0px",
              left: "52%",
              marginLeft: "-2.5px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
