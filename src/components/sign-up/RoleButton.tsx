import clsx from "clsx";
import { CommunityCategoryType } from "@/constants/community";

interface RoleButtonProps {
  role: CommunityCategoryType;
  isSelected: boolean;
  onClick: () => void;
  character: string;
  title: string;
  description: string;
}

export default function RoleButton({
  role,
  isSelected,
  onClick,
  character,
  title,
  description,
}: RoleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "w-1/2 px-4 pt-5 pb-7 gap-3 flex flex-col text-left rounded-lg",
        isSelected
          ? "bg-tertiary-1 text-primary-dark01 outline-1 outline outline-tertiary-3"
          : "bg-primary-foreground text-primary-normal03"
      )}
    >
      <img
        src={character}
        alt={`${role} 캐릭터`}
        width={56}
        height={56}
        className="ml-auto"
      />
      <div className="flex flex-col">
        <strong className="text-sm font-semibold">{title}</strong>
        <span className="text-xxs text-pretty">{description}</span>
      </div>
    </button>
  );
}
