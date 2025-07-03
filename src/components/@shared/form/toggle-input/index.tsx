import * as React from "react";

import Toggle from "@/components/@shared/buttons/base-toggle";
import { SVG_PATHS } from "@/constants/assets-path";
import { cn } from "@/utils/cn";

export interface ToggleInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  iconClassName?: string;
  error?: boolean;
}

const ToggleInput = React.forwardRef<HTMLInputElement, ToggleInputProps>(
  ({ className, type, iconClassName, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
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
