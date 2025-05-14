import { Link } from "react-router-dom";
import { useNotices } from "@/hooks/useNotice";
import { SVG_PATHS } from "@/constants/assets-path";
import { URL_PATHS } from "@/constants/url-path";

export default function NoticeCard() {
  const { data: notices } = useNotices();

  return (
    <Link to={URL_PATHS.NOTICE}>
      <div className="flex gap-2 p-2.5 border border-primary-normal01 rounded-md">
        <img
          src={SVG_PATHS.NOTICE}
          alt="공지사항 아이콘"
          width={18}
          height={18}
        />
        <p className="text-primary-dark01 text-sm line-clamp-1">
          {notices?.data[0]?.title}
        </p>
      </div>
    </Link>
  );
}
