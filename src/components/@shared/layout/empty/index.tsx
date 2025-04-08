import clsx from "clsx";
import { IMAGE_PATHS } from "@/constants/assets-path";

interface EmptyProps {
  children: React.ReactNode;
  className?: string;
  type?: "page" | "element";
}

export default function Empty({
  children,
  className,
  type = "element",
}: EmptyProps) {
  return (
    <section
      className={clsx(
        className,
        "flex justify-center flex-col gap-3 items-center text-center",
        { "py-14": type === "element" }
      )}
      style={type === "page" ? { height: "calc(100vh - 112px)" } : undefined}
    >
      <img
        src={IMAGE_PATHS.LOGO.INACTIVE}
        alt="비활성화된 원바원 로고"
        className="w-24 h-16"
      />
      <div className="flex flex-col gap-1.5 text-primary-normal03">
        {children}
      </div>
    </section>
  );
}
