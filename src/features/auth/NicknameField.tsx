import {
  Control,
  FieldPath,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";

import Button from "@/common/ui/buttons/base-button";
import { FormField, FormItem, FormLabel, FormMessage } from "@/common/ui/form";
import { useRandomNickname } from "@/features/auth/useRandomNickname";

import { NicknameFieldContent } from "./NicknameFieldContent";

interface NicknameFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  setValue: UseFormSetValue<T>;
  label?: string;
  placeholder?: string;
}

export default function NicknameField<T extends FieldValues>({
  control,
  name,
  setValue,
  label = "선생님이 사용하실 닉네임이에요!",
  placeholder = "닉네임을 입력해주세요.",
}: NicknameFieldProps<T>) {
  const { isRandomNickname, handleRandomNickname, handleManualNickname } =
    useRandomNickname({
      setValue: setValue as UseFormSetValue<Record<string, unknown>>,
    });

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel className="font-semibold text-primary-dark01">
              {label}
            </FormLabel>

            <Button
              type="button"
              variant="transparent_gray"
              font="sm"
              size="sm"
              onClick={
                isRandomNickname ? handleManualNickname : handleRandomNickname
              }
            >
              <p>{isRandomNickname ? "직접 설정" : "랜덤 설정"}</p>
            </Button>
          </div>

          <NicknameFieldContent
            field={field}
            fieldState={fieldState}
            isRandomNickname={isRandomNickname}
            placeholder={placeholder}
          />

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
