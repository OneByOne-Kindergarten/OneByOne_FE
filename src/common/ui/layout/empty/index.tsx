import clsx from "clsx";

import { IMAGE_PATHS } from "@/common/constants/assets-path";

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
    <section
      className={clsx(
        className,
        "flex flex-col items-center justify-center gap-3 text-center",
        { "py-14": type === "element" }
      )}
      style={type === "page" ? { height: "calc(100vh - 112px)" } : undefined}
    >
      <div>
        <img
          src={IMAGE_PATHS.LOGO.INACTIVE}
          alt="비활성화된 원바원 로고"
          width={96}
          height={64}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-sm text-primary-normal03">{title}</p>
        <span className="text-xs text-primary-normal02">{subTitle}</span>
      </div>
    </section>
  );
}
