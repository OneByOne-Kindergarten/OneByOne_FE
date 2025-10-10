import { getCookie } from "@/entities/auth/api";
import { getSocialLoginUrl } from "@/entities/auth/hooks";
import { SVG_PATHS } from "@/shared/constants/assets-path";
import Button from "@/shared/ui/buttons/base-button";

interface OauthButtonProps {
  type: "kakao" | "naver" | "apple";
}

const oauthConfig = {
  kakao: {
    icon: SVG_PATHS.AUTH.OAUTH.KAKAO,
    className: "bg-[#FAE300] text-black",
    label: "KaKao",
  },
  naver: {
    icon: SVG_PATHS.AUTH.OAUTH.NAVER,
    className: "bg-[#20C803] text-white",
    label: "Naver",
  },
  apple: {
    icon: SVG_PATHS.AUTH.OAUTH.APPLE,
    className: "bg-black text-white",
    label: "Apple",
  },
};

export default function OauthButton({ type }: OauthButtonProps) {
  const config = oauthConfig[type];

  const handleSocialLogin = () => {
    try {
      if (type === "naver") {
        const state = Math.random().toString(36).substring(2, 15);
        const loginUrl = getSocialLoginUrl.naver(state);
        window.location.href = loginUrl;
      } else if (type === "kakao") {
        const loginUrl = getSocialLoginUrl.kakao();
        window.location.href = loginUrl;
      } else if (type === "apple") {
        const fcmToken = getCookie("fcmToken") || "";
        const loginUrl = getSocialLoginUrl.apple(fcmToken);
        window.location.href = loginUrl;
      }
    } catch (error) {
      console.error(`${type} 로그인 URL 생성 실패:`, error);
    }
  };

  return (
    <Button
      font="md"
      className={`relative ${config.className}`}
      onClick={handleSocialLogin}
    >
      <img
        src={config.icon}
        width="24"
        height="24"
        className="absolute left-4"
        alt={`${config.label} 로고`}
      />
      {config.label}로 시작하기
    </Button>
  );
}
