import { SVG_PATHS } from "@/common/constants/assets-path";
import Button from "@/common/ui/buttons/base-button";
import { getCookie } from "@/entities/auth/api";
import { getSocialLoginUrl } from "@/entities/auth/hooks";

interface OauthButtonProps {
  type: "kakao" | "naver" | "apple";
}

export default function OauthButton({ type }: OauthButtonProps) {
  const oauthConfig = {
    kakao: {
      icon: SVG_PATHS.OAUTH.kakao,
      className: "bg-[#FAE300] text-black",
      label: "KaKao",
    },
    naver: {
      icon: SVG_PATHS.OAUTH.naver,
      className: "bg-[#20C803] text-white",
      label: "Naver",
    },
    apple: {
      icon: SVG_PATHS.OAUTH.apple,
      className: "bg-black text-white",
      label: "Apple",
    },
  };

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
