import type { BlockedUser } from "@/entities/block/DTO.d";
import { UserRole } from "@/entities/user/DTO.d";
import ProfileImage from "@/features/user-profile/ProfileImage";
import Button from "@/shared/ui/buttons/base-button";
import { formatDate } from "@/shared/utils/dateUtils";

interface BlockItemProps {
  user: BlockedUser;
  onUnblock: (email: string) => void;
}

function mapUserRole(userRole: BlockedUser["userRole"]): UserRole {
  const roleMapping: Record<BlockedUser["userRole"], UserRole> = {
    TEACHER: "TEACHER",
    PARENT: "GENERAL",
    ADMIN: "ADMIN",
  };
  return roleMapping[userRole];
}

export default function BlockItem({ user, onUnblock }: BlockItemProps) {
  return (
    <li className="flex items-center justify-between rounded-xl border border-primary-light02 p-3">
      <div className="flex-1">
        <div className="flex items-center gap-2.5">
          <ProfileImage size="sm" role={mapUserRole(user.userRole)} />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-primary-dark02">
              {user.nickname}
            </span>
            <p className="text-xs text-primary-normal03">
              {formatDate(user.blockedAt)} 차단
            </p>
          </div>
        </div>
      </div>
      <Button
        variant="primary_light"
        font="xs_sb"
        onClick={() => onUnblock(user.email)}
        className="px-4 py-1.5"
      >
        차단 해제
      </Button>
    </li>
  );
}
