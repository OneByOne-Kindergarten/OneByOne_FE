import { useQuery } from "@tanstack/react-query";

import { blockService } from "@/entities/block/api";

export function useGetBlockedUsers() {
  return useQuery({
    queryKey: ["blockedUsers"],
    queryFn: blockService.getBlockedUsers,
  });
}
