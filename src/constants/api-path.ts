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
  USER: {
    BASE: "/users",
    MY_POST: "/users/user/community-comments",
    REISSUE: "/users/reissue",
    SIGN_IN: "/users/sign-in",
    SIGN_UP: "/users/sign-up",
    WITHDRAW: "/users/withdraw",
    PASSWORD: "/users/password",
    NICKNAME: "/users/nickname",
  },
};
