import * as React from "react";
import { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import Button from "@/components/@shared/buttons/base-button";
import { cn } from "@/utils/cn";

const floatContainerVariants = cva(
  "fixed flex justify-end w-screen min-w-80 max-w-3xl",
  {
    variants: {
      position: {
        bottomRight: "bottom-20 px-8",
        bottomLeft: "bottom-6 px-8 justify-start",
        topRight: "top-6 px-8",
        topLeft: "top-6 px-8 justify-start",
        center: "bottom-6 justify-center",
      },
    },
    defaultVariants: {
      position: "bottomRight",
    },
  }
);

interface FloatButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof floatContainerVariants> {
  buttonProps?: React.ComponentProps<typeof Button>;
  children?: React.ReactNode;
}

const FloatButton = React.forwardRef<HTMLButtonElement, FloatButtonProps>(
  function FloatButton(
    { className, position, buttonProps, children, ...rest },
    ref
  ) {
    return (
      <div className={cn(floatContainerVariants({ position, className }))}>
        <Button
          ref={ref}
          variant="primary"
          shape="full"
          className="inline-flex items-center justify-center shadow-sm transition-all duration-300 ease-in-out"
          {...buttonProps}
          {...rest}
        >
          {children}
        </Button>
      </div>
    );
  }
);

FloatButton.displayName = "FloatButton";

export default FloatButton;
