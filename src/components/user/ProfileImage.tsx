import { useState } from "react";
import clsx from "clsx";
import { cn } from "@/utils/cn";
import { SVG_PATHS } from "@/constants/assets-path";

export default function ProfileImage({
  size = "md",
  profileImageUrl,
}: {
  size?: "md" | "sm";
  profileImageUrl?: string | null;
}) {
  const [imageError, setImageError] = useState(false);

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
      {profileImageUrl && !imageError ? (
        <img
          src={profileImageUrl}
          alt="사용자 프로필 이미지"
          className="absolute top-0 left-0 object-cover w-full h-full"
          onError={() => setImageError(true)}
        />
      ) : (
        <img
          src={SVG_PATHS.CHARACTER.user}
          alt="기본 프로필 이미지"
          width={size === "md" ? 38 : 15}
          height={size === "md" ? 47 : 19}
          className="object-cover"
        />
      )}
    </div>
  );
}
