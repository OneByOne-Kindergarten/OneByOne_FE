import type { Post, Comment } from "@/types/community";
import { COMMENTS } from "@/data/mockComments";
import { POST } from "@/data/mockPost";
import { TEACHER_POSTS, STUDENT_POSTS, USERS } from "@/data/mockPosts";
import { COMMUNITY_CATEGORIES } from "@/constants/community";

// 커뮤니티 페이지 API
export const getMockPosts = (
  type?: "teacher" | "pre-teacher",
  category?: string
) => {
  let posts = [];

  // 타입별 게시글 필터링
  if (type === "teacher") {
    posts = TEACHER_POSTS;
  } else if (type === "pre-teacher") {
    posts = STUDENT_POSTS;
  } else {
    posts = [...TEACHER_POSTS, ...STUDENT_POSTS];
  }

  // 카테고리 필터링
  if (category && category !== "all") {
    if (category === COMMUNITY_CATEGORIES.TOP10) {
      return posts
        .slice()
        .sort((a, b) => b.likeCount - a.likeCount)
        .slice(0, 10)
        .map((post) => {
          const user = USERS[post.useId as keyof typeof USERS];
          return {
            ...post,
            author: user?.nickname || "익명 사용자",
          };
        });
    } else if (category === COMMUNITY_CATEGORIES.ALL) {
      // "all" 카테고리는 필터링하지 않음
    } else {
      posts = posts.filter((post) => post.category === category);
    }
  }

  // 게시글 작성자 정보 추가
  return posts.map((post) => {
    const user = USERS[post.useId as keyof typeof USERS];
    return {
      ...post,
      author: user?.nickname || "익명 사용자",
    };
  });
};

export const getMockCommunityPosts = (
  type: "teacher" | "pre-teacher",
  category?: string
): Post[] => {
  return getMockPosts(type, category);
};

export const getMockPostDetail = (id: string) => {
  // POST 객체에서 직접 가져오거나, 없으면 원본 게시글 데이터에서 찾기
  const post = POST[id];

  if (post) return post;

  // POST에 없는 경우 원본 데이터에서 찾기
  const teacherPost = TEACHER_POSTS.find((p) => p.id === id);
  if (teacherPost) {
    const user = USERS[teacherPost.useId as keyof typeof USERS];
    return {
      ...teacherPost,
      author: user?.nickname || "익명 사용자",
    };
  }

  const studentPost = STUDENT_POSTS.find((p) => p.id === id);
  if (studentPost) {
    const user = USERS[studentPost.useId as keyof typeof USERS];
    return {
      ...studentPost,
      author: user?.nickname || "익명 사용자",
    };
  }

  return null;
};

export const getMockComments = (
  postId: string
): { comments: Comment[]; postAuthor: string } => {
  const comments = COMMENTS[postId] || [];
  const post = getMockPostDetail(postId);
  const postAuthor = post?.author || "";

  // 댓글 작성자 정보 추가 및 업데이트
  const updatedComments = comments.map((comment) => {
    // 댓글 작성자 정보 추가
    const user = USERS[comment.useId as keyof typeof USERS];
    const updatedComment = {
      ...comment,
      author: comment.author || user?.nickname || "익명 사용자",
    };

    // 답글 작성자 정보 추가
    if (updatedComment.replies && updatedComment.replies.length > 0) {
      updatedComment.replies = updatedComment.replies.map((reply) => {
        const replyUser = USERS[reply.useId as keyof typeof USERS];
        return {
          ...reply,
          author: reply.author || replyUser?.nickname || "익명 사용자",
        };
      });
    }

    return updatedComment;
  });

  return { comments: updatedComments, postAuthor };
};

export const createMockComment = (
  postId: string,
  comment: Omit<Comment, "id" | "createdAt">
): Comment => {
  const newComment: Comment = {
    id: `c${Date.now()}`,
    postId,
    createdAt: new Date().toISOString(),
    ...comment,
  };

  // 실제 구현에서는 여기서 데이터 저장 로직 필요
  if (!COMMENTS[postId]) {
    COMMENTS[postId] = [];
  }

  // 실제 서비스에서는 메모리에 저장하는 대신 API 호출 등을 사용하면 됨
  COMMENTS[postId].push(newComment);

  return newComment;
};

export const createMockReply = (
  postId: string,
  commentId: string,
  reply: Omit<Comment, "id" | "createdAt" | "postId">
): Comment => {
  const newReply: Comment = {
    id: `r${Date.now()}`,
    postId,
    createdAt: new Date().toISOString(),
    ...reply,
  };

  // 부모 댓글 찾기
  const parentCommentIndex = COMMENTS[postId]?.findIndex(
    (c) => c.id === commentId
  );

  if (parentCommentIndex !== undefined && parentCommentIndex >= 0) {
    if (!COMMENTS[postId][parentCommentIndex].replies) {
      COMMENTS[postId][parentCommentIndex].replies = [];
    }

    // 답글 추가
    COMMENTS[postId][parentCommentIndex].replies?.push(newReply);
  }

  return newReply;
};
