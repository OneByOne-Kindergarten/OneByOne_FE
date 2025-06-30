import clsx from "clsx";
import { IMAGE_PATHS } from "@/constants/assets-path";

interface EmptyProps {
  title: string;
  subTitle?: string;
  className?: string;
  type?: "page" | "element";
}

export default function Empty({
  title,
  subTitle,
  className,
  type = "element",
}: EmptyProps) {
  return (
    <div
      className={clsx(
        className,
        "flex flex-col items-center justify-center gap-3 text-center",
        { "py-14": type === "element" }
      )}
      style={type === "page" ? { height: "calc(100vh - 112px)" } : undefined}
    >
      <img
        src={IMAGE_PATHS.LOGO.INACTIVE}
        alt="비활성화된 원바원 로고"
        className="h-16 w-24"
      />
      <div className="flex flex-col gap-1.5 text-primary-normal03">
        <p className="text-sm">{title}</p>
        <span className="text-xxs text-primary-normal02">{subTitle}</span>
      </div>
    </div>
  );
}
