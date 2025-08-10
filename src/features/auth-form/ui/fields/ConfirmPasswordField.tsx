import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import ToggleInput from "@/shared/ui/form/toggle-input";

import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface ConfirmPasswordFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name?: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
}

export default function ConfirmPasswordField<TFieldValues extends FieldValues>({
  control,
  name,
  label = "비밀번호 확인",
  placeholder = "비밀번호를 다시 한번 입력해주세요.",
}: ConfirmPasswordFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={
        (name as FieldPath<TFieldValues>) ||
        ("confirmPassword" as FieldPath<TFieldValues>)
      }
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <ToggleInput
              placeholder={placeholder}
              error={!!fieldState.error}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
