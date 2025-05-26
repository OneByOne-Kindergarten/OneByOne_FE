import clsx from "clsx";
import Button from "@/components/@shared/buttons/base-button";
import { SVG_PATHS } from "@/constants/assets-path";

interface ReplyButtonProps {
  className?: string;
  onClick?: () => void;
}

export default function ReplyButton({ className, onClick }: ReplyButtonProps) {
  return (
    <Button
      font="xs_sb"
      size="xs"
      variant="transparent_gray"
      border="gray"
      className={clsx(className, "gap-0.5")}
      onClick={onClick}
    >
      <img src={SVG_PATHS.REPLY} alt="답변 아이콘" width={20} height={20} />
      답글
    </Button>
  );
}
