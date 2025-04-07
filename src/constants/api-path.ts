// endpoint
export const API_PATHS = {
  KINDERGARTEN: {
    SEARCH: "/kindergarten",
    DETAIL: (id: number) => `/kindergarten/${id}`,
    NEARBY: "/kindergarten/nearby",
  },
  USER: {
    WITHDRAW: "/users/withdraw",
    SIGN_IN: "/users/signin",
    SIGN_UP: "/users/signup",
    PASSWORD: "/users/password",
    NICKNAME: "/users/nickname",
  },
};
