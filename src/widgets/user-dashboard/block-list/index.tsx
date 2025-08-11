import type { BlockedUser } from "@/entities/block/DTO.d";
import { useBlock } from "@/entities/block/hooks";
import BlockItem from "@/widgets/user-dashboard/block-list/ui/BlockItem";

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

  return (
    <section className="px-5 pt-5">
      <ul className="flex flex-col gap-4">
        {blockedUsers.map((user: BlockedUser) => (
          <BlockItem key={user.email} user={user} onUnblock={handleUnblock} />
        ))}
      </ul>
    </section>
  );
}
