import NoticeItem from "@/components/notice/NoticeItem";
import { useNotices } from "@/hooks/useNotice";

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
