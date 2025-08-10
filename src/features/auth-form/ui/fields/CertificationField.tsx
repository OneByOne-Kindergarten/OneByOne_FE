import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/form";
import Input from "@/shared/ui/form/input";

import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface CertificationFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name?: FieldPath<TFieldValues>;
  disabled?: boolean;
  placeholder?: string;
}

export default function CertificationField<TFieldValues extends FieldValues>({
  control,
  name,
  disabled,
  placeholder = "인증번호를 입력해주세요.",
}: CertificationFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={
        (name as FieldPath<TFieldValues>) ||
        ("certification" as FieldPath<TFieldValues>)
      }
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <Input
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
