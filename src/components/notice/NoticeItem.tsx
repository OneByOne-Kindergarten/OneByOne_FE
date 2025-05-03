import { Link } from "react-router-dom";

import { formatDate } from "@/utils/dateUtils";
import { URL_PATHS } from "@/constants/url-path";
import { cn } from "@/utils/cn";
import type { Notice } from "@/types/noticeDTO";

interface NoticeItemProps {
  notice: Notice;
  fontSize?: "sm" | "md";
}

function NoticeItem({ notice, fontSize = "sm" }: NoticeItemProps) {
  return (
    <li
      key={notice.id}
      className="flex flex-col gap-1 pt-2.5 pb-4 border-b border-primary-light02"
    >
      <Link to={URL_PATHS.NOTICE_DETAIL.replace(":id", notice.id.toString())}>
        <p
          className={cn(
            "text-primary-dark01 font-semibold truncate",
            fontSize === "sm" ? "text-sm" : "text-lg"
          )}
        >
          {notice.title}
        </p>
        <span className="text-primary-normal03 text-xs">
          {formatDate(notice.createdAt)}
        </span>
      </Link>
    </li>
  );
}

export default NoticeItem;
