import { Suspense, useCallback, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  useCommunityPostDetail,
  useLikeStatus,
  useToggleLike,
} from "@/entities/community/hooks";
import { useUrlNavigation } from "@/features/nav/lib/useUrlNavigation";
import { URL_PATHS } from "@/shared/constants/url-path";
import Error from "@/shared/ui/layout/error";
import PageLayout from "@/shared/ui/layout/page-layout";
import LoadingSpinner from "@/shared/ui/loading/loading-spinner";
import CommentList from "@/widgets/community-feed/comment-list";
import ChatBar from "@/widgets/community-feed/ui/ChatBar";
import Post from "@/widgets/community-feed/ui/Post";

export default function CommunityPostPage() {
  const [replyToUser, setReplyToUser] = useState<string | undefined>(undefined);
  const [replyParentId, setReplyParentId] = useState<number | undefined>(
    undefined
  );
  const [isLiking] = useState(false);
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const postId = id ? Number(id) : 0;

  const { data: postData, isLoading: postLoading } =
    useCommunityPostDetail(postId);
  const { data: likeStatus, refetch: refetchLikeStatus } =
    useLikeStatus(postId);
  const toggleLikeMutation = useToggleLike();

  const customBackHandler = useCallback(() => {
    if (location.state?.fromSearch) {
      navigate(URL_PATHS.COMMUNITY);
      return true;
    }

    // 브라우저 기본 뒤로가기
    return false;
  }, [location.state?.fromSearch, navigate]);

  const post = postData?.data;

  const { handleBackNavigation } = useUrlNavigation(customBackHandler);

  const handleBackClick = () => {
    handleBackNavigation();
  };

  const handleLikeToggle = async () => {
    if (!id || toggleLikeMutation.isPending) return;
    await toggleLikeMutation.mutateAsync(postId);
    refetchLikeStatus();
  };

  const handleSubmitted = () => {
    setReplyToUser(undefined);
    setReplyParentId(undefined);
  };

  // 대댓글
  const handleReply = (author: string, parentId: number) => {
    setReplyToUser(author);
    setReplyParentId(parentId);
  };

  const handleCancelReply = () => {
    setReplyToUser(undefined);
    setReplyParentId(undefined);
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
            postId={postId}
            replyParentId={replyParentId}
            replyUserName={replyToUser}
            onCancelReply={handleCancelReply}
            onSubmitted={handleSubmitted}
          />
        </>
      ) : (
        <Error type="page">게시글을 찾을 수 없습니다.</Error>
      )}
    </PageLayout>
  );
}
