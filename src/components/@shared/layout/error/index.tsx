import clsx from "clsx";
import { SVG_PATHS } from "@/constants/assets-path";

interface ErrorProps {
  children: React.ReactNode;
  className?: string;
  type?: "page" | "element";
}

export default function Error({
  children,
  className,
  type = "element",
}: ErrorProps) {
  return (
    <section
      className={clsx(
        className,
        "flex flex-col items-center justify-center gap-3 text-center",
        { "py-14": type === "element" }
      )}
      style={type === "page" ? { height: "calc(100vh - 112px)" } : undefined}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary-light03">
        <img src={SVG_PATHS.ALERT} alt="경고 아이콘" width={31} height={31} />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="font-semibold text-primary-dark02">서비스 오류</p>
        <span className="text-sm text-primary-dark01">
          {children} <br /> 잠시 후 다시 시도해보세요.
        </span>
      </div>
    </section>
  );
}
