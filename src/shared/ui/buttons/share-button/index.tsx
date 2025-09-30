import clsx from "clsx";

import SVG_PATH from "@/app/assets/icons/share.svg";
import { useKakaoShare } from "@/shared/hooks/useFlutterCommunication";
import Button from "@/shared/ui/buttons/base-button";
import { toast } from "@/shared/hooks/useToast";
import { KakaoShareRequest } from "@/shared/utils/webViewCommunication";

interface ShareButtonProps {
  variant?: "primary" | "secondary";
  className?: string;
  size?: "sm" | "md" | "lg" | "xs";
  shareData?: KakaoShareRequest;
  onClick?: () => void;
}

export default function ShareButton({
  variant = "primary",
  size = "sm",
  className,
  shareData,
  onClick,
}: ShareButtonProps) {
  const [shareToKakao] = useKakaoShare();

  const handleShare = async () => {
    if (onClick) {
      onClick();
      return;
    }

    if (!shareData) {
      console.warn("공유할 데이터가 없습니다.");
      return;
    }

    try {
      const result = await shareToKakao(shareData);
      
      // 앱 환경이 아닌 경우에만 토스트 표시
      if (result.status === "error" && result.message === "앱 환경에서만 지원되는 기능입니다.") {
        toast({
          title: "공유 기능 안내",
          description: "카카오 공유는 앱에서만 지원됩니다.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("카카오 공유 오류:", error);
    }
  };

  return (
    <Button
      font="xs_sb"
      size={size}
      variant="transparent_gray"
      border={variant === "secondary" ? "gray" : "none"}
      className={clsx(className, "my-auto gap-0.5")}
      onClick={handleShare}
    >
      <img src={SVG_PATH} alt="share" width={20} height={20} />
      카카오 공유
    </Button>
  );
}
