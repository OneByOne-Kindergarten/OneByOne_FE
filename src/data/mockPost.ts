import type { Post } from "@/types/community";
import { TEACHER_POSTS, STUDENT_POSTS, USERS } from "@/data/mockPosts";

// 모든 게시글 목록 (모든 게시글 ID를 키로 사용)
const allPosts = [...TEACHER_POSTS, ...STUDENT_POSTS];

// 게시글 상세 데이터 객체 생성 (ID를 키로 사용)
export const POST: Record<string, Post & { author: string }> = allPosts.reduce(
  (acc, post) => {
    const user = USERS[post.useId as keyof typeof USERS];
    acc[post.id] = {
      ...post,
      author: user?.nickname || "익명 사용자",
    };
    return acc;
  },
  {} as Record<string, Post & { author: string }>
);

// 추가 게시글 상세 데이터 (위 데이터로 대체되어 실제로는 사용되지 않음)
export const DETAIL_POST: Record<string, Post & { author: string }> = {
  "1": {
    id: "1",
    title: "첫 학급 경영, 어떻게 시작하는 것이 좋을까요?",
    content:
      "안녕하세요, 첫 발령을 받고 학급을 맡게 되었습니다. 학급 경영에 대한 경험이 전혀 없어서 무척 긴장되네요. 선배님들은 첫 학급 경영 시 어떤 점에 중점을 두셨는지, 어떤 방식으로 시작하셨는지 조언 부탁드립니다.",
    createdAt: "2024-03-15T09:30:00",
    updatedAt: "2024-03-15T09:30:00",
    likeCount: 24,
    viewCount: 126,
    views: 126,
    commentCount: 3,
    categoryId: "1",
    useId: "user1",
    author: "새내기교사",
    category: "tip",
    communityType: "teacher",
  },
  "2": {
    id: "2",
    title: "임용 준비, 어떻게 효율적으로 할 수 있을까요?",
    content:
      "임용고시 준비 중인 예비교사입니다. 공부 방법과 효율적인 시간 관리 팁이 필요합니다. 도움 주실 분 계실까요?",
    createdAt: "2024-03-10T14:20:00",
    updatedAt: "2024-03-10T14:20:00",
    likeCount: 18,
    viewCount: 85,
    views: 85,
    commentCount: 1,
    categoryId: "2",
    useId: "user2",
    author: "예비교사A",
    category: "employment",
    communityType: "pre-teacher",
  },
};
