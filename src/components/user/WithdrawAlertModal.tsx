import PopUpModal from "@/components/@shared/modal/pop-up";
import Button from "@/components/@shared/buttons/base-button";
import { SVG_PATHS } from "@/constants/assets-path";

interface WithdrawAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  setIsWithdrawModalOpen: (isOpen: boolean) => void;
}

export default function WithdrawAlertModal({
  isOpen,
  onClose,
  onClick,
  setIsWithdrawModalOpen,
}: WithdrawAlertModalProps) {
  return (
    <PopUpModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex flex-col gap-3 items-center">
          <div className="w-11 h-11 rounded-full bg-secondary-light03 flex items-center justify-center">
            <img
              src={SVG_PATHS.ALERT}
              alt="경고 아이콘"
              width={30}
              height={30}
            />
          </div>
          <p className="font-semibold text-primary-dark02">회원 탈퇴</p>
        </div>
      }
      className="text-center"
      footer={
        <div className="flex flex-1 gap-2">
          <Button
            className="w-full bg-primary-dark02 text-white"
            onClick={() => setIsWithdrawModalOpen(false)}
          >
            취소
          </Button>
          <Button variant="secondary" className="w-full" onClick={onClick}>
            탈퇴
          </Button>
        </div>
      }
    >
      정말로 탈퇴하시겠어요? <br /> 탈퇴 후에는 계정을 복구할 수 없습니다.
    </PopUpModal>
  );
}
