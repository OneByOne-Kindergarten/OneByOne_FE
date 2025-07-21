import { Suspense, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Error from "@/components/@shared/layout/error";
import PageLayout from "@/components/@shared/layout/page-layout";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import ChatBar from "@/components/community/ChatBar";
import CommentList from "@/components/community/CommentList";
import Post from "@/components/community/Post";
import { URL_PATHS } from "@/constants/url-path";
import {
  useCommunityPostDetail,
  useCreateComment,
  useLikeStatus,
  useToggleLike,
} from "@/hooks/useCommunity";

export default function CommunityPostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const postId = id ? Number(id) : 0;

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
    // 검색 페이지에서 온 경우 검색 페이지로 직접 이동
    if (location.state?.fromSearch) {
      const { searchQuery, category } = location.state;
      const searchPath = `${URL_PATHS.SEARCH_COMMUNITY}?query=${encodeURIComponent(searchQuery)}${category ? `&category=${category}` : ""}`;
      navigate(searchPath);
    } else {
      navigate(-1);
    }
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
      isGlobalNavBar={false}
      title={`원바원 | ${post?.title || "게시글"}`}
      description={`원바원 커뮤니티 게시글 - ${post?.title || ""}`}
      headerTitle={post?.title || "게시글"}
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
