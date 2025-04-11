import { useState } from "react";
import { useParams } from "react-router-dom";

import PageLayout from "@/components/@shared/layout/page-layout";
import Post from "@/components/community/post";
import CommentList from "@/components/community/comment-list";
import ChatBar from "@/components/community/chat-bar";
import Error from "@/components/@shared/layout/error";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";

import {
  useLikeStatus,
  useCreateComment,
  useCommunityPostDetail,
  useToggleLike,
} from "@/hooks/useCommunity";

export default function CommunityPost() {
  const { id } = useParams<{ id: string }>();
  const postId = id ? Number(id) : 0;

  const [replyToUser, setReplyToUser] = useState<string | undefined>(undefined);
  const [isLiking, setIsLiking] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  const { data: postData, isLoading: postLoading } =
    useCommunityPostDetail(postId);

  const { data: likeStatus, refetch: refetchLikeStatus } =
    useLikeStatus(postId);

  const createCommentMutation = useCreateComment();

  const toggleLikeMutation = useToggleLike();

  const post = postData?.data;

  const handleLikeToggle = async () => {
    if (isLiking || !id) return;

    setIsLiking(true);

    await toggleLikeMutation.mutateAsync(postId);

    refetchLikeStatus();
    setIsLiking(false);
  };

  const handleSubmitComment = async (content: string) => {
    if (!id || !content.trim()) return;

    await createCommentMutation.mutateAsync({
      postId,
      content,
    });

    setCommentInput("");
    setReplyToUser(undefined);
  };

  // 대댓글
  const handleReply = (author: string) => {
    setReplyToUser(author);
    setCommentInput("");
  };

  const handleCancelReply = () => {
    setReplyToUser(undefined);
    setCommentInput("");
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
      {postLoading ? (
        <LoadingSpinner type="page" />
      ) : post ? (
        <>
          <Post
            post={post}
            likeStatus={likeStatus?.data}
            commentsCount={post.commentCount}
            isLiking={isLiking}
            handleLikeToggle={handleLikeToggle}
          />

          <CommentList postId={postId} post={post} handleReply={handleReply} />

          <ChatBar
            replyUserName={replyToUser}
            onCancelReply={handleCancelReply}
            onSubmit={handleSubmitComment}
            value={commentInput}
            onChange={(value) => setCommentInput(value)}
          />
        </>
      ) : (
        <Error type="page">게시글을 찾을 수 없습니다.</Error>
      )}
    </PageLayout>
  );
}
