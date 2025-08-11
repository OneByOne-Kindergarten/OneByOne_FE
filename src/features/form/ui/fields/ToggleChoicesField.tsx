import Toggle from "@/shared/ui/buttons/base-toggle";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";

import type { Control, FieldPath, FieldValues } from "react-hook-form";

export interface ToggleOption<T> {
  label: string;
  value: T;
}

interface ToggleChoicesFieldProps<TFieldValues extends FieldValues, TValue> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  options: ToggleOption<TValue>[];
  onChange?: (value: TValue) => void;
}

export default function ToggleChoicesField<
  TFieldValues extends FieldValues,
  TValue,
>({
  control,
  name,
  label,
  options,
  onChange,
}: ToggleChoicesFieldProps<TFieldValues, TValue>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold text-primary-dark01">
            {label}
          </FormLabel>
          <FormControl>
            <div className="flex flex-wrap gap-2">
              {options.map((opt) => (
                <Toggle
                  key={String(opt.value)}
                  variant="primary"
                  font="md"
                  size="lg"
                  shape="full"
                  value={opt.value as unknown as string}
                  pressed={field.value === opt.value}
                  onPressedChange={() => {
                    field.onChange(opt.value);
                    onChange?.(opt.value);
                  }}
                >
                  {opt.label}
                </Toggle>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
