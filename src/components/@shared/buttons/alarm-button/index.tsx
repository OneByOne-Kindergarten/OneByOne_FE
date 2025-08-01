import { Link } from "react-router-dom";

import { SVG_PATHS } from "@/constants/assets-path";
import { URL_PATHS } from "@/constants/url-path";
import { useUnreadAlarmCount } from "@/hooks/useAlarm";
import { cn } from "@/utils/cn";

// 알림 버튼 컴포넌트 속성 타입
interface AlarmButtonProps {
  className?: string;
}

// 알림 버튼 컴포넌트
export default function AlarmButton({ className }: AlarmButtonProps) {
  // 읽지 않은 알림 개수 조회
  const { data: unreadCountData } = useUnreadAlarmCount();
  const hasUnreadAlarms = (unreadCountData?.data || 0) > 0;

  return (
    <Link
      to={URL_PATHS.ALARM}
      className={cn(
        "relative flex h-10 w-10 items-center justify-end rounded-full transition-colors hover:brightness-75 active:brightness-75",
        className
      )}
      aria-label="알림함"
    >
      <img
        src={
          hasUnreadAlarms
            ? SVG_PATHS.NOTIFICATIONS.on
            : SVG_PATHS.NOTIFICATIONS.off
        }
        alt="알림 아이콘"
        width={24}
        height={24}
        className="text-primary-dark01"
      />
    </Link>
  );
}
