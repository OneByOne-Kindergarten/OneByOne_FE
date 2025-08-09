import { useSuspenseQuery } from "@tanstack/react-query";

import { STATIC_CACHE_CONFIG } from "@/common/constants/query-config";

import { getNotices } from "../api";

export const useNotices = () => {
  return useSuspenseQuery({
    queryKey: ["notices"],
    queryFn: getNotices,
    ...STATIC_CACHE_CONFIG,
  });
};
