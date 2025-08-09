import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/common/hooks/useToast";

import { getAlarmSettings, updateAlarmSettings } from "../api";
import { AlarmSetting } from "../DTO";

export const useAlarmSettings = () => {
  const queryClient = useQueryClient();

  const {
    data: alarmSettings,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["alarmSettings"],
    queryFn: getAlarmSettings,
    staleTime: 5 * 60 * 1000, // 5분
  });

  const updateSettingsMutation = useMutation({
    mutationFn: updateAlarmSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alarmSettings"] });
    },
    onError: (error) => {
      toast({
        title: "알림 설정 실패",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateSettings = (settings: AlarmSetting) => {
    updateSettingsMutation.mutate(settings);
  };

  // 스위치 토글 상태 변경 함수
  const toggleSetting = (settingKey: keyof AlarmSetting) => {
    if (!alarmSettings?.data) return;

    const updatedSettings = {
      ...alarmSettings.data,
      [settingKey]: !alarmSettings.data[settingKey],
    };

    updateSettings(updatedSettings);
  };

  return {
    alarmSettings: alarmSettings?.data,
    isLoading,
    error,
    refetch,
    updateSettings,
    toggleSetting,
    isUpdating: updateSettingsMutation.isPending,
  };
};
