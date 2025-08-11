import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import Textarea from "@/shared/ui/form/textarea";

import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface TextareaFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  showCounter?: boolean;
  maxLength?: number;
}

export default function TextareaField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  showCounter = false,
  maxLength,
}: TextareaFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <div className="flex items-center justify-between">
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
            <Textarea
              font="md"
              padding="sm"
              placeholder={placeholder}
              {...field}
              value={(field.value as string) || ""}
              onChange={(e) => field.onChange(e.target.value)}
              onBlur={field.onBlur}
              error={!!fieldState.error}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
