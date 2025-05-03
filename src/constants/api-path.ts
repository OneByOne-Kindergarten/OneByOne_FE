// endpoint
export const API_PATHS = {
  KINDERGARTEN: {
    BASE: "/kindergarten",
    DETAIL: (id: number) => `/kindergarten/${id}`,
    NEARBY: "/kindergarten/nearby",
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
    REISSUE: "/users/reissue",
    SIGN_IN: "/users/sign-in",
    SIGN_UP: "/users/sign-up",
    WITHDRAW: "/users/withdraw",
    PASSWORD: "/users/password",
    NICKNAME: "/users/nickname",
  },
};
