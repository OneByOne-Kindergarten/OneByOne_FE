import * as React from "react";
import { SVG_PATHS } from "@/constants/assets-path";

import { cn } from "@/utils/cn";
import Toggle from "@/components/@shared/buttons/base-toggle";

interface ToggleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconClassName?: string;
}

const ToggleInput = React.forwardRef<HTMLInputElement, ToggleInputProps>(
  ({ className, type, iconClassName, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          className={cn(
            "flex h-11 w-full rounded-md bg-primary-foreground text-primary p-5 pr-12 text-sm transition-colors focus-visible:outline-1 focus-visible:outline-primary-normal03 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-primary-normal03 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
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
