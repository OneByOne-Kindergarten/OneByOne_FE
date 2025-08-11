import { useCallback, useState } from "react";

import { URL_PATHS } from "@/shared/constants/url-path";

export function useRoleSelection(
  initialRole: "TEACHER" | "PROSPECTIVE_TEACHER",
  updateUserRole: (
    role: "TEACHER" | "PROSPECTIVE_TEACHER",
    opts?: { onSuccess?: () => void }
  ) => void,
  navigate: (to: string) => void
) {
  const [selectedRole, setSelectedRole] = useState<
    "TEACHER" | "PROSPECTIVE_TEACHER"
  >(initialRole);

  const handleRoleUpdate = useCallback(() => {
    updateUserRole(selectedRole, {
      onSuccess: () => navigate(URL_PATHS.USER),
    });
  }, [selectedRole, updateUserRole, navigate]);

  return { selectedRole, setSelectedRole, handleRoleUpdate };
}
