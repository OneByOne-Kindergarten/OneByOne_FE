import { useQuery } from "@tanstack/react-query";

import { isValidId, safeParseId } from "@/shared/utils/idValidation";

import { getKindergartenName } from "../api";

export const useKindergartenName = (id: string) => {
  const numericId = safeParseId(id);

  return useQuery({
    queryKey: ["kindergarten", "name", id],
    queryFn: () => getKindergartenName(numericId!),
    enabled: isValidId(id),
  });
};
