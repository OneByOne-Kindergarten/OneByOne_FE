import FloatButton from "@/components/@shared/buttons/float-button";
import { SVG_PATHS } from "@/constants/assets-path";

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
