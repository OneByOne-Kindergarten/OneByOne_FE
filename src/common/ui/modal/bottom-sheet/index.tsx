import React from "react";

import {
  BaseModal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/common/ui/modal/base-modal";
import { cn } from "@/common/utils/cn";

// BaseModal의 props에서 position과 ref 제외하고 확장
interface BottomSheetProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  isOpen?: boolean;
  onClose?: () => void;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  size?: "sm" | "md" | "lg" | "full";
  overlay?: "none" | "sm" | "md" | "lg";
}

const BottomSheet = React.forwardRef<HTMLDivElement, BottomSheetProps>(
  (
    {
      title,
      children,
      footer,
      className,
      contentClassName,
      showCloseButton = false,
      ...props
    },
    ref
  ) => {
    return (
      <BaseModal
        position="bottom"
        rounded="bottom"
        size="full"
        className={cn("max-h-[80vh] overflow-hidden", className)}
        ref={ref}
        hasCloseButton={showCloseButton}
        {...props}
      >
        {title && (
          <ModalHeader
            align="center"
            hasCloseButton={showCloseButton}
            onClose={props.onClose}
            className="relative pb-3 pt-11"
          >
            {/* 바텀 시트 드래그 핸들 */}
            <div className="absolute left-1/2 top-1 mt-1 h-1 w-10 -translate-x-1/2 rounded-full bg-primary-light02" />
            <h1 className="font-semibold">{title}</h1>
          </ModalHeader>
        )}
        <ModalContent className={cn("overflow-y-auto px-5", contentClassName)}>
          {children}
        </ModalContent>
        {footer && (
          <ModalFooter align="center" className="px-5 pb-9 pt-10">
            {footer}
          </ModalFooter>
        )}
      </BaseModal>
    );
  }
);

export default BottomSheet;
