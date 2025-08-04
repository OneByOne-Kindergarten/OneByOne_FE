import PageLayout from "@/components/@shared/layout/page-layout";
import { Switch } from "@/components/@shared/switch";
import { URL_PATHS } from "@/constants/url-path";
import { useAlarmSettings } from "@/hooks/useAlarmSettings";

export default function AlarmSettingPage() {
  const { alarmSettings, toggleSetting, isUpdating } = useAlarmSettings();

  const alarmOptions = [
    {
      label: "전체 알림",
      type: "allNotificationsEnabled" as const,
    },
    {
      label: "커뮤니티 알림",
      type: "communityNotificationsEnabled" as const,
    },
    {
      label: "이벤트 및 혜택",
      type: "eventNotificationsEnabled" as const,
    },
  ];

  return (
    <PageLayout
      title="원바원 | 알람 설정"
      description="알림 설정"
      headerTitle="알림 설정"
      currentPath={URL_PATHS.USER}
    >
      <section className="flex flex-col gap-3 px-5 pt-5">
        <h1 className="font-bold text-primary-dark01">알림</h1>
        <ul className="flex flex-col gap-3">
          {alarmOptions.map((option) => (
            <li
              key={option.type}
              className="my-auto flex items-center justify-between"
            >
              <p className="text-sm text-primary-normal03">{option.label}</p>
              <Switch
                checked={alarmSettings?.[option.type] ?? false}
                onCheckedChange={() => toggleSetting(option.type)}
                disabled={isUpdating}
              />
            </li>
          ))}
        </ul>
      </section>
    </PageLayout>
  );
}
