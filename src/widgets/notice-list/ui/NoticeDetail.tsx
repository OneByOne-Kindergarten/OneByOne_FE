import type { Notice, NoticeResponse } from "@/entities/notice/DTO.d";
import { useNotices } from "@/entities/notice/hooks/useNotices";
import Error from "@/shared/ui/layout/error";
import { formatDate } from "@/shared/utils/dateUtils";

export default function NoticeDetail({ id }: { id: number }) {
  const { data: notices } = useNotices();
  const noticeList: Notice[] =
    notices &&
    typeof notices === "object" &&
    notices !== null &&
    "data" in notices
      ? (notices as NoticeResponse).data
      : [];
  const notice = noticeList.find((n: Notice) => n.id === id);

  if (!notice) {
    return <Error type="page">공지사항 부재</Error>;
  }

  return (
    <div className="flex flex-col gap-5">
      <section className="flex flex-col gap-1 border-b border-primary-light02 pb-4">
        <p className="text-primary-dark03 truncate text-lg font-semibold">
          {notice.title}
        </p>
        <span className="text-sm text-primary-normal03">
          {formatDate(notice.createdAt)}
        </span>
      </section>
      <section className="whitespace-pre-wrap py-5 text-xs text-primary-dark01">
        <p>{notice.content}</p>
      </section>
      <section className="flex flex-col gap-1 text-xs text-primary-dark01">
        <p>📧 이메일: saegimworks@gmail.com</p>
      </section>
    </div>
  );
}
