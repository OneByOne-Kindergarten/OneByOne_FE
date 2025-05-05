import { useState, useEffect } from "react";
import clsx from "clsx";
import Toggle from "@/components/@shared/buttons/base-toggle";
import { SVG_PATHS } from "@/constants/assets-path";

interface LikeToggleProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  isCount?: boolean;
  count?: number;
  onToggle?: (newCount: number) => void;
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
  const [likeCount, setLikeCount] = useState(count);

  useEffect(() => {
    setLiked(initialLiked);
  }, [initialLiked]);

  useEffect(() => {
    setLikeCount(count);
  }, [count]);

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

  const handleToggle = () => {
    if (disabled) return;

    const newLiked = !liked;
    setLiked(newLiked);

    const newCount = newLiked ? likeCount + 1 : likeCount - 1;
    setLikeCount(newCount);

    if (onToggle) {
      onToggle(newCount);
    }
  };

  // data-state=on style
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
      <span className="text-xs">{children}</span>
      {count !== undefined && (
        <span className={clsx("-ml-1", liked && "text-secondary-dark01")}>
          {`(${count})`}
        </span>
      )}
    </Toggle>
  );
}
