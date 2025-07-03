import Empty from "@/components/@shared/layout/empty";
import AlarmItem from "@/components/alarm/AlarmItem";
import { useAlarms } from "@/hooks/useAlarm";

// 알림 목록 컴포넌트
export default function AlarmList() {
  // 알림 목록 조회
  const { data: alarms } = useAlarms();

  // 알림이 없는 경우
  if (!alarms?.data || alarms.data.length === 0) {
    return (
      <Empty 
        title="아직 받은 알림이 없습니다" 
        subTitle="활동하시면 알림을 받을 수 있어요!"
      />
    );
  }

  // 알림이 있는 경우
  return (
    <ul className="flex flex-col">
      {alarms.data.map((alarm) => (
        <AlarmItem key={alarm.id} alarm={alarm} />
      ))}
    </ul>
  );
} 