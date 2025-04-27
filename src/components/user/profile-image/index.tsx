import { SVG_PATHS } from "@/constants/assets-path";

export default function ProfileImage({
  profileImageUrl,
}: {
  profileImageUrl?: string | null;
}) {
  return (
    <div className="flex items-center justify-center w-20 h-20 bg-primary-normal03 overflow-hidden rounded-full">
      {profileImageUrl ? (
        <img
          src={profileImageUrl}
          alt="사용자 프로필 이미지"
          className="absolute top-0 left-0 object-cover"
        />
      ) : (
        <img
          src={SVG_PATHS.CHARACTER.user}
          alt="기본 프로필 이미지"
          width={38}
          height={47}
          className="object-cover"
        />
      )}
    </div>
  );
}
