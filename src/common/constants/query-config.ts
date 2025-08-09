/**
 * React Query 공통 캐싱 설정
 *
 * 데이터 성격에 따라 다른 캐싱 전략 적용:
 * - 정적 데이터: 공지사항, 약관 등 (긴 캐시)
 * - 동적 데이터: 커뮤니티 게시글, 댓글 등 (중간 캐시)
 * - 실시간 데이터: 알림, 좋아요 상태 등 (짧은 캐시)
 */

// 정적 데이터 (공지사항, 유치원 정보 등)
export const STATIC_CACHE_CONFIG = {
  staleTime: 1000 * 60 * 15, // 15분
  gcTime: 1000 * 60 * 60, // 1시간
};

// 동적 데이터 (게시글, 리뷰 등)
export const DYNAMIC_CACHE_CONFIG = {
  staleTime: 1000 * 60 * 5, // 5분
  gcTime: 1000 * 60 * 15, // 15분
};

// 실시간 데이터 (알림, 좋아요 등)
export const REALTIME_CACHE_CONFIG = {
  staleTime: 1000 * 60 * 2, // 2분
  gcTime: 1000 * 60 * 8, // 8분
};

// 개별 조회 데이터 (상세 페이지 등)
export const DETAIL_CACHE_CONFIG = {
  staleTime: 1000 * 60 * 10, // 10분
  gcTime: 1000 * 60 * 30, // 30분
};

// 문의/문의 답변 등 변경 빈도가 낮은 데이터
export const INQUIRY_CACHE_CONFIG = {
  staleTime: 1000 * 60 * 3, // 3분
  gcTime: 1000 * 60 * 12, // 12분
};
