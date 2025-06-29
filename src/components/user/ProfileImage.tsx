import clsx from "clsx";
import { cn } from "@/utils/cn";
import { SVG_PATHS } from "@/constants/assets-path";

export default function ProfileImage({
  size = "md",
  role,
}: {
  size?: "md" | "sm";
  role?: "GENERAL" | "TEACHER" | "PROSPECTIVE_TEACHER" | "ADMIN";
}) {
  const getProfileData = () => {
    switch (role) {
      case "TEACHER":
        return {
          image: SVG_PATHS.CHARACTER.chicken,
          altText: "교사 프로필 이미지",
        };
      case "PROSPECTIVE_TEACHER":
        return {
          image: SVG_PATHS.CHARACTER.chick,
          altText: "예비교사 프로필 이미지",
        };
      case "ADMIN":
        return {
          image: SVG_PATHS.CHARACTER.user,
          altText: "관리자 프로필 이미지",
        };
      case "GENERAL":
      default:
        return {
          image: SVG_PATHS.CHARACTER.user,
          altText: "기본 프로필 이미지",
        };
    }
  };

  const profileData = getProfileData();

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-primary-normal03 overflow-hidden rounded-full",
        clsx({
          "w-20 h-20": size === "md",
          "w-7 h-7": size === "sm",
        })
      )}
    >
      <img
        src={profileData.image}
        alt={profileData.altText}
        width={size === "md" ? 38 : 15}
        height={size === "md" ? 47 : 19}
        className="object-cover"
      />
    </div>
  );
}
