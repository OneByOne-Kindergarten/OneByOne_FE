import clsx from "clsx";

import SVG_PATH from "@/app/assets/icons/share.svg";
import Button from "@/shared/ui/buttons/base-button";

interface ShareButtonProps {
  variant?: "primary" | "secondary";
  className?: string;
  size?: "sm" | "md" | "lg" | "xs";
  onClick?: () => void;
}

export default function ShareButton({
  variant = "primary",
  size = "sm",
  className,
  onClick,
}: ShareButtonProps) {
  return (
    <Button
      font="xs_sb"
      size={size}
      variant="transparent_gray"
      border={variant === "secondary" ? "gray" : "none"}
      className={clsx(className, "my-auto gap-0.5")}
      onClick={onClick}
    >
      <img src={SVG_PATH} alt="share" width={20} height={20} />
      공유
    </Button>
  );
}
