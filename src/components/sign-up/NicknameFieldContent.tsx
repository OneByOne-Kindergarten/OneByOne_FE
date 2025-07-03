import { clsx } from "clsx";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

import Input from "@/components/@shared/form/input";
import { SVG_PATHS } from "@/constants/assets-path";

interface NicknameFieldContentProps<T extends FieldValues = FieldValues> {
  field: ControllerRenderProps<T, FieldPath<T>>;
  fieldState: ControllerFieldState;
  isRandomNickname: boolean;
  placeholder: string;
}

const getInputStyles = (isRandomNickname: boolean, isManualValid: boolean) => {
  return clsx(
    isRandomNickname && "border-tertiary-3 !opacity-100",
    isManualValid && "border-green-normal01"
  );
};

const getCheckIconProps = (
  isRandomNickname: boolean,
  isManualValid: boolean
) => {
  if (!isRandomNickname && !isManualValid) return null;

  return {
    src: isRandomNickname ? SVG_PATHS.CHECK.blue : SVG_PATHS.CHECK.green,
    className: "absolute right-3 top-1/2 -translate-y-1/2",
  };
};

export function NicknameFieldContent<T extends FieldValues = FieldValues>({
  field,
  fieldState,
  isRandomNickname,
  placeholder,
}: NicknameFieldContentProps<T>) {
  const isManualValid =
    !isRandomNickname &&
    field.value &&
    !fieldState.invalid &&
    !fieldState.error;

  const checkIconProps = getCheckIconProps(isRandomNickname, isManualValid);
  const inputClassName = getInputStyles(isRandomNickname, isManualValid);

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

        {checkIconProps && (
          <img
            src={checkIconProps.src}
            width={26}
            height={26}
            className={checkIconProps.className}
          />
        )}
      </div>

      {isRandomNickname && (
        <p className="mt-1 text-xs text-tertiary-3">
          안전한 커뮤니티 운영을 위한 닉네임이 자동으로 만들어졌어요
        </p>
      )}

      {isManualValid && (
        <p className="text-green-normal01 mt-1 text-xs">
          사용 가능한 닉네임입니다.
        </p>
      )}
    </>
  );
}
