import { useNotices } from "@/hooks/useNotice";
import NoticeItem from "@/components/notice/NoticeItem";

export default function NoticeDetail({ id }: { id: number }) {
  const { data: notices } = useNotices();
  const notice = notices?.data.find((notice) => notice.id === id);

  if (!notice) {
    return <div>공지사항을 찾을 수 없습니다.</div>;
  }
  return (
    <div className="flex flex-col gap-5">
      <NoticeItem notice={notice} fontSize="md" />
      <div className="py-5 whitespace-pre-wrap text-xs text-primary-dark01">
        {notice.content}
      </div>
      <div className="flex flex-col gap-1 text-xs text-primary-dark01">
        <p>📞 고객센터: 0000-0000</p>
        <p>📧 이메일: support@[원바원].com</p>
      </div>
    </div>
  );
}
