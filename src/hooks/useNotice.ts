import { useSuspenseQuery } from "@tanstack/react-query";

import { STATIC_CACHE_CONFIG } from "@/constants/query-config";
import { getNotices } from "@/services/noticeService";

export const useNotices = () => {
  return useSuspenseQuery({
    queryKey: ["notices"],
    queryFn: getNotices,
    ...STATIC_CACHE_CONFIG,
  });
};
