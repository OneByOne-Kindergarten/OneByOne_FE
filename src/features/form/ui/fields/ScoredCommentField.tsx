import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import Textarea from "@/shared/ui/form/textarea";
import { BoxRatingGroup } from "@/shared/ui/rating/box-rating";

import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface ScoredCommentFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  commentName: FieldPath<TFieldValues>;
  scoreName: FieldPath<TFieldValues>;
  label: string;
}

export default function ScoredCommentField<TFieldValues extends FieldValues>({
  control,
  commentName,
  scoreName,
  label,
}: ScoredCommentFieldProps<TFieldValues>) {
  return (
    <div className="flex flex-col gap-2">
      <FormField
        control={control}
        name={commentName}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold text-primary-dark01">
              {label}에 대해서 알려주세요
            </FormLabel>
            <FormControl>
              <Textarea
                padding="sm"
                font="md"
                size="auto"
                placeholder="점수만 입력하고 내용은 생략 가능해요"
                value={field.value || ""}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={scoreName}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold text-primary-dark01">
              {label} 점수
            </FormLabel>
            <FormControl>
              <div className="flex justify-center">
                <BoxRatingGroup
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  size="md"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
