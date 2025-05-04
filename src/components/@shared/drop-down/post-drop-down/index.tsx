import DropDown from "../base-drop-down";
import type { CommunityPostItem } from "@/types/communityDTO";

interface PostDropDownProps {
  post: CommunityPostItem;
  onEdit?: (post: CommunityPostItem) => void;
}

export default function PostDropDown({ post, onEdit }: PostDropDownProps) {
  return (
    <DropDown
      options={[
        {
          label: "수정하기",
          onClick: () => onEdit?.(post),
        },
      ]}
      position="bottom"
      align="end"
    />
  );
}
