import { SVG_PATHS } from "@/common/constants/assets-path";
import FloatButton from "@/common/ui/buttons/float-button";

interface PostButtonProps {
  onClick: () => void;
  label: string;
  isDisabled?: boolean;
}

export default function PostButton({
  onClick,
  label,
  isDisabled = false,
}: PostButtonProps) {
  const handleClick = () => {
    if (isDisabled) return;
    onClick();
  };

  return (
    <FloatButton
      position="bottomRight"
      buttonProps={{
        variant: isDisabled ? "default" : "secondary",
        shape: "full",
        onClick: handleClick,
        border: isDisabled ? "gray" : "black",
        shadow: "lg",
        disabled: isDisabled,
      }}
    >
      <img
        src={SVG_PATHS.POST.create}
        alt="게시글 작성"
        width="20"
        height="20"
      />
      {label}
    </FloatButton>
  );
}
