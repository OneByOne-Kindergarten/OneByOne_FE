import { useMemo } from "react";

import { CommunityCategoryType } from "@/widgets/community-feed/lib/category";

type MaybeUser = { role?: string; nickname?: string } | null | undefined;

export function useProfileDefaults(user: MaybeUser) {
  return useMemo(() => {
    const isNewUser = !user?.role || user.role === "GENERAL";
    const defaultRole = (
      !user?.role || user.role === "GENERAL" || user.role === "ADMIN"
        ? "TEACHER"
        : (user.role as CommunityCategoryType)
    ) as CommunityCategoryType;
    const defaultNickname = user?.nickname || "";

    return { isNewUser, defaultRole, defaultNickname };
  }, [user?.role, user?.nickname]);
}
