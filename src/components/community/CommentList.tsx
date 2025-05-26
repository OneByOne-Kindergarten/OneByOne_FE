import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Empty from "@/components/@shared/layout/empty";
import ReplyCard from "@/components/community/ReplyCard";
import CommentCard from "@/components/community/CommentCard";
import { CommunityPostItem } from "@/types/communityDTO";
import { useComments } from "@/hooks/useCommunity";

interface CommentListProps {
  postId: number;
  post: CommunityPostItem;
  handleReply: (author: string, parentId: number) => void;
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
  } = useComments({
    postId,
    size: 10,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const hasComments = commentsData?.pages.some(
    (page) => page.content.length > 0
  );

  return (
    <section className="flex flex-col flex-1 bg-white">
      {!hasComments ? (
        <Empty className="my-auto">
          <p className="text-sm">댓글이 없습니다.</p>
          <span className="text-xxs text-primary-normal02">
            게시물에 첫 댓글을 남겨보세요!
          </span>
        </Empty>
      ) : (
        <>
          {commentsData.pages.map((page) =>
            page.content.map((comment) => (
              <div key={comment.id}>
                {comment.reply ? (
                  <ReplyCard reply={comment} postAuthor={post.userNickname} />
                ) : (
                  <CommentCard
                    comment={comment}
                    postAuthor={post.userNickname}
                    onReply={() => handleReply(comment.nickName, comment.id)}
                  />
                )}
              </div>
            ))
          )}

          {hasNextPage && (
            <div ref={loadMoreRef} className="w-full h-1 flex justify-center">
              {isFetchingNextPage && null}
            </div>
          )}
        </>
      )}
    </section>
  );
}
