import { Link } from "react-router-dom";

import { SVG_PATHS } from "@/constants/assets-path";
import { URL_PATHS } from "@/constants/url-path";
import { useNotices } from "@/hooks/useNotice";

export default function NoticeCard() {
  const { data: notices } = useNotices();

  return (
    <Link to={URL_PATHS.NOTICE}>
      <div className="flex gap-2 rounded-lg border border-primary-normal01 p-2.5">
        <img
          src={SVG_PATHS.NOTICE}
          alt="공지사항 아이콘"
          width={18}
          height={18}
        />
        <p className="line-clamp-1 text-sm text-primary-dark01">
          {notices?.data[0]?.title}
        </p>
      </div>
    </Link>
  );
}
