import clsx from "clsx";

import { SVG_PATHS } from "@/shared/constants/assets-path";

interface ChatCountProps {
  count: number;
  className?: string;
}

export default function ChatCount({ count, className }: ChatCountProps) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center gap-1 text-xs font-semibold text-primary-normal03",
        className
      )}
    >
      <img
        src={SVG_PATHS.CHAT.LINE}
        alt="말풍선 아이콘"
        width={20}
        height={20}
      />
      <span>댓글</span>
      {count !== undefined && <span className="-ml-1">{`(${count})`}</span>}
    </div>
  );
}
