import Button from "@/common/ui/buttons/base-button";
import { formatDate } from "@/common/utils/dateUtils";
import type { BlockedUser } from "@/entities/block/DTO.d";
import { useBlock } from "@/entities/block/hooks";
import { UserRole } from "@/entities/user/DTO.d";
import ProfileImage from "@/widgets/userProfile/ProfileImage";

export default function BlockedUserList({
  blockedUsers,
}: {
  blockedUsers: BlockedUser[];
}) {
  const { useUnblockUser } = useBlock();
  const unblockUser = useUnblockUser();

  const handleUnblock = (targetUserEmail: string) => {
    unblockUser.mutate({ targetUserEmail });
  };

  // BlockedUserDTO의 userRole을 UserRole로 변환
  const mapUserRole = (userRole: BlockedUser["userRole"]): UserRole => {
    const roleMapping: Record<BlockedUser["userRole"], UserRole> = {
      TEACHER: "TEACHER",
      PARENT: "GENERAL",
      ADMIN: "ADMIN",
    };
    return roleMapping[userRole];
  };

  return (
    <section className="px-5 pt-5">
      <ul className="flex flex-col gap-4">
        {blockedUsers.map((user: BlockedUser) => (
          <li
            key={user.email}
            className="flex items-center justify-between rounded-xl border border-primary-light02 p-3"
          >
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
              onClick={() => handleUnblock(user.email)}
              className="px-4 py-1.5"
            >
              차단 해제
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}
