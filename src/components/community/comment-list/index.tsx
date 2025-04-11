import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Empty from "@/components/@shared/layout/empty";
import CommentCard from "@/components/community/comment-card";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import { CommunityPostItem } from "@/types/communityDTO";
import { useComments } from "@/hooks/useCommunity";

interface CommentListProps {
  postId: number;
  post: CommunityPostItem;
  handleReply: (author: string) => void;
}

export default function CommentList({
  postId,
  post,
  handleReply,
}: CommentListProps) {
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const {
    data: commentsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useComments({
    postId,
    size: 10,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 모든 페이지의 댓글을 단일 배열로 변환
  const allComments =
    commentsData?.pages?.flatMap((page) => page.content) || [];

  return (
    <section className="flex flex-col bg-white">
      {isLoading ? (
        <LoadingSpinner />
      ) : allComments && allComments.length > 0 ? (
        <>
          {allComments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              postAuthor={post.userNickname}
              onReply={() => handleReply(comment.nickName)}
            />
          ))}

          {hasNextPage && (
            <div ref={loadMoreRef} className="w-full py-4 flex justify-center">
              {isFetchingNextPage && null}
            </div>
          )}
        </>
      ) : (
        <Empty>아직 댓글이 없습니다.</Empty>
      )}
    </section>
  );
}
