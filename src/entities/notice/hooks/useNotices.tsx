import { useSuspenseQuery } from "@tanstack/react-query";

import { STATIC_CACHE_CONFIG } from "@/shared/config/query";

import { getNotices } from "../api";

export const useNotices = () => {
  return useSuspenseQuery({
    queryKey: ["notices"],
    queryFn: getNotices,
    ...STATIC_CACHE_CONFIG,
  });
};
