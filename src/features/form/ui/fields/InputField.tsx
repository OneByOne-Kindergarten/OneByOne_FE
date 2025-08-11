import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import Input from "@/shared/ui/form/input";

import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface InputFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  showCounter?: boolean;
  maxLength?: number;
}

export default function InputField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  showCounter = false,
  maxLength,
}: InputFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <div className="flex justify-between">
            <FormLabel className="text-base font-semibold text-primary-dark01">
              {label}
            </FormLabel>
            {showCounter && typeof field.value === "string" && maxLength && (
              <span className="text-xs font-semibold text-primary-normal02">
                *{field.value.length}/{maxLength}자
              </span>
            )}
          </div>
          <FormControl>
            <Input
              font="md"
              placeholder={placeholder}
              {...field}
              error={!!fieldState.error}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
