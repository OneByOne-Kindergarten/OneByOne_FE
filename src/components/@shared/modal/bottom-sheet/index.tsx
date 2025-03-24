import React from "react";
import {
  BaseModal,
  ModalHeader,
  ModalContent,
  ModalFooter,
} from "@/components/@shared/modal/base-modal";
import { cn } from "@/utils/cn";

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
        className={cn("overflow-hidden max-h-[80vh]", className)}
        ref={ref}
        hasCloseButton={showCloseButton}
        {...props}
      >
        {title && (
          <ModalHeader
            align="center"
            hasCloseButton={showCloseButton}
            onClose={props.onClose}
            className="pt-11 pb-3 relative"
          >
            {/* 바텀 시트 드래그 핸들 */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-1 mt-1 bg-primary-light02 rounded-full" />
            <div className="font-semibold">{title}</div>
          </ModalHeader>
        )}
        <ModalContent className={cn("overflow-y-auto px-5", contentClassName)}>
          {children}
        </ModalContent>
        {footer && (
          <ModalFooter align="center" className="pb-9 pt-10 px-5">
            {footer}
          </ModalFooter>
        )}
      </BaseModal>
    );
  }
);

export default BottomSheet;
