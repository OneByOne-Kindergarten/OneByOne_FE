import { SVG_PATHS } from "@/constants/assets-path";
import FloatButton from "@/components/@shared/buttons/float-button";

export default function PostButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <FloatButton
      position="bottomRight"
      buttonProps={{
        variant: "secondary",
        shape: "full",
        onClick,
        border: "black",
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
