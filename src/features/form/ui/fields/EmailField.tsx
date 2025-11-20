import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import Input from "@/shared/ui/form/input";

import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface EmailFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name?: FieldPath<TFieldValues>;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
}

export default function EmailField<TFieldValues extends FieldValues>({
  control,
  name,
  disabled,
  label = "이메일",
  placeholder = "이메일을 입력해주세요.",
}: EmailFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={
        (name as FieldPath<TFieldValues>) ||
        ("email" as FieldPath<TFieldValues>)
      }
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder={placeholder}
              error={!!fieldState.error}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
