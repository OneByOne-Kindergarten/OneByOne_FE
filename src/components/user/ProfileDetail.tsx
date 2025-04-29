import { getCategoryLabel } from "@/utils/categoryUtils";
import type { User } from "@/types/userDTO";
import { cn } from "@/utils/cn";

export default function ProfileDetail({
  user,
  className,
}: {
  user: User | null;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <h2 className="font-bold text-lg text-primary-dark02">
        {user?.nickname}
      </h2>
      <div className="flex gap-1">
        {user?.career && (
          <>
            <p className="font-semibold text-xs text-primary-normal03">
              {user?.career || "비공개"}
            </p>
            <span
              aria-hidden="true"
              className="font-semibold text-xs text-primary-normal03"
            >
              ·
            </span>
          </>
        )}
        {user?.career && (
          <>
            <p className="font-semibold text-xs text-primary-normal03">
              {user?.career}
            </p>
            <span
              aria-hidden="true"
              className="font-semibold text-xs text-primary-normal03"
            >
              ·
            </span>
          </>
        )}
        <p className="font-semibold text-xs text-primary-normal03">
          {getCategoryLabel(user?.role || "")}
        </p>
      </div>
    </div>
  );
}
