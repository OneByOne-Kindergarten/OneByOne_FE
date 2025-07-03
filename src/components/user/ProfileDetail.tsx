import type { User } from "@/types/userDTO";
import { cn } from "@/utils/cn";
import { getUserRoleLabel } from "@/utils/getUserRoleLabel";

export default function ProfileDetail({
  user,
  className,
}: {
  user: User | null;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <h2 className="text-lg font-bold text-primary-dark02">
        {user?.nickname}
      </h2>
      <div className="flex gap-1">
        {user?.career && (
          <>
            <p className="text-xs font-semibold text-primary-normal03">
              {user?.career || "비공개"}
            </p>
            <span
              aria-hidden="true"
              className="text-xs font-semibold text-primary-normal03"
            >
              ·
            </span>
          </>
        )}
        {user?.career && (
          <>
            <p className="text-xs font-semibold text-primary-normal03">
              {user?.career}
            </p>
            <span
              aria-hidden="true"
              className="text-xs font-semibold text-primary-normal03"
            >
              ·
            </span>
          </>
        )}
        <p className="text-xs font-semibold text-primary-normal03">
          {getUserRoleLabel(user?.role || "GENERAL")}
        </p>
      </div>
    </div>
  );
}
