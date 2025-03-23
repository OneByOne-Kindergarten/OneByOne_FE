import type { Post } from "@/types/community";
import { COMMUNITY_CATEGORIES } from "@/constants/community";
import { TEACHER_POSTS, STUDENT_POSTS, USERS } from "@/data/mockData";

// Mock API 함수
export function getMockCommunityPosts(
  type: "teacher" | "pre-teacher",
  category?: string
): Post[] {
  const posts = type === "teacher" ? TEACHER_POSTS : STUDENT_POSTS;

  // 카테고리 필터링
  if (!category || category === COMMUNITY_CATEGORIES.TOP10) {
    // TOP10은 좋아요 기준 정렬
    return [...posts].sort((a, b) => b.likeCount - a.likeCount).slice(0, 10);
  } else if (category === COMMUNITY_CATEGORIES.ALL) {
    return posts;
  } else {
    return posts.filter((post) => post.category === category);
  }
}

export function getMockPostDetail(postId: string):
  | {
      id: string;
      title: string;
      content: string;
      useId: string;
      author: string;
      categoryType: "teacher" | "pre-teacher";
      createdAt: string;
    }
  | undefined {
  const teacherPost = TEACHER_POSTS.find((post) => post.id === postId);
  const studentPost = STUDENT_POSTS.find((post) => post.id === postId);
  const post = teacherPost || studentPost;

  if (!post) return undefined;

  return {
    ...post,
    author: USERS[post.useId]?.nickname || "알 수 없음",
    categoryType: teacherPost ? "teacher" : "pre-teacher",
  };
}
