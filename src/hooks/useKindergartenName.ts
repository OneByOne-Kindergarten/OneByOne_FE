import { useQuery } from "@tanstack/react-query";

import { getKindergartenName } from "@/services/kindergartenService";
import { isValidId, safeParseId } from "@/utils/idValidation";

export const useKindergartenName = (id: string) => {
  const numericId = safeParseId(id);

  return useQuery({
    queryKey: ["kindergarten", "name", id],
    queryFn: () => getKindergartenName(numericId!),
    enabled: isValidId(id),
  });
};
