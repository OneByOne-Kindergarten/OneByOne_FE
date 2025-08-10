export const URL_PATHS = {
  ROOT: "/",
  HOME: "/home",
  SHORTCUTS_EDITOR: "/home/shortcuts",
  // auth
  SIGNIN: "/signin",
  SIGNUP: "/signup",
  FIND_PASSWORD: "/find-password",
  NAVER_CALLBACK: "/users/naver/callback",
  KAKAO_CALLBACK: "/users/kakao/callback",
  APPLE_CALLBACK: "/users/apple/callback",
  // 검색
  SEARCH_KINDERGARTEN: "/search/kindergarten",
  SEARCH_COMMUNITY: "/search/community",
  // 유치원
  KINDERGARTEN: "/kindergarten",
  KINDERGARTEN_DETAIL: "/kindergarten/:id",
  // 유치원 - 리뷰
  REVIEW: "/kindergarten/:id/review",
  REVIEW_WORK: "/kindergarten/:id/review-work",
  REVIEW_LEARNING: "/kindergarten/:id/review-learning",
  REVIEW_EDITOR: "/kindergarten/:id/review/new",
  // 신고
  REPORT: "/report",
  // 커뮤니티
  COMMUNITY: "/community",
  COMMUNITY_TEACHER: "/community-teacher",
  COMMUNITY_STUDENT: "/community-pre-teacher",
  COMMUNITY_POST: "/community/:id",
  COMMUNITY_POST_EDITOR: "/community/new",
  // 즐겨찾기
  FAVORITES: "/favorites",
  // 알람
  ALARM: "/user/alarm",
  ALARM_SETTING: "/user/alarm-setting",
  // 프로필
  USER: "/user",
  USER_PROFILE: "/user/profile",
  USER_PROFILE_EDITOR: "/user/profile/editor",
  USER_POST: "/user/my-post",
  // 프로필 - 계정 설정
  USER_PASSWORD_EDITOR: "/user/account-setting/password",
  USER_ACCOUNT_SETTING: "/user/account-setting",
  // 프로필 - 차단 설정
  BLOCK: "/user/block",
  // 프로필 - 공지사항
  NOTICE: "/user/notice",
  NOTICE_DETAIL: "/user/notice/:id",
  // 프로필 - 문의사항
  INQUIRY: "/user/inquiry",
  INQUIRY_PUBLIC: "/user/inquiry/public",
  INQUIRY_MY: "/user/inquiry/my",
  INQUIRY_EDITOR: "/user/inquiry/new",
  // 테스트
  PERMISSION_TEST: "/permission-test",
};
