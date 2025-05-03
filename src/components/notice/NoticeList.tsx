import { useNotices } from "@/hooks/useNotice";
import NoticeItem from "@/components/notice/NoticeItem";

export default function NoticeList() {
  const { data: notices } = useNotices();

  return (
    <ul className="flex flex-col gap-2.5">
      {notices?.data.map((notice) => (
        <NoticeItem key={notice.id} notice={notice} />
      ))}
    </ul>
  );
}
