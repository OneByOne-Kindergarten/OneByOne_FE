import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageLayout from "@/components/@shared/layout/page-layout";
import Badge from "@/components/@shared/badge";
import AlertCard from "@/components/@shared/alert/alert-card";
import LikeToggle from "@/components/@shared/buttons/like-toggle";
import ShareButton from "@/components/@shared/buttons/share-button";
import ChatCount from "@/components/community/chat-count";
import ChatBar from "@/components/community/chat-bar";
import { CATEGORY_LABELS } from "@/constants/community";
import { SVG_PATHS } from "@/constants/assets-path";
import { formatDate } from "@/utils/dateUtils";
import {
  getMockPostDetail,
  getMockComments,
  createMockComment,
  createMockReply,
} from "@/services/mockApi";
import {
  getCommunityType,
  setCommunityState,
} from "@/utils/lastVisitedPathUtils";
import type { Post, Comment } from "@/types/community";
import ReplyCard from "@/components/community/reply-card";

interface ExtendedPost extends Post {
  author: string;
}

export default function CommunityPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<ExtendedPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replyToUser, setReplyToUser] = useState<string | undefined>(undefined);
  const [communityType, setCommunityTypeState] = useState<
    "teacher" | "pre-teacher"
  >(getCommunityType());

  // 데이터 로드
  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    const postData = getMockPostDetail(id);

    if (postData) {
      setPost(postData as ExtendedPost);

      // GET: 댓글, 게시글 작성자
      const { comments: commentsData } = getMockComments(id);
      setComments(commentsData);

      if (postData.communityType) {
        setCommunityTypeState(postData.communityType);

        // 세션 스토리지에 게시글 정보 저장
        const category = postData.category || "top10";
        const communityState = {
          type: postData.communityType,
          path: `/community?type=${postData.communityType}${category ? `&category=${category}` : ""}`,
          category: category,
        };

        setCommunityState(communityState);
      }
    }

    setIsLoading(false);
  }, [id]);

  const handleCreateComment = (content: string) => {
    if (!id || !post) return;

    const newComment = createMockComment(id, {
      author: "현재 사용자", // 실제로는 로그인된 사용자 정보
      content,
      likeCount: 0,
      useId: "current-user", // 실제로는 로그인된 사용자 ID
    });

    // 새 댓글 추가
    setComments([...comments, newComment]);
  };

  const handleReply = (author: string) => {
    setReplyToUser(author);
  };

  const handleCreateReply = (commentId: string, content: string) => {
    if (!id || !post) return;

    const newReply = createMockReply(id, commentId, {
      author: "현재 사용자", // 실제로는 로그인된 사용자 정보
      content,
      likeCount: 0,
      useId: "current-user", // 실제로는 로그인된 사용자 ID
    });

    // 댓글 찾아서 답글 추가
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply],
        };
      }
      return comment;
    });

    setComments(updatedComments);
    setReplyToUser(undefined); // 답글 작성 완료 후 상태 초기화
  };

  const handleCancelReply = () => {
    setReplyToUser(undefined);
  };

  return (
    <PageLayout
      isGlobalNavBar={false}
      title={`원바원 | ${post?.title || "게시글"}`}
      description={`원바원 커뮤니티 게시글 - ${post?.title || ""}`}
      headerTitle="커뮤니티"
      currentPath={`/community/${id}`}
      mainBg="gray"
      mainClassName="flex flex-col gap-2 mb-24"
      hasBackButton={true}
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : post ? (
        <>
          <article className="px-5 pt-7 pb-4 bg-white flex flex-col gap-7">
            <section className="flex flex-col gap-2.5">
              <div className="flex gap-2 items-center">
                <Badge>{CATEGORY_LABELS[post.category]}</Badge>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-2.5 items-center">
                  <div className="relative w-7 h-7 bg-primary-normal03 rounded-full">
                    <img
                      src={SVG_PATHS.CHARACTER.user}
                      alt="병아리 사용자 캐릭터"
                      className="absolute w-2/3 h-3/5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                  </div>
                  <div>
                    <span className="text-primary-dark02 font-semibold text-sm">
                      {post.author}
                    </span>
                    <ul className="text-primary-normal03 text-xxs flex gap-1">
                      <li>{formatDate(post.createdAt)}</li>
                      <li>조회 {post.viewCount}</li>
                    </ul>
                  </div>
                </div>
                <img
                  src={SVG_PATHS.KEBAB}
                  alt="커뮤니티 게시글 옵션 메뉴"
                  width="20"
                  height="20"
                  className="mb-auto"
                />
              </div>
            </section>
            <section className="text-primary-dark01 flex flex-col gap-4">
              <div className="flex flex-col gap-2.5">
                <h2 className="font-semibold">{post.title}</h2>
                <p className="text-sm">{post.content}</p>
              </div>
              <AlertCard>
                비속어 및 특정 인물에 대한 명예훼손으로 간주되는 내용이 포함될
                경우 삭제될 수 있습니다.
              </AlertCard>
            </section>
            <section className="flex justify-between">
              <LikeToggle size="sm" count={post.likeCount}>
                좋아요
              </LikeToggle>
              <ChatCount count={comments.length} />
              <ShareButton size="xs" />
            </section>
          </article>

          {/* 댓글 섹션 */}
          <section className="flex flex-col bg-white">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <ReplyCard
                  key={comment.id}
                  comment={comment}
                  postAuthor={post.author}
                  onReply={handleReply}
                />
              ))
            ) : (
              <p className="text-sm text-primary-normal03 text-center py-4">
                첫 번째 댓글을 남겨보세요!
              </p>
            )}
          </section>

          <ChatBar
            replyUserName={replyToUser}
            onCancelReply={handleCancelReply}
            onSubmit={(content: string) => {
              if (replyToUser) {
                // 답글을 작성할 부모 댓글 찾기
                const parentComment = comments.find(
                  (c) => c.author === replyToUser
                );

                if (parentComment) {
                  // 직접 댓글에 대한 답글
                  handleCreateReply(parentComment.id, content);
                } else {
                  // 답글에 대한 답글인 경우 - 해당 답글의 부모 댓글 찾기
                  for (const comment of comments) {
                    const replyFound = comment.replies?.find(
                      (r) => r.author === replyToUser
                    );
                    if (replyFound) {
                      // 부모 댓글 ID를 사용
                      handleCreateReply(comment.id, content);
                      return;
                    }
                  }

                  // 부모 댓글을 찾을 수 없는 경우 - 일반 댓글로 작성
                  handleCreateComment(content);
                }
              } else {
                // 일반 댓글 작성
                handleCreateComment(content);
              }
            }}
          />
        </>
      ) : (
        <div className="m-5 flex justify-center items-center h-64">
          <p>게시글을 찾을 수 없습니다.</p>
        </div>
      )}
    </PageLayout>
  );
}
