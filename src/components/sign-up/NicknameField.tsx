import { clsx } from "clsx";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/@shared/form";
import { useRandomNickname } from "@/hooks/useRandomNickname";
import Input from "@/components/@shared/form/input";
import Button from "@/components/@shared/buttons/base-button";
import { SVG_PATHS } from "@/constants/assets-path";
import {
  Control,
  FieldPath,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";

interface NicknameFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  setValue: UseFormSetValue<T>;
  label?: string;
  placeholder?: string;
}

export function NicknameField<T extends FieldValues>({
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
          <div className="relative flex items-center justify-between">
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
            {isRandomNickname && (
              <img
                src={SVG_PATHS.CHECK.blue}
                width={26}
                height={26}
                className="absolute right-3 top-10"
              />
            )}
          </div>
          <FormControl>
            <Input
              className={clsx(isRandomNickname && "border-tertiary-3")}
              placeholder={placeholder}
              error={!!fieldState.error}
              {...field}
            />
          </FormControl>
          {isRandomNickname && (
            <p className="mt-1 text-xs text-tertiary-3">
              안전한 커뮤니티 운영을 위한 닉네임이 자동으로 만들어졌어요
            </p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
