import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
  useQuery,
} from "@tanstack/react-query";
import {
  getAlarms,
  getUnreadAlarmCount,
  readAlarm,
  readAllAlarms,
} from "@/services/alarmService";
import { toast } from "@/hooks/useToast";
import type { Alarm } from "@/types/alarmDTO";

// 알림 데이터와 계산된 상태를 반환하는 메인 훅
export const useAlarms = () => {
  const query = useSuspenseQuery({
    queryKey: ["alarms"],
    queryFn: getAlarms,
    staleTime: 1000 * 60 * 5, /// 5분간 캐시 유지
  });

  // 읽지 않은 알림 개수 계산
  const unreadCount = query.data?.data?.filter((alarm: Alarm) => !alarm.isRead).length || 0;
  const hasUnreadAlarms = unreadCount > 0;

  return {
    ...query,
    unreadCount,
    hasUnreadAlarms,
  };
};

// 헤더 버튼용 가벼운 훅 (알림 데이터가 없으면 개수만 조회)
export const useUnreadAlarmCount = () => {
  const queryClient = useQueryClient();
  
  // 캐시된 알림 데이터가 있으면 거기서 계산
  const cachedAlarms = queryClient.getQueryData<{ data: Alarm[] }>(["alarms"]);
  
  if (cachedAlarms?.data) {
    const unreadCount = cachedAlarms.data.filter(alarm => !alarm.isRead).length;
    return {
      data: { data: unreadCount },
      isLoading: false,
      error: null,
    };
  }

  // 캐시된 데이터가 없으면 개수만 조회
  return useQuery({
    queryKey: ["unread-alarm-count"],
    queryFn: getUnreadAlarmCount,
    staleTime: 1000 * 60 * 2, // 2분간 캐시 유지
  });
};

export const useReadAlarm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (alarmId: number) => readAlarm(alarmId),
    onMutate: async (alarmId) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ["alarms"] });
      const previousAlarms = queryClient.getQueryData(["alarms"]);
      
      queryClient.setQueryData(["alarms"], (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.map((alarm: Alarm) =>
            alarm.id === alarmId ? { ...alarm, isRead: true } : alarm
          ),
        };
      });

      return { previousAlarms };
    },
    onError: (err, alarmId, context) => {
      // 에러 시 롤백
      if (context?.previousAlarms) {
        queryClient.setQueryData(["alarms"], context.previousAlarms);
      }
      toast({
        title: "알림 처리 실패",
        description: "알림 읽기 처리에 실패했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      // 캐시 무효화 (서버 상태와 동기화)
      queryClient.invalidateQueries({ queryKey: ["alarms"] });
      queryClient.invalidateQueries({ queryKey: ["unread-alarm-count"] });
    },
  });
};

export const useReadAllAlarms = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => readAllAlarms(),
    onMutate: async () => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ["alarms"] });
      const previousAlarms = queryClient.getQueryData(["alarms"]);
      
      queryClient.setQueryData(["alarms"], (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.map((alarm: Alarm) => ({ ...alarm, isRead: true })),
        };
      });

      return { previousAlarms };
    },
    onSuccess: () => {
      toast({
        title: "모든 알림 읽음 처리 완료",
        description: "모든 알림이 읽음 처리되었습니다.",
        variant: "default",
      });
    },
    onError: (err, variables, context) => {
      if (context?.previousAlarms) {
        queryClient.setQueryData(["alarms"], context.previousAlarms);
      }
      toast({
        title: "알림 처리 실패",
        description: "모든 알림 읽기 처리에 실패했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["alarms"] });
      queryClient.invalidateQueries({ queryKey: ["unread-alarm-count"] });
    },
  });
}; 