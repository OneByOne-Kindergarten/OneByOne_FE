import { useNotices } from "@/entities/notice/hooks/useNotices";
import NoticeItem from "@/widgets/notice-list/ui/NoticeItem";

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
