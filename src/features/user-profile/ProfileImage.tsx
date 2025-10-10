import clsx from "clsx";

import type { UserRole } from "@/entities/user/DTO.d";
import { SVG_PATHS } from "@/shared/constants/assets-path";
import { cn } from "@/shared/utils/cn";

const PROFILE_CONFIG: Record<
  UserRole,
  {
    image: string;
    altText: string;
    className: string;
  }
> = {
  TEACHER: {
    image: SVG_PATHS.CHARACTER.CHICKEN,
    altText: "교사 프로필 이미지",
    className: "bg-tertiary-2",
  },
  PROSPECTIVE_TEACHER: {
    image: SVG_PATHS.CHARACTER.CHICK,
    altText: "예비교사 프로필 이미지",
    className: "bg-tertiary-2",
  },
  ADMIN: {
    image: SVG_PATHS.CHARACTER.USER,
    altText: "운영자 프로필 이미지",
    className: "bg-primary-normal03",
  },
  GENERAL: {
    image: SVG_PATHS.CHARACTER.USER,
    altText: "기본 프로필 이미지",
    className: "bg-primary-normal03",
  },
};

export default function ProfileImage({
  size = "lg",
  role,
}: {
  size?: "lg" | "md" | "sm";
  role?: UserRole;
}) {
  const profileData = PROFILE_CONFIG[role || "GENERAL"];

  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-full",
        profileData.className,
        clsx({
          "h-20 w-20": size === "lg",
          "h-12 w-12": size === "md",
          "h-7 w-7": size === "sm",
        })
      )}
    >
      <img
        src={profileData.image}
        alt={profileData.altText}
        width={size === "lg" ? 38 : size === "md" ? 24 : 15}
        height={size === "lg" ? 47 : size === "md" ? 33 : 19}
        className="object-cover"
      />
    </div>
  );
}
