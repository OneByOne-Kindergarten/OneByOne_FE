import { useState } from "react";
import clsx from "clsx";
import Toggle from "@/components/@shared/buttons/base-toggle";
import { SVG_PATHS } from "@/constants/assets-path";

interface LikeToggleProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  isCount?: boolean;
  count?: number;
  size?: "xs" | "sm" | "md" | "lg";
  onToggle?: (newCount: number) => void;
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
 */

export default function LikeToggle({
  children,
  variant = "primary",
  className,
  count = 0,
  size = "sm",
  onToggle,
}: LikeToggleProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(count);

  const LikeToggleClass = clsx(
    "text-center group",
    {
      "text-primary-normal03": variant === "primary",
      "border border-primary-normal01 text-primary-normal03 hover:opacity-12":
        variant === "secondary",
    },
    className
  );

  const handleToggle = () => {
    const newLiked = !liked;
    setLiked(newLiked);

    const newCount = newLiked ? likeCount + 1 : likeCount - 1;
    setLikeCount(newCount);

    if (onToggle) {
      onToggle(newCount);
    }
  };

  // data-state=on
  const yellowFilterStyle = {
    filter:
      "brightness(0) saturate(70%) invert(80%) sepia(50%) saturate(1000%) hue-rotate(0deg) brightness(90%) contrast(85%)",
  };

  return (
    <Toggle
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
      {children}
      {count && (
        <span className={clsx("-ml-1", liked && "text-secondary-dark01")}>
          ({count})
        </span>
      )}
    </Toggle>
  );
}
