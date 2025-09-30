import { useNavigate } from "react-router-dom";

import { CommunityPostItem, LikeStatusData } from "@/entities/community/DTO.d";
import ProfileImage from "@/features/user-profile/ProfileImage";
import { SVG_PATHS } from "@/shared/constants/assets-path";
import { URL_PATHS } from "@/shared/constants/url-path";
import AlertCard from "@/shared/ui/alert/alert-card";
import Badge from "@/shared/ui/badge";
import LikeToggle from "@/shared/ui/buttons/like-toggle";
import ShareButton from "@/shared/ui/buttons/share-button";
import UserActionDropDown from "@/shared/ui/drop-down/report-drop-down";
import { getCategoryLabel } from "@/shared/utils/categoryUtils";
import { formatDate } from "@/shared/utils/dateUtils";
import { ShareType } from "@/shared/utils/webViewCommunication";
import { CATEGORY_LABELS } from "@/widgets/community-feed/lib/category";
import ChatCount from "@/widgets/community-feed/ui/ChatCount";

export default function Post({
  post,
  likeStatus,
  commentsCount,
  isLiking,
  handleLikeToggle,
}: {
  post: CommunityPostItem;
  likeStatus?: LikeStatusData;
  commentsCount?: number;
  isLiking: boolean;
  handleLikeToggle: () => void;
}) {
  const navigate = useNavigate();

  const handleDeleteSuccess = () => {
    navigate(URL_PATHS.COMMUNITY);
  };

  return (
    <article className="flex flex-col gap-6 bg-white px-5 pb-4 pt-7">
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <Badge size="lg">{getCategoryLabel(post.categoryName)}</Badge>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2.5">
            <ProfileImage size="sm" role={post.userRole} />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-primary-dark02">
                {post.userNickname}
              </span>
              <ul className="flex gap-1 text-xxs text-primary-normal03">
                {post.userRole === "PROSPECTIVE_TEACHER" ? null : (
                  <>
                    <li>
                      {post.career === null && post.userRole === "TEACHER"
                        ? "비공개"
                        : post.career}
                    </li>
                    <li aria-hidden="true"> · </li>
                  </>
                )}
                <li>{CATEGORY_LABELS[post.userRole]}</li>
              </ul>
            </div>
          </div>
          <UserActionDropDown
            targetId={post.id}
            targetType="POST"
            targetUserEmail={post.userEmail}
            authorNickname={post.userNickname}
            onDeleteSuccess={handleDeleteSuccess}
          />
        </div>
      </section>
      <section className="flex flex-col gap-4 text-primary-dark01">
        <div className="flex flex-col gap-2.5">
          <h2 className="font-semibold">{post.title}</h2>
          <p className="whitespace-pre-wrap text-sm">{post.content}</p>
        </div>
        <ul className="flex justify-end gap-1 text-xxs text-primary-normal03">
          <li>{formatDate(post.createdAt)}</li>
          <li aria-hidden="true"> · </li>
          <li className="flex items-center gap-1">
            <img
              src={SVG_PATHS.EYE.on}
              alt="조회 아이콘"
              width={15}
              height={15}
            />
            <span>{post.viewCount}</span>
          </li>
        </ul>
        <AlertCard>
          비속어 및 특정 인물에 대한 명예훼손으로 간주되는 내용이 포함될 경우
          삭제될 수 있습니다.
        </AlertCard>
      </section>
      <section className="flex justify-between">
        <ChatCount
          count={
            commentsCount !== undefined ? commentsCount : post.commentCount
          }
          className="w-1/3"
        />
        <LikeToggle
          count={likeStatus?.likeCount || 0}
          onToggle={handleLikeToggle}
          disabled={isLiking}
          isLiked={likeStatus?.liked || false}
          className="w-1/3"
        >
          좋아요
        </LikeToggle>
        <ShareButton 
          size="xs" 
          className="w-1/3"
          shareData={{
            title: post.title,
            isWork: true,
            id: post.id.toString(),
            shareType: ShareType.COMMUNITY,
          }}
        />
      </section>
    </article>
  );
}
