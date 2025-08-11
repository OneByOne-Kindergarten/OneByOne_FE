import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import Input from "@/shared/ui/form/input";

import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface OneLineCommentFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name?: FieldPath<TFieldValues>;
  label?: string;
}

export default function OneLineCommentField<TFieldValues extends FieldValues>({
  control,
  name,
  label = "한 줄 평가를 작성해주세요",
}: OneLineCommentFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={
        (name as FieldPath<TFieldValues>) ||
        ("oneLineComment" as FieldPath<TFieldValues>)
      }
      render={({ field }) => (
        <FormItem>
          <div className="flex justify-between">
            <FormLabel className="text-base font-semibold text-primary-dark01">
              {label}
            </FormLabel>
            <span className="text-xs font-semibold text-primary-normal02">
              *200자 이내
            </span>
          </div>
          <FormControl>
            <Input font="md" placeholder="내용을 입력해주세요" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
