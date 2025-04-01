import { REVIEW_TYPES } from "@/constants/review";
import type { ReviewData } from "@/components/review/review-card";

interface ReviewResponse {
  reviews: ReviewData[];
  rating: {
    total: number;
  };
  scores: Record<string, number>;
}

const MOCK_WORK_API_DATA: ReviewResponse = {
  reviews: [
    {
      id: 3,
      title: "리뷰 제목",
      type: "담임",
      createdAt: "2025-03-20",
      likeCount: 10,
      workYear: "2년 전",
      rating: {
        total: 4.5,
      },
      scores: {
        welfare: 4,
        workLabel: 5,
        atmosphere: 2,
        manager: 3,
        customer: 4,
      },
      contents: {
        welfare:
          "저는 어쩌구 복지/급여에 관한 리뷰 내용이 들어갈 텍스트 자리입니다. 복지랑 급여 중요해요. 복지/급여에 관한 리뷰 내용이 들어갈 텍스트 자리입니다.",
        workLabel:
          "저는 어쩌구 워라벨에 관한 리뷰 내용이 들어갈 텍스트 자리입니다. 복지랑 급여 중요해요.",
        atmosphere:
          "분위기 내용이 들어갈 자리입니다. 기관의 전반적인 분위기에 관한 내용을 작성합니다.",
        manager:
          "관리자 내용이 들어갈 자리입니다. 기관장과 관리자에 관한 내용을 작성합니다.",
        customer:
          "고객 내용이 들어갈 자리입니다. 학부모 등 고객 관련 경험을 작성합니다.",
      },
    },
    {
      id: 4,
      title: "다른 리뷰",
      type: "담임",
      createdAt: "2025-03-21",
      likeCount: 5,
      workYear: "1년 전",
      rating: {
        total: 4.0,
      },
      scores: {
        welfare: 3,
        workLabel: 4,
        atmosphere: 4,
        manager: 4,
        customer: 5,
      },
      contents: {
        welfare: "다른 복지/급여 리뷰",
        workLabel: "다른 워라벨 리뷰",
        atmosphere: "다른 분위기 리뷰",
        manager: "다른 관리자 리뷰",
        customer: "다른 고객 리뷰",
      },
    },
  ],
  rating: {
    total: 4.2,
  },
  scores: {
    welfare: 3.5,
    workLabel: 4.5,
    atmosphere: 3.0,
    manager: 3.5,
    customer: 4.5,
  },
};

const MOCK_LEARNING_API_DATA: ReviewResponse = {
  reviews: [
    {
      id: 7,
      title: "실습 환경이 좋아요",
      type: "실습생",
      createdAt: "2024-01-15",
      likeCount: 15,
      workYear: "1년 전",
      rating: {
        total: 4.2,
      },
      scores: {
        atmosphere: 4.5,
        studyHelp: 5.0,
        teacherGuide: 3.8,
      },
      contents: {
        atmosphere:
          "교실 분위기가 화기애애하고 실습생을 잘 배려해주는 환경이었습니다.",
        studyHelp:
          "다양한 교육 자료와 교재가 준비되어 있어 학습에 큰 도움이 되었습니다.",
        teacherGuide:
          "지도 교사분이 실습생의 질문에 성심성의껏, 상세히 답변해주셨습니다.",
      },
    },
    {
      id: 8,
      title: "다른 실습 리뷰",
      type: "실습생",
      createdAt: "2024-01-16",
      likeCount: 8,
      workYear: "2년 전",
      rating: {
        total: 4.0,
      },
      scores: {
        atmosphere: 4.0,
        studyHelp: 4.0,
        teacherGuide: 4.0,
      },
      contents: {
        atmosphere: "다른 분위기 리뷰",
        studyHelp: "다른 학습 도움 리뷰",
        teacherGuide: "다른 교사 지도 리뷰",
      },
    },
  ],
  rating: {
    total: 4.1,
  },
  scores: {
    atmosphere: 4.2,
    studyHelp: 4.5,
    teacherGuide: 3.9,
  },
};

/**
 * 리뷰 데이터를 가져오는 임시 훅
 * @param id
 * @param type 리뷰 타입
 * @param sortType 정렬 타입
 * @returns 리뷰 데이터
 */
export function useFetchReviewData(
  id: string,
  type: string,
  sortType: "recommended" | "latest"
): ReviewResponse {
  // TODO: API 호출
  const data =
    type === REVIEW_TYPES.WORK ? MOCK_WORK_API_DATA : MOCK_LEARNING_API_DATA;

  const sortedReviews = [...data.reviews].sort((a, b) => {
    if (sortType === "recommended") {
      return b.likeCount - a.likeCount;
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return {
    ...data,
    reviews: sortedReviews,
  };
}
