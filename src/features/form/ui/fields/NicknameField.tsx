import { clsx } from "clsx";
import {
  Control,
  FieldPath,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";

import { useRandomNickname } from "@/features/form/lib/useRandomNickname";
import { SVG_PATHS } from "@/shared/constants/assets-path";
import Button from "@/shared/ui/buttons/base-button";
import { FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import Input from "@/shared/ui/form/input";

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

          {(() => {
            const isManualValid =
              !isRandomNickname &&
              field.value &&
              !fieldState.invalid &&
              !fieldState.error;

            const inputClassName = clsx(
              isRandomNickname && "border-tertiary-3 !opacity-100",
              isManualValid && "border-green-normal01"
            );

            const checkIconSrc = isRandomNickname
              ? SVG_PATHS.FORM.CHECK.PRIMARY
              : SVG_PATHS.FORM.CHECK.SECONDARY;

            return (
              <>
                <div className="relative">
                  <Input
                    className={inputClassName}
                    placeholder={placeholder}
                    error={!!fieldState.error}
                    disabled={isRandomNickname}
                    {...field}
                  />
                  {(isRandomNickname || isManualValid) && (
                    <img
                      src={checkIconSrc}
                      width={26}
                      height={26}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    />
                  )}
                </div>

                {isRandomNickname && (
                  <p className="mt-1 text-xs text-tertiary-3">
                    커뮤니티 활동에 적합한 닉네임이 자동으로 만들어졌어요
                  </p>
                )}

                {isManualValid && (
                  <p className="mt-1 text-xs text-green-normal01">
                    사용 가능한 닉네임입니다.
                  </p>
                )}
              </>
            );
          })()}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
