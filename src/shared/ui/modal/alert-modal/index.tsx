import { SVG_PATHS } from "@/shared/constants/assets-path";
import Button from "@/shared/ui/buttons/base-button";
import PopUpModal from "@/shared/ui/modal/pop-up";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  confirmText?: string;
  children: React.ReactNode;
}

export default function AlertModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  confirmText = "확인",
  children,
}: AlertModalProps) {
  return (
    <PopUpModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary-light03">
            <img
              src={SVG_PATHS.ALERT}
              alt="경고 아이콘"
              width={30}
              height={30}
            />
          </div>
          <p className="font-semibold text-primary-dark02">{title}</p>
        </div>
      }
      className="text-center"
      closeOnOverlayClick={false}
      footer={
        <div className="flex flex-1 gap-2">
          <Button
            className="w-full bg-primary-dark02 text-white"
            onClick={onClose}
          >
            취소
          </Button>
          <Button variant="secondary" className="w-full" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      }
    >
      {children}
    </PopUpModal>
  );
}

