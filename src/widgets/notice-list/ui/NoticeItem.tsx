import { Link } from "react-router-dom";

import type { Notice } from "@/entities/notice/DTO.d";
import { URL_PATHS } from "@/shared/constants/url-path";
import { formatDate } from "@/shared/utils/dateUtils";

interface NoticeItemProps {
  notice: Notice;
}

function NoticeItem({ notice }: NoticeItemProps) {
  return (
    <li
      key={notice.id}
      className="flex flex-col gap-1 border-b border-primary-light02 pb-4 pt-2.5"
    >
      <Link to={URL_PATHS.NOTICE_DETAIL.replace(":id", notice.id.toString())}>
        <p className="truncate text-sm font-semibold text-primary-dark01">
          {notice.title}
        </p>
        <span className="text-xs text-primary-normal03">
          {formatDate(notice.createdAt)}
        </span>
      </Link>
    </li>
  );
}

export default NoticeItem;
