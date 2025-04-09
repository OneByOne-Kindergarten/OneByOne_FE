import clsx from "clsx";

interface LoadingSpinnerProps {
  type?: "element" | "page";
  className?: string;
}

export default function LoadingSpinner({
  type = "element",
  className,
}: LoadingSpinnerProps) {
  return (
    <div
      className={clsx("flex justify-center items-center", className, {
        "py-14": type === "element",
      })}
      style={type === "page" ? { height: "calc(100vh - 112px)" } : undefined}
    >
      <div className="relative w-10 h-10">
        {/* 그라데이션 스피너 */}
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 10%, #FFFFFF 40%, #6CA6ED 100%)",
            maskImage: "radial-gradient(transparent 50%, white 52%)",
            WebkitMaskImage: "radial-gradient(transparent 50%, white 52%)",
          }}
        >
          {/* 파란색 끝 부분에 위치한 원형 점 */}
          <div
            className="absolute rounded-full bg-[#6CA6ED] w-[5.5px] h-[5.5px]"
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
