import clsx from "clsx";
import Button from "@/components/@shared/buttons/base-button";
import SVG_PATH from "@/assets/icons/share.svg";

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
      className={clsx(className, "gap-0.5 my-auto")}
      onClick={onClick}
    >
      <img src={SVG_PATH} alt="share" width={20} height={20} />
      공유
    </Button>
  );
}
