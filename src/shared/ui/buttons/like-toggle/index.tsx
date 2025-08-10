import clsx from "clsx";
import { useEffect, useState } from "react";

import { SVG_PATHS } from "@/shared/constants/assets-path";
import Toggle from "@/shared/ui/buttons/base-toggle";

interface LikeToggleProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  isCount?: boolean;
  count?: number;
  onToggle?: () => void;
  isLiked?: boolean;
  disabled?: boolean;
}

/**
 * LikeToggle Details
 *
 * @param children
 * @param variant 테두리 유무
 * @param className
 * @param count 좋아요 수
 * @param onToggle 토글 클릭 시 호출되는 콜백 함수
 * @param size 토글 크기
 * @param isLiked 좋아요 상태
 * @param disabled 비활성화 여부
 */
export default function LikeToggle({
  children,
  variant = "primary",
  className,
  count = 0,
  size = "sm",
  onToggle,
  disabled = false,
  isLiked: initialLiked = false,
}: LikeToggleProps) {
  const [liked, setLiked] = useState(initialLiked);

  useEffect(() => {
    setLiked(initialLiked);
  }, [initialLiked]);

  const LikeToggleClass = clsx(
    "text-center group",
    {
      "text-primary-normal03": variant === "primary",
      "border border-primary-normal01 text-primary-normal03 hover:opacity-12":
        variant === "secondary",
      "opacity-50 cursor-not-allowed": disabled,
    },
    className
  );

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setLiked(!liked);
    onToggle?.();
  };

  // data-state=on style
  const yellowFilterStyle = {
    filter:
      "brightness(0) saturate(70%) invert(80%) sepia(50%) saturate(1000%) hue-rotate(0deg) brightness(90%) contrast(85%)",
  };

  return (
    <Toggle
      variant="default"
      font="xs_sb"
      border={variant === "secondary" ? "gray" : "none"}
      className={LikeToggleClass}
      onClick={handleToggle}
      pressed={liked}
      size={size}
    >
      <img
        src={SVG_PATHS.THUMB_UP}
        alt="좋아요 아이콘"
        width={20}
        height={20}
        style={liked ? yellowFilterStyle : undefined}
        className="transition-all duration-200"
      />
      <span className="text-xs">{children}</span>
      {count !== undefined && (
        <span className={clsx("-ml-1 text-secondary-dark01")}>
          {`(${count})`}
        </span>
      )}
    </Toggle>
  );
}
