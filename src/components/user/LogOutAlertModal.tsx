import PopUpModal from "@/components/@shared/modal/pop-up";
import Button from "@/components/@shared/buttons/base-button";

interface LogOutAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  setIsSignOutModalOpen: (isOpen: boolean) => void;
}

export default function LogOutAlertModal({
  isOpen,
  onClose,
  onClick,
  setIsSignOutModalOpen,
}: LogOutAlertModalProps) {
  return (
    <PopUpModal
      isOpen={isOpen}
      onClose={onClose}
      className="text-center"
      title="로그아웃 하시겠어요?"
      footer={
        <div className="flex flex-1 gap-2">
          <Button
            className="w-full bg-primary-dark02 text-white"
            onClick={() => setIsSignOutModalOpen(false)}
          >
            취소
          </Button>
          <Button variant="secondary" className="w-full" onClick={onClick}>
            로그아웃
          </Button>
        </div>
      }
    >
      언제든지 다시 로그인하실 수 있습니다.
    </PopUpModal>
  );
}
