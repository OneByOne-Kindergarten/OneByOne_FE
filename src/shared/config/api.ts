// endpoint
export const API_PATHS = {
  KINDERGARTEN: {
    BASE: "/kindergarten",
    SIMPLE: (id: number) => `/kindergarten/${id}/simple`,
    DETAIL: (id: number) => `/kindergarten/${id}`,
    NEARBY: "/kindergarten/nearby",
  },
  INTERNSHIP: {
    BASE: "/internship/review", // 실습 리뷰 생성, 수정
    GET: (kindergartenId: number) => `/internship/reviews/${kindergartenId}`,
    GET_ALL: "/internship/reviews", // 전체 실습 리뷰 조회
    LIKE: (internshipReviewId: number) =>
      `/internship/review/${internshipReviewId}/like`,
    DELETE: (internshipReviewId: number) =>
      `/internship/review/${internshipReviewId}`,
  },
  WORK: {
    BASE: "/work/review", // 근무 리뷰 생성, 수정
    GET: (kindergartenId: number) => `/work/reviews/${kindergartenId}`,
    GET_ALL: "/work/reviews", // 전체 근무 리뷰 조회
    LIKE: (workReviewId: number) => `/work/review/${workReviewId}/like`,
    DELETE: (workReviewId: number) => `/work/review/${workReviewId}`,
  },
  INQUIRY: {
    BASE: "/inquiry",
    MY: "/inquiry/my",
    ALL: "/inquiry/all",
    DETAIL: (id: number) => `/inquiry/${id}`,
    STATUS: (status: string) => `/inquiry/status/${status}`,
    CLOSE: (id: number) => `/inquiry/${id}/close`,
    ANSWER: (id: number) => `/inquiry/${id}/answer`,
  },
  COMMUNITY: {
    BASE: "/community",
    POST: {
      DETAIL: (id: number) => `/community/${id}`,
      LIKE: (id: number) => `/community/${id}/like`,
      TOP: "/community/top",
      DELETE: (id: number) => `/community/${id}`,
    },
    COMMENT: {
      BASE: (postId: number) => `/community/${postId}/comment`,
      ALL: (postId: number) => `/community/${postId}/comment/all`,
      RECOMMEND: (postId: number, commentId: number) =>
        `/community/${postId}/comment/replies/${commentId}`,
      DELETE: (commentId: number) => `/comment/${commentId}`,
    },
  },
  FAVORITE: {
    BASE: "/favorite-kindergartens",
    STATUS: "/favorite-kindergartens/status",
  },
  NOTICE: {
    BASE: "/notice",
    ADMIN: "/admin/notice",
    STATUS: (noticeId: number) => `/admin/notice/${noticeId}/status`,
  },
  ALARM: {
    BASE: "/notification/my",
    UNREAD_COUNT: "/notification/my/unread/count",
    READ: (id: number) => `/notification/${id}/read`,
    READ_ALL: "/notification/my/read-all",
  },
  USER: {
    BASE: "/users",
    KAKAO_CALLBACK: "/users/kakao/callback",
    NAVER_CALLBACK: "/users/naver/callback",
    APPLE_CALLBACK: "/users/apple/callback",
    SIGN_IN: "/users/sign-in",
    SIGN_UP: "/users/sign-up",
    FIND_PASSWORD: "/users/email-certification",
    FIND_PASSWORD_CHECK: "/users/check-email-certification",
    RESET_PASSWORD: "/users/temporary-password",
    SHORTCUTS: "/users/shortcuts",
    REISSUE: "/users/reissue",
    MY_WORK_REVIEW: "/users/user/work-reviews",
    MY_INTERNSHIP_REVIEW: "/users/user/internship-reviews",
    PASSWORD: "/users/password",
    NICKNAME: "/users/nickname",
    ROLE: "/users/role",
    ALARM: "/users/notification-settings", // 알림 설정 조회, 수정
    WITHDRAW: "/users/withdraw",
  },
  BLOCK: {
    BASE: "/blocks",
    GET: "/blocks/list",
    DELETE: (targetUserEmail: string) => `/blocks/${targetUserEmail}`,
  },
  REPORT: {
    BASE: "/report",
    MY_REPORT: "/report/my",
  },
};
