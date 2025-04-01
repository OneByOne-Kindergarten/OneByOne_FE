import { SVG_PATHS } from "@/constants/assets-path";

export default function ChatCount({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5 text-xs font-semibold text-primary-normal03">
      <img
        src={SVG_PATHS.CHAT.line}
        alt="말풍선 아이콘"
        width={20}
        height={20}
      />
      <span>댓글</span>
      <span>({count})</span>
    </div>
  );
}
