import DropDown from "@/components/@shared/drop-down/base-drop-down";
import ProfileImage from "@/components/user/ProfileImage";
import { useBlock } from "@/hooks/useBlock";
import type { BlockedUserDTO } from "@/types/blockDTO";
import type { UserRole } from "@/types/userDTO";
import { formatDate } from "@/utils/dateUtils";

export default function BlockedUserList({
  blockedUsers,
}: {
  blockedUsers: BlockedUserDTO[];
}) {
  const { useUnblockUser } = useBlock();
  const unblockUser = useUnblockUser();

  const handleUnblock = (targetUserEmail: string) => {
    unblockUser.mutate({ targetUserEmail });
  };

  // BlockedUserDTO의 userRole을 UserRole로 변환
  const mapUserRole = (userRole: BlockedUserDTO["userRole"]): UserRole => {
    const roleMapping: Record<BlockedUserDTO["userRole"], UserRole> = {
      TEACHER: "TEACHER",
      PARENT: "GENERAL",
      ADMIN: "ADMIN",
    };
    return roleMapping[userRole];
  };

  return (
    <section className="px-5 pt-5">
      <ul className="flex flex-col gap-4">
        {blockedUsers.map((user: BlockedUserDTO) => (
          <li
            key={user.email}
            className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <ProfileImage size="md" role={mapUserRole(user.userRole)} />
                <div className="flex flex-col gap-1">
                  <span className="text-md font-bold text-primary-dark02">
                    {user.nickname}
                  </span>
                  <p className="text-xs text-primary-normal03">
                    {formatDate(user.blockedAt)} 차단
                  </p>
                </div>
              </div>
            </div>
            <DropDown
              options={[
                {
                  label: "차단 해제",
                  onClick: () => handleUnblock(user.email),
                  variant: "default",
                },
              ]}
              position="bottom"
              align="end"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
