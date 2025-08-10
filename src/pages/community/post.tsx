import { Suspense, useCallback, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useCreateComment } from "@/entities/community/comment/hooks";
import {
  useCommunityPostDetail,
  useLikeStatus,
  useToggleLike,
} from "@/entities/community/hooks";
import { URL_PATHS } from "@/shared/constants/url-path";
import { useUrlNavigation } from "@/shared/hooks/useUrlNavigation";
import Error from "@/shared/ui/layout/error";
import PageLayout from "@/shared/ui/layout/page-layout";
import LoadingSpinner from "@/shared/ui/loading/loading-spinner";
import ChatBar from "@/widgets/community-feed/ChatBar";
import Post from "@/widgets/community-feed/Post";
import CommentList from "@/widgets/community-feed/comment-list";

export default function CommunityPostPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const postId = id ? Number(id) : 0;

  const customBackHandler = useCallback(() => {
    if (location.state?.fromSearch) {
      navigate(URL_PATHS.COMMUNITY);
      return true;
    }

    // 브라우저 기본 뒤로가기
    return false;
  }, [location.state?.fromSearch, navigate]);

  const { handleBackNavigation } = useUrlNavigation(customBackHandler);

  const [replyToUser, setReplyToUser] = useState<string | undefined>(undefined);
  const [replyParentId, setReplyParentId] = useState<number | undefined>(
    undefined
  );
  const [isLiking, setIsLiking] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  const { data: postData, isLoading: postLoading } =
    useCommunityPostDetail(postId);

  const { data: likeStatus, refetch: refetchLikeStatus } =
    useLikeStatus(postId);

  const createCommentMutation = useCreateComment();

  const toggleLikeMutation = useToggleLike();

  const post = postData?.data;

  const handleBackClick = () => {
    handleBackNavigation();
  };

  const handleLikeToggle = async () => {
    if (isLiking || !id) return;

    setIsLiking(true);

    await toggleLikeMutation.mutateAsync(postId);

    refetchLikeStatus();
    setIsLiking(false);
  };

  const handleSubmitComment = async (content: string, parentId?: number) => {
    if (!id || !content.trim()) return;

    await createCommentMutation.mutateAsync({
      postId,
      content,
      parentId,
    });

    setCommentInput("");
    setReplyToUser(undefined);
    setReplyParentId(undefined);
  };

  // 대댓글
  const handleReply = (author: string, parentId: number) => {
    setReplyToUser(author);
    setReplyParentId(parentId);
    setCommentInput("");
  };

  const handleCancelReply = () => {
    setReplyToUser(undefined);
    setReplyParentId(undefined);
    setCommentInput("");
  };

  return (
    <PageLayout
      headerType="community"
      isGlobalNavBar={false}
      title={`원바원 | ${post?.title || "게시글"}`}
      description={`원바원 커뮤니티 게시글 - ${post?.title || ""}`}
      headerTitle="커뮤니티"
      currentPath={`/community/${id}`}
      mainBg="gray"
      mainClassName="flex flex-1 flex-col gap-2 mb-16 mt-14"
      hasBackButton={true}
      onBackButtonClick={handleBackClick}
    >
      {postLoading ? (
        <LoadingSpinner />
      ) : post ? (
        <>
          <Post
            post={post}
            likeStatus={likeStatus?.data}
            commentsCount={post.commentCount}
            isLiking={isLiking}
            handleLikeToggle={handleLikeToggle}
          />

          <Suspense fallback={<LoadingSpinner />}>
            <CommentList
              postId={postId}
              post={post}
              handleReply={handleReply}
            />
          </Suspense>

          <ChatBar
            replyParentId={replyParentId}
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
