// endpoint
export const API_PATHS = {
  KINDERGARTEN: {
    BASE: "/kindergarten",
    SIMPLE: (id: number) => `/kindergarten/${id}/simple`,
    DETAIL: (id: number) => `/kindergarten/${id}`,
    NEARBY: "/kindergarten/nearby",
  },
  INTERNSHIP: {
    BASE: "/internship/review",
    GET_ALL: (kindergartenId: number) =>
      `/internship/reviews/${kindergartenId}`,
    LIKE: (internshipReviewId: number) =>
      `/internship/review/${internshipReviewId}/like`,
  },
  WORK: {
    BASE: "/work/review",
    GET_ALL: (kindergartenId: number) => `/work/reviews/${kindergartenId}`,
    LIKE: (workReviewId: number) => `/work/review/${workReviewId}/like`,
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
    },
    COMMENT: {
      BASE: (postId: number) => `/community/${postId}/comment`,
      ALL: (postId: number) => `/community/${postId}/comment/all`,
      RECOMMEND: (postId: number, commentId: number) =>
        `/community/${postId}/comment/replies/${commentId}`,
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
    MY_POST: "/users/user/community-comments",
    REISSUE: "/users/reissue",
    SIGN_IN: "/users/sign-in",
    SIGN_UP: "/users/sign-up",
    FIND_PASSWORD: "/users/email-certification",
    FIND_PASSWORD_CHECK: "/users/check-email-certification",
    WITHDRAW: "/users/withdraw",
    PASSWORD: "/users/password",
    NICKNAME: "/users/nickname",
    ROLE: "/users/role",
    SHORTCUTS: "/users/shortcuts",
    KAKAO_CALLBACK: "/users/kakao/callback",
    NAVER_CALLBACK: "/users/naver/callback",
    APPLE_CALLBACK: "/users/apple/callback",
  },
  REPORT: {
    BASE: "/report",
    MY_REPORT: "/report/my",
  },
};
