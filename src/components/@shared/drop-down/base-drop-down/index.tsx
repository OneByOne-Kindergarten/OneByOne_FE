import { cva, type VariantProps } from "class-variance-authority";
import React, { useState, useRef, useEffect } from "react";

import { SVG_PATHS } from "@/constants/assets-path";
import { cn } from "@/utils/cn";

const dropdownContainerVariants = cva("relative inline-block", {
  variants: {
    fullWidth: {
      true: "w-full",
      false: "",
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
});

const dropdownMenuVariants = cva(
  "absolute z-50 bg-white border border-primary-normal02 shadow-md rounded-lg overflow-hidden min-w-[120px]",
  {
    variants: {
      isOpen: {
        true: "block",
        false: "hidden",
      },
      position: {
        top: "bottom-full mb-1",
        bottom: "top-full mt-1",
        left: "right-full mr-1",
        right: "left-full ml-1",
      },
      align: {
        start: "",
        center: "",
        end: "",
      },
      width: {
        auto: "",
        full: "w-full",
      },
    },
    compoundVariants: [
      {
        position: "top",
        align: "start",
        className: "left-0",
      },
      {
        position: "top",
        align: "center",
        className: "left-1/2 -translate-x-1/2",
      },
      {
        position: "top",
        align: "end",
        className: "right-0",
      },
      {
        position: "bottom",
        align: "start",
        className: "left-0",
      },
      {
        position: "bottom",
        align: "center",
        className: "left-1/2 -translate-x-1/2",
      },
      {
        position: "bottom",
        align: "end",
        className: "right-0",
      },
    ],
    defaultVariants: {
      position: "bottom",
      align: "start",
      width: "auto",
    },
  }
);

const dropdownItemVariants = cva(
  "p-2.5 text-md text-primary-dark01 cursor-pointer border-b border-primary-normal02 flex justify-center items-center gap-2",
  {
    variants: {
      variant: {
        default: "hover:bg-secondary-light03",
        destructive: "text-red-600 hover:bg-red-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface DropdownOption {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?: "default" | "destructive";
  disabled?: boolean;
}

export interface DropdownProps
  extends VariantProps<typeof dropdownContainerVariants>,
    VariantProps<typeof dropdownMenuVariants> {
  options: DropdownOption[];
  trigger?: React.ReactNode;
  className?: string;
  menuClassName?: string;
  closeOnClick?: boolean;
  closeOnOutsideClick?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  position,
  align,
  width,
  fullWidth,
  trigger,
  className,
  menuClassName,
  closeOnClick = true,
  closeOnOutsideClick = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    if (!closeOnOutsideClick) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, closeOnOutsideClick]);

  return (
    <div
      ref={dropdownRef}
      className={cn(dropdownContainerVariants({ fullWidth }), className)}
    >
      {trigger ? (
        <div onClick={toggleDropdown} className="cursor-pointer">
          {trigger}
        </div>
      ) : (
        <button
          onClick={toggleDropdown}
          aria-label="드롭다운 열기"
          className="p-1"
        >
          <img src={SVG_PATHS.KEBAB} alt="메뉴" className="h-5 w-5" />
        </button>
      )}

      <div
        className={cn(
          dropdownMenuVariants({ isOpen, position, align, width }),
          menuClassName
        )}
      >
        {options.map((option, index) => (
          <div
            key={index}
            className={cn(
              dropdownItemVariants({ variant: option.variant }),
              option.disabled && "cursor-not-allowed opacity-50"
            )}
            onClick={() => {
              if (!option.disabled) {
                option.onClick();
                if (closeOnClick) setIsOpen(false);
              }
            }}
          >
            {option.icon && (
              <span className="dropdown-item-icon">{option.icon}</span>
            )}
            <span>{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 분리된 드롭다운 아이템 컴포넌트
interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive";
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const DropdownItem = ({
  children,
  variant = "default",
  disabled,
  icon,
  className,
  ...props
}: DropdownItemProps) => (
  <div
    className={cn(
      dropdownItemVariants({ variant }),
      disabled && "cursor-not-allowed opacity-50",
      className
    )}
    {...props}
  >
    {icon && <span className="dropdown-item-icon">{icon}</span>}
    <span>{children}</span>
  </div>
);

export default Dropdown;
