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
        "flex justify-center flex-col gap-3 items-center text-center",
        { "py-14": type === "element" }
      )}
      style={type === "page" ? { height: "calc(100vh - 112px)" } : undefined}
    >
      <div className="bg-secondary-light03 rounded-full h-11 w-11 flex items-center justify-center">
        <img src={SVG_PATHS.ALERT} alt="경고 아이콘" width={31} height={31} />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-primary-dark02 font-semibold">서비스 오류</p>
        <span className="text-primary-dark01 text-sm">
          {children} <br /> 새로고침 해주세요
        </span>
      </div>
    </section>
  );
}
