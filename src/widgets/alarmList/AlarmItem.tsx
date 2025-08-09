import { useNavigate } from "react-router-dom";

import { URL_PATHS } from "@/common/constants/url-path";
import { cn } from "@/common/utils/cn";
import { formatDate } from "@/common/utils/dateUtils";
import { Alarm, AlarmType } from "@/entities/alarm/DTO";
import { useReadAlarm } from "@/entities/alarm/hooks";

interface AlarmItemProps {
  alarm: Alarm;
}

// 알림 타입에 따라 라벨 반환
const getAlarmTypeLabel = (type: AlarmType): string => {
  switch (type) {
    case "REVIEW":
      return "리뷰";
    case "COMMENT":
      return "댓글";
    case "LIKE":
      return "좋아요";
    case "SYSTEM":
      return "시스템";
    case "NOTICE":
      return "공지사항";
    default:
      return "알림";
  }
};

// 알림 타입에 따라 아이콘 반환
const getAlarmTypeIcon = (type: AlarmType): string => {
  switch (type) {
    case "REVIEW":
      return "⭐";
    case "COMMENT":
      return "💬";
    case "LIKE":
      return "❤️";
    case "SYSTEM":
      return "⚙️";
    case "NOTICE":
      return "📢";
    default:
      return "🔔";
  }
};

// 알림 타입과 targetId에 따라 이동할 경로 반환
// TODO : 테스트 필요
const getNavigationPath = (
  type: AlarmType,
  targetId?: number
): string | null => {
  if (!targetId) return null;

  switch (type) {
    case "COMMENT":
    case "LIKE":
      // 커뮤니티 게시글로 이동
      return URL_PATHS.COMMUNITY_POST.replace(":id", targetId.toString());
    case "REVIEW":
      // 리뷰 페이지로 이동 (유치원 상세의 리뷰 탭)
      return (
        URL_PATHS.KINDERGARTEN_DETAIL.replace(":id", targetId.toString()) +
        "?tab=review"
      );
    case "NOTICE":
      // 공지사항 상세로 이동
      return URL_PATHS.NOTICE_DETAIL.replace(":id", targetId.toString());
    case "SYSTEM":
      // 시스템 알림은 설정 페이지로 이동
      return URL_PATHS.USER_ACCOUNT_SETTING;
    default:
      return null;
  }
};

// 알림 아이템 컴포넌트
export default function AlarmItem({ alarm }: AlarmItemProps) {
  const { mutate: markAsRead } = useReadAlarm();
  const navigate = useNavigate();

  const handleClick = () => {
    // 읽지 않은 알림이면 읽음 처리
    if (!alarm.isRead) {
      markAsRead(alarm.id);
    }

    // 해당 페이지로 이동
    const navigationPath = getNavigationPath(alarm.type, alarm.targetId);
    if (navigationPath) {
      navigate(navigationPath);
    }
  };

  return (
    <li
      className={cn(
        "flex cursor-pointer flex-col gap-2 border-b border-primary-light02 p-4 transition-colors",
        !alarm.isRead ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-gray-50"
      )}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 text-lg">
          {getAlarmTypeIcon(alarm.type)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span
              className={cn(
                "rounded-full px-2 py-1 text-xs",
                !alarm.isRead
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600"
              )}
            >
              {getAlarmTypeLabel(alarm.type)}
            </span>
            {!alarm.isRead && (
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            )}
            {alarm.groupCount && alarm.groupCount > 1 && (
              <span className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700">
                +{alarm.groupCount - 1}
              </span>
            )}
          </div>
          <h3
            className={cn(
              "mb-1 line-clamp-1 text-sm font-medium",
              !alarm.isRead ? "text-primary-dark02" : "text-primary-dark01"
            )}
          >
            {alarm.title}
          </h3>
          <p
            className={cn(
              "line-clamp-2 whitespace-pre-line text-sm",
              !alarm.isRead ? "text-primary-dark01" : "text-primary-normal03"
            )}
          >
            {alarm.message}
          </p>
          <span className="mt-2 text-xs text-primary-normal03">
            {formatDate(alarm.createdAt)}
          </span>
        </div>
      </div>
    </li>
  );
}
