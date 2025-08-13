import { useMemo } from "react";

import type { UseFormReturn } from "react-hook-form";

export function useStartButtonState(
  isNicknamePending: boolean,
  isRolePending: boolean,
  nicknameForm: UseFormReturn<{ nickname: string }>,
  selectedRole?: "TEACHER" | "PROSPECTIVE_TEACHER"
) {
  return useMemo(() => {
    const nickname = nicknameForm.getValues("nickname");
    const isNicknameValid = nickname && nickname.trim().length >= 2;
    const isRoleSelected = selectedRole !== undefined;
    
    return (
      isNicknamePending ||
      isRolePending ||
      !isNicknameValid ||
      !isRoleSelected
    );
  }, [isNicknamePending, isRolePending, nicknameForm, selectedRole]);
}
