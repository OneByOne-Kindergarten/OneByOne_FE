import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useComments } from "@/entities/community/comment/hooks";
import type { CommunityPostItem } from "@/entities/community/DTO.d";
import Empty from "@/shared/ui/layout/empty";
import CommentCard, {
  ReplyCard,
} from "@/widgets/community-feed/comment-list/ui";

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
    <section className="flex flex-1 flex-col bg-white">
      {!hasComments ? (
        <Empty
          className="my-auto"
          title="댓글이 없습니다."
          subTitle="게시물에 첫 댓글을 남겨보세요!"
        />
      ) : (
        <>
          {commentsData.pages.map((page) =>
            page.content.map((comment) => (
              <div key={comment.id}>
                {comment.reply ? (
                  <ReplyCard
                    reply={comment}
                    postAuthor={post.userNickname}
                    postId={postId}
                  />
                ) : (
                  <CommentCard
                    comment={comment}
                    postAuthor={post.userNickname}
                    postId={postId}
                    onReply={() => handleReply(comment.nickName, comment.id)}
                  />
                )}
              </div>
            ))
          )}

          {hasNextPage && (
            <div ref={loadMoreRef} className="flex h-1 w-full justify-center">
              {isFetchingNextPage && null}
            </div>
          )}
        </>
      )}
    </section>
  );
}
