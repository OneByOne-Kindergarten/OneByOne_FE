import Button from "@/components/@shared/buttons/base-button";
import { IMAGE_PATHS } from "@/constants/assets-path";

export default function CertificationBanner() {
  return (
    <div className="mx-3 mt-2 flex items-center justify-between rounded-lg bg-secondary-light02 px-5 py-4 shadow-sm">
      <div className="flex items-center gap-2">
        <img
          src={IMAGE_PATHS.CERTIFICATION}
          alt="서류 인증 이미지"
          width={43}
          height={40}
        />
        <p className="text-sm text-primary-dark01">
          <strong>교사 인증하면</strong> <br />
          <span className="text-xs">인증된 교사의 혜택을 받을 수 있어요!</span>
        </p>
      </div>
      <Button variant="primary" size="lg">
        인증하기
      </Button>
    </div>
  );
}
