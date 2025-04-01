import type { Comment } from "@/types/community";

// 댓글 데이터
export const COMMENTS: Record<string, Comment[]> = {
  "1": [
    {
      id: "c1",
      postId: "1",
      useId: "user-003",
      author: "영진쌤",
      content:
        "저도 같은 고민을 했었어요. 일단 아이들에게 친근하게 다가가되, 초반에 확실한 선을 긋는 것이 중요한 것 같아요.",
      createdAt: "2024-03-15T12:30:00",
      likeCount: 8,
      replies: [
        {
          id: "c1-r1",
          postId: "1",
          useId: "user-001",
          author: "새내기교사",
          content:
            "선배님 조언 감사합니다! 구체적으로 어떤 방식으로 선을 그으셨나요?",
          createdAt: "2024-03-15T13:45:00",
          likeCount: 3,
        },
      ],
    },
    {
      id: "c2",
      postId: "1",
      useId: "user-004",
      author: "교사123",
      content:
        "처음에는 다들 그러셨을 거예요. 제 경우에는 수업 시간과 쉬는 시간의 분위기를 확실히 구분했어요. 그리고 미리 정한 규칙을 일관되게 적용하는 게 효과적이었습니다.",
      createdAt: "2024-03-15T14:20:00",
      likeCount: 12,
    },
    {
      id: "c3",
      postId: "1",
      useId: "user-005",
      author: "선생님A",
      content:
        "첫 한 달이 가장 중요해요. 이 기간에 학급 분위기가 많이 결정됩니다. 힘내세요!",
      createdAt: "2024-03-15T16:10:00",
      likeCount: 5,
      replies: [
        {
          id: "c3-r1",
          postId: "1",
          useId: "user-101",
          author: "예비교사B",
          content:
            "그런데 첫 한 달 동안 구체적으로 어떤 점에 집중하는 것이 좋을까요?",
          createdAt: "2024-03-15T17:30:00",
          likeCount: 2,
        },
        {
          id: "c3-r2",
          postId: "1",
          useId: "user-005",
          author: "선생님A",
          content:
            "기본적인 생활 습관과 학급 규칙을 확립하는 것이 중요해요. 그리고 아이들의 특성을 빨리 파악하는 것도 도움이 됩니다.",
          createdAt: "2024-03-15T18:45:00",
          likeCount: 4,
        },
      ],
    },
  ],
  "2": [
    {
      id: "c4",
      postId: "2",
      useId: "user-102",
      author: "예비교사C",
      content:
        "취업 준비하면서 가장 중요한 건 포트폴리오인 것 같아요. 교육 봉사 경험도 많이 도움됩니다.",
      createdAt: "2024-03-20T10:15:00",
      likeCount: 7,
    },
  ],
};
