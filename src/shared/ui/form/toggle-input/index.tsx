import * as React from "react";

import { SVG_PATHS } from "@/shared/constants/assets-path";
import Toggle from "@/shared/ui/buttons/base-toggle";
import { cn } from "@/shared/utils/cn";
import { filterPasswordInput } from "@/shared/utils/validationSchemas";

export interface ToggleInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  iconClassName?: string;
  error?: boolean;
}

const ToggleInput = React.forwardRef<HTMLInputElement, ToggleInputProps>(
  ({ className, type, iconClassName, error, onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isComposing, setIsComposing] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // IME 조합 시작
    const handleCompositionStart = () => {
      setIsComposing(true);
    };

    // IME 조합 완료
    const handleCompositionEnd = (
      e: React.CompositionEvent<HTMLInputElement>
    ) => {
      setIsComposing(false);
      // 조합 완료 후 필터링 적용
      const filteredValue = filterPasswordInput(e.currentTarget.value);
      if (filteredValue !== e.currentTarget.value) {
        const filteredEvent = {
          ...e,
          target: {
            ...e.currentTarget,
            value: filteredValue,
          },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange?.(filteredEvent);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isComposing) {
        const filteredValue = filterPasswordInput(e.target.value);

        if (filteredValue !== e.target.value) {
          const filteredEvent = {
            ...e,
            target: {
              ...e.target,
              value: filteredValue,
            },
          };
          onChange?.(filteredEvent);
          return;
        }
      }

      onChange?.(e);
    };

    return (
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          className={cn(
            "flex h-11 w-full rounded-lg border border-transparent bg-primary-foreground p-5 pr-12 text-sm text-primary transition-colors focus-visible:outline-none",
            error && "border-destructive",
            className
          )}
          ref={ref}
          onChange={handleChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          {...props}
        />
        <Toggle
          variant="default"
          size="sm"
          pressed={showPassword}
          onPressedChange={togglePasswordVisibility}
          className="absolute right-2 top-1/2 -translate-y-1/2"
          aria-label={showPassword ? "비밀번호 표시" : "비밀번호 숨기기"}
        >
          <img
            src={showPassword ? SVG_PATHS.EYE.on : SVG_PATHS.EYE.off}
            alt={showPassword ? "눈 뜬 아이콘" : "눈 감은 아이콘"}
            className={cn("size-5", iconClassName)}
          />
        </Toggle>
      </div>
    );
  }
);

ToggleInput.displayName = "ToggleInput";

export default ToggleInput;
