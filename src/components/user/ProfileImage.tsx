import clsx from "clsx";
import { cn } from "@/utils/cn";

import { SVG_PATHS } from "@/constants/assets-path";
import type { UserRole } from "@/types/userDTO";

const PROFILE_CONFIG: Record<
  UserRole,
  {
    image: string;
    altText: string;
    className: string;
  }
> = {
  TEACHER: {
    image: SVG_PATHS.CHARACTER.chicken,
    altText: "교사 프로필 이미지",
    className: "bg-tertiary-2",
  },
  PROSPECTIVE_TEACHER: {
    image: SVG_PATHS.CHARACTER.chick,
    altText: "예비교사 프로필 이미지",
    className: "bg-tertiary-2",
  },
  ADMIN: {
    image: SVG_PATHS.CHARACTER.user,
    altText: "운영자 프로필 이미지",
    className: "bg-primary-normal03",
  },
  GENERAL: {
    image: SVG_PATHS.CHARACTER.user,
    altText: "기본 프로필 이미지",
    className: "bg-primary-normal03",
  },
};

export default function ProfileImage({
  size = "md",
  role,
}: {
  size?: "md" | "sm";
  role?: UserRole;
}) {
  const profileData = PROFILE_CONFIG[role || "GENERAL"];

  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-full",
        profileData.className,
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
