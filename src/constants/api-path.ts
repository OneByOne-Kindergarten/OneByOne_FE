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
  USER: {
    BASE: "/users",
    SIGN_IN: "/users/signin",
    SIGN_UP: "/users/signup",
    WITHDRAW: "/users/withdraw",
    PASSWORD: "/users/password",
    NICKNAME: "/users/nickname",
  },
};
