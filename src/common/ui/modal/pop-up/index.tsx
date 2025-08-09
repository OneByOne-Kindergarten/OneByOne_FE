import React from "react";

import { cn } from "@/common/utils/cn";

import {
  BaseModal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../base-modal";

interface PopupModalProps {
  title?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  hasCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  size?: "sm" | "md" | "lg" | "full";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "bottom" | "top";
  overlay?: "none" | "sm" | "md" | "lg";
}

const PopupModal = React.forwardRef<HTMLDivElement, PopupModalProps>(
  ({ title, children, footer, className, ...props }, ref) => {
    return (
      <BaseModal
        position="center"
        rounded="xl"
        className={cn("overflow-hidden", className)}
        ref={ref}
        {...props}
      >
        {title && (
          <ModalHeader
            align="center"
            hasCloseButton={props.hasCloseButton}
            onClose={props.onClose}
            className="pb-2 pt-4 text-lg font-medium text-primary-dark02"
          >
            {title}
          </ModalHeader>
        )}
        <ModalContent className="max-h-[50vh] overflow-y-auto p-3 text-primary-dark01">
          {children}
        </ModalContent>
        {footer && (
          <ModalFooter align="center" className="px-3 py-4">
            {footer}
          </ModalFooter>
        )}
      </BaseModal>
    );
  }
);

PopupModal.displayName = "PopupModal";

export default PopupModal;
