import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getCommunityPostDetail,
  toggleLike,
} from "@/services/communityService";

import Post from "@/components/community/post";
import PageLayout from "@/components/@shared/layout/page-layout";
import ReplyCard from "@/components/community/reply-card";
import ChatBar from "@/components/community/chat-bar";
import Empty from "@/components/@shared/layout/empty";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";

import {
  getCommunityType,
  setCommunityState,
} from "@/utils/lastVisitedPathUtils";
import type { CommunityPostItem } from "@/types/communityDTO";
import { useLikeStatus, useComments } from "@/hooks/useCommunity";

export default function CommunityPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<CommunityPostItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [replyToUser, setReplyToUser] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<"teacher" | "pre-teacher">(
    getCommunityType()
  );
  const [isLiking, setIsLiking] = useState(false);

  const { data: postData, isLoading: postLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getCommunityPostDetail(Number(id)),
    enabled: !!id,
  });

  const { data: likeStatus, refetch: refetchLikeStatus } = useLikeStatus(
    Number(id)
  );

  const { data: commentsData } = useComments({
    postId: Number(id),
    page: 1,
    size: 10,
  });

  const likeMutation = useMutation({
    mutationFn: toggleLike,
    onSuccess: () => {
      refetchLikeStatus();
      setIsLiking(false);
    },
    onError: (error) => {
      console.error("좋아요 토글 실패:", error);
      setIsLiking(false);
    },
  });

  // 데이터 로드
  useEffect(() => {
    if (!id || !postData?.data) return;

    setIsLoading(true);
    setPost(postData.data);

    if (postData.data.category) {
      // TEACHER/PROSPECTIVE_TEACHER -> teacher/pre-teacher 변환
      const postCategory =
        postData.data.category === "TEACHER" ? "teacher" : "pre-teacher";

      setCategory(postCategory);

      // 세션 스토리지에 게시글 정보 저장
      const menuCategoryName = postData.data.categoryName || "top10";

      // 경로 설정
      const path = `/community?type=${postCategory}${menuCategoryName ? `&category=${menuCategoryName}` : ""}`;

      // 각 값을 개별적으로 저장 (새로운 API 사용)
      setCommunityState({
        path,
        category: postCategory, // 소문자 "teacher" 또는 "pre-teacher"
        communityCategoryName: menuCategoryName, // 실제 카테고리명 (free, top10 등)
      });
    }

    setIsLoading(false);
  }, [id, postData]);

  const handleLikeToggle = async () => {
    if (isLiking) return;

    setIsLiking(true);
    try {
      await likeMutation.mutateAsync(Number(id));
    } catch (error) {
      console.error("좋아요 토글 실패:", error);
      setIsLiking(false);
    }
  };

  // TODO: 댓글 수정 기능 개발 예정
  // const handleEditComment = (commentId: string, content: string) => {
  //   if (!id || !post) return;
  //   // API 호출 및 상태 업데이트
  // };

  // TODO: 댓글 삭제 기능 개발 예정
  // const handleDeleteComment = (commentId: string) => {
  //   if (!id || !post) return;
  //   // API 호출 및 상태 업데이트
  // };

  // TODO: 게시글 수정 기능 개발 예정
  // const handleEditPost = () => {
  //   if (!id) return;
  //   // 수정 페이지로 이동
  // };

  // TODO: 게시글 삭제 기능 개발 예정
  // const handleDeletePost = () => {
  //   if (!id) return;
  //   // API 호출 및 목록 페이지로 이동
  // };

  // TODO: 대댓글 기능 개발 예정
  // const handleReply = (author: string) => {
  //   setReplyToUser(author);
  // };

  // TODO: 대댓글 기능 개발 예정
  // const handleCreateReply = (commentId: string, content: string) => {
  //   if (!id || !post) return;
  //   // API 호출 및 상태 업데이트
  // };

  // TODO: 대댓글 기능 개발 예정
  // const handleCancelReply = () => {
  //   setReplyToUser(undefined);
  // };

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
        <LoadingSpinner />
      ) : post ? (
        <>
          <Post
            post={post}
            likeStatus={likeStatus?.data}
            commentsData={commentsData}
            isLiking={isLiking}
            handleLikeToggle={handleLikeToggle}
          />

          {/* 댓글 섹션 */}
          <section className="flex flex-col bg-white">
            {commentsData?.content.length ? (
              commentsData.content.map((comment) => (
                <ReplyCard
                  key={comment.id}
                  comment={comment}
                  postAuthor={post.userNickname}
                  onReply={() => {}}
                />
              ))
            ) : (
              <Empty>아직 댓글이 없습니다.</Empty>
            )}
          </section>

          <ChatBar
            onSubmit={() => {}}
            onCancelReply={() => setReplyToUser(undefined)}
          />
        </>
      ) : (
        <Empty>게시글을 찾을 수 없습니다.</Empty>
      )}
    </PageLayout>
  );
}
