import { useMemo } from "react";

import type { UseFormReturn } from "react-hook-form";

export function useStartButtonState(
  isNicknamePending: boolean,
  isRolePending: boolean,
  nicknameForm: UseFormReturn<{ nickname: string }>
) {
  return useMemo(
    () =>
      isNicknamePending ||
      isRolePending ||
      !nicknameForm.formState.isValid ||
      !nicknameForm.getValues("nickname"),
    [isNicknamePending, isRolePending, nicknameForm]
  );
}
