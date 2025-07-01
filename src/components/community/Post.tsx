import AlertCard from "@/components/@shared/alert/alert-card";
import Badge from "@/components/@shared/badge";
import LikeToggle from "@/components/@shared/buttons/like-toggle";
import ShareButton from "@/components/@shared/buttons/share-button";
import ActionDropDown from "@/components/@shared/drop-down/report-drop-down";
import ChatCount from "@/components/community/ChatCount";
import { useNavigate } from "react-router-dom";

import { SVG_PATHS } from "@/constants/assets-path";
import { CATEGORY_LABELS } from "@/constants/community";
import { URL_PATHS } from "@/constants/url-path";
import { CommunityPostItem, LikeStatusData } from "@/types/communityDTO";
import { getCategoryLabel } from "@/utils/categoryUtils";
import { formatDate } from "@/utils/dateUtils";

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
    <article className="flex flex-col gap-7 bg-white px-5 pb-4 pt-7">
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <Badge>{getCategoryLabel(post.categoryName)}</Badge>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative h-7 w-7 rounded-full bg-primary-normal03">
              <img
                src={SVG_PATHS.CHARACTER.user}
                alt="병아리 사용자 캐릭터"
                className="absolute left-1/2 top-1/2 h-3/5 w-2/3 -translate-x-1/2 -translate-y-1/2"
              />
            </div>
            <div>
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
          <ActionDropDown
            targetId={post.id}
            targetType="POST"
            authorNickname={post.userNickname}
            onDeleteSuccess={handleDeleteSuccess}
          />
        </div>
      </section>
      <section className="flex flex-col gap-4 text-primary-dark01">
        <div className="flex flex-col gap-2.5">
          <h2 className="font-semibold">{post.title}</h2>
          <p className="text-sm">{post.content}</p>
        </div>
        <ul className="flex justify-end gap-1 text-xxs text-primary-normal03">
          <li>{formatDate(post.createdAt)}</li>
          <li aria-hidden="true"> · </li>
          <li className="flex items-center gap-1">
            <img
              src={SVG_PATHS.EYE.on}
              alt="눈 아이콘"
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
        <LikeToggle
          count={likeStatus?.likeCount || 0}
          onToggle={handleLikeToggle}
          disabled={isLiking}
          isLiked={likeStatus?.liked || false}
          className="w-1/3"
        >
          좋아요
        </LikeToggle>
        <ChatCount
          count={
            commentsCount !== undefined ? commentsCount : post.commentCount
          }
          className="w-1/3"
        />
        <ShareButton size="xs" className="w-1/3" />
      </section>
    </article>
  );
}
