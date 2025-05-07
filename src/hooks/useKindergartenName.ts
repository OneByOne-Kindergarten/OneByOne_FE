import { useQuery } from "@tanstack/react-query";
import { getKindergartenName } from "@/services/kindergartenService";

export const useKindergartenName = (id: string) => {
  return useQuery({
    queryKey: ["kindergarten", "name", id],
    queryFn: () => getKindergartenName(Number(id)),
    enabled: !!id && id !== "unknown",
  });
};
