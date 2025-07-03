import { cva, type VariantProps } from "class-variance-authority";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { SVG_PATHS } from "@/constants/assets-path";
import { cn } from "@/utils/cn";

const modalVariants = cva("bg-white shadow-lg overflow-hidden transition-all", {
  variants: {
    position: {
      center:
        "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] max-w-[90vw]",
      bottom: "fixed bottom-0 left-0 right-0 w-full max-h-[90vh]",
      top: "fixed top-0 left-0 right-0 w-full max-h-[90vh]",
    },
    size: {
      sm: "w-[300px]",
      md: "w-[400px]",
      lg: "w-[600px]",
      full: "w-full",
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      bottom: "rounded-t-xl",
      top: "rounded-b-xl",
    },
  },
  defaultVariants: {
    position: "center",
    size: "md",
    rounded: "lg",
  },
});

const overlayVariants = cva(
  "fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]",
  {
    variants: {
      blur: {
        none: "",
        sm: "backdrop-blur-sm",
        md: "backdrop-blur-md",
        lg: "backdrop-blur-lg",
      },
    },
    defaultVariants: {
      blur: "none",
    },
  }
);

const headerVariants = cva("flex items-center", {
  variants: {
    align: {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
      between: "justify-between",
    },
  },
  defaultVariants: {
    align: "between",
  },
});

const footerVariants = cva("flex gap-2 w-full", {
  variants: {
    align: {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
      between: "justify-between",
    },
  },
  defaultVariants: {
    align: "right",
  },
});

// 모달 프레임
interface BaseModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalVariants> {
  isOpen?: boolean;
  onClose?: () => void;
  hasCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  children?: React.ReactNode;
  overlay?: VariantProps<typeof overlayVariants>["blur"];
}

const BaseModal = React.forwardRef<HTMLDivElement, BaseModalProps>(
  (
    {
      isOpen = false,
      onClose,
      hasCloseButton = false,
      closeOnOverlayClick = true,
      children,
      className,
      position,
      size,
      rounded,
      overlay,
      ...props
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = useState(false);

    // 모달 외부 스크롤 막기
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }

      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen]);

    if (!isOpen || typeof window === "undefined") return null;

    // 드래그 추적을 통한 클릭 처리
    const handleMouseDown = () => setIsDragging(false);
    const handleMouseMove = () => setIsDragging(true);
    const handleMouseUp = (event: React.MouseEvent) => {
      if (
        !isDragging &&
        closeOnOverlayClick &&
        event.target === event.currentTarget
      ) {
        onClose?.();
      }
      setIsDragging(false);
    };

    return createPortal(
      <div
        className={cn(overlayVariants({ blur: overlay }))}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        data-testid="modal-overlay"
      >
        <div
          className={cn(modalVariants({ position, size, rounded }), className)}
          ref={ref}
          {...props}
          data-testid="modal-content"
        >
          {children}
        </div>
      </div>,
      document.body
    );
  }
);

// 모달의 상단 영역
interface ModalHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof headerVariants> {
  hasCloseButton?: boolean;
  onClose?: () => void;
}

const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, align, hasCloseButton, onClose, children, ...props }, ref) => {
    return (
      <section
        className={cn(headerVariants({ align }), className)}
        ref={ref}
        {...props}
        data-testid="modal-header"
      >
        {children}
        {hasCloseButton && (
          <button
            onClick={onClose}
            className="ml-auto text-gray-500 hover:text-gray-700"
            aria-label="Close"
            data-testid="modal-close-button"
          >
            <img src={SVG_PATHS.CANCEL} alt="닫기" />
          </button>
        )}
      </section>
    );
  }
);

// 모달의 중간 영역
interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <section
        className={cn("overflow-auto", className)}
        ref={ref}
        {...props}
        data-testid="modal-content-body"
      >
        {children}
      </section>
    );
  }
);

// 모달의 하단 영역
interface ModalFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof footerVariants> {}

const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, align, children, ...props }, ref) => {
    return (
      <section
        className={cn(footerVariants({ align }), className)}
        ref={ref}
        {...props}
        data-testid="modal-footer"
      >
        {children}
      </section>
    );
  }
);

export { BaseModal, ModalHeader, ModalContent, ModalFooter };
