import { SVG_PATHS } from "@/constants/assets-path";

export default function NoticeCard() {
  return (
    <div className="flex gap-2 p-2.5 border border-primary-normal01 rounded-md">
      <img
        src={SVG_PATHS.NOTICE}
        alt="공지사항 아이콘"
        width={18}
        height={18}
      />
      <p className="text-primary-dark01 text-sm line-clamp-1">
        공지사항공지사항공지사항공지사항공지사항공지사항공지사항
      </p>
    </div>
  );
}
