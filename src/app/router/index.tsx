import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { URL_PATHS } from "@/shared/constants/url-path";
import LoadingSpinner from "@/shared/ui/loading/loading-spinner";

const RootPage = lazy(() => import("@/pages"));
const HomePage = lazy(() => import("@/pages/home"));
const ShortcutsEditorPage = lazy(() => import("@/pages/home/shortcuts-editor"));
const KindergartenPage = lazy(() => import("@/pages/kindergarten"));
const SignInPage = lazy(() => import("@/pages/auth/sign-in"));
const SignUpPage = lazy(() => import("@/pages/auth/sign-up"));
const FindPasswordPage = lazy(() => import("@/pages/auth/find-password"));
const KakaoCallbackPage = lazy(() => import("@/pages/auth/kakao-callback"));
const NaverCallbackPage = lazy(() => import("@/pages/auth/naver-callback"));
const AppleCallbackPage = lazy(() => import("@/pages/auth/apple-callback"));
const KindergartenDetailPage = lazy(
  () => import("@/pages/kindergarten/detail")
);
const ReviewPage = lazy(() => import("@/pages/review/index"));
const ReviewEditorPage = lazy(() => import("@/pages/review/editor"));
const KindergartenSearchPage = lazy(
  () => import("@/pages/search/kindergarten")
);
const CommunitySearchPage = lazy(() => import("@/pages/search/community"));
const CommunityPage = lazy(() => import("@/pages/community"));
const CommunityPostPage = lazy(() => import("@/pages/community/post"));
const PostEditorPage = lazy(() => import("@/pages/community/post-editor"));
const FavoritesPage = lazy(() => import("@/pages/favorites"));
const UserPage = lazy(() => import("@/pages/user"));
const ProfilePage = lazy(() => import("@/pages/user/profile"));
const ProfileEditorPage = lazy(() => import("@/pages/user/profile-editor"));
const PasswordEditorPage = lazy(() => import("@/pages/user/password-editor"));
const MyPostPage = lazy(() => import("@/pages/user/my-post"));
const AccountSettingPage = lazy(() => import("@/pages/user/account-setting"));
const InquiryPage = lazy(() => import("@/pages/user/inquiry"));
const InquiryEditorPage = lazy(
  () => import("@/pages/user/inquiry/inquiry-editor")
);
const InquiryAdminPage = lazy(
  () => import("@/pages/user/inquiry/inquiry-admin")
);
const InquiryMyPage = lazy(() => import("@/pages/user/inquiry/inquiry-my"));
const NoticePage = lazy(() => import("@/pages/user/notice"));
const NoticeDetailPage = lazy(
  () => import("@/pages/user/notice/notice-detail")
);
const AlarmPage = lazy(() => import("@/pages/alarm"));
const AlarmSettingPage = lazy(() => import("@/pages/user/alarm-setting"));
const ReportPage = lazy(() => import("@/pages/user/report"));
const BlockPage = lazy(() => import("@/pages/user/block"));

const routes = {
  direct: [
    { path: URL_PATHS.ROOT, element: <RootPage /> },
    // auth
    { path: URL_PATHS.SIGNIN, element: <SignInPage /> },
    { path: URL_PATHS.SIGNUP, element: <SignUpPage /> },
    { path: URL_PATHS.FIND_PASSWORD, element: <FindPasswordPage /> },
    { path: URL_PATHS.KAKAO_CALLBACK, element: <KakaoCallbackPage /> },
    { path: URL_PATHS.NAVER_CALLBACK, element: <NaverCallbackPage /> },
    { path: URL_PATHS.APPLE_CALLBACK, element: <AppleCallbackPage /> },
    // 홈
    { path: URL_PATHS.HOME, element: <HomePage /> },
    { path: URL_PATHS.SHORTCUTS_EDITOR, element: <ShortcutsEditorPage /> },
    // 검색
    {
      path: URL_PATHS.SEARCH_KINDERGARTEN,
      element: <KindergartenSearchPage />,
    },
    { path: URL_PATHS.SEARCH_COMMUNITY, element: <CommunitySearchPage /> },
    // 유치원
    { path: URL_PATHS.KINDERGARTEN, element: <KindergartenPage /> },
    {
      path: URL_PATHS.KINDERGARTEN_DETAIL,
      element: <KindergartenDetailPage />,
    },
    { path: URL_PATHS.REVIEW, element: <ReviewPage /> },
    { path: URL_PATHS.REVIEW_EDITOR, element: <ReviewEditorPage /> },
    // 커뮤니티
    { path: URL_PATHS.COMMUNITY, element: <CommunityPage /> },
    { path: URL_PATHS.COMMUNITY_POST_EDITOR, element: <PostEditorPage /> },
    { path: URL_PATHS.COMMUNITY_POST, element: <CommunityPostPage /> },
    // 즐겨찾기
    { path: URL_PATHS.FAVORITES, element: <FavoritesPage /> },
    // 프로필
    { path: URL_PATHS.USER, element: <UserPage /> },
    { path: URL_PATHS.USER_PROFILE, element: <ProfilePage /> },
    { path: URL_PATHS.USER_PROFILE_EDITOR, element: <ProfileEditorPage /> },
    { path: URL_PATHS.USER_PASSWORD_EDITOR, element: <PasswordEditorPage /> },
    { path: URL_PATHS.USER_POST, element: <MyPostPage /> },
    { path: URL_PATHS.USER_ACCOUNT_SETTING, element: <AccountSettingPage /> },
    { path: URL_PATHS.INQUIRY, element: <InquiryPage /> },
    { path: URL_PATHS.INQUIRY_EDITOR, element: <InquiryEditorPage /> },
    { path: URL_PATHS.INQUIRY_PUBLIC, element: <InquiryAdminPage /> },
    { path: URL_PATHS.INQUIRY_MY, element: <InquiryMyPage /> },
    { path: URL_PATHS.NOTICE, element: <NoticePage /> },
    { path: URL_PATHS.NOTICE_DETAIL, element: <NoticeDetailPage /> },
    { path: URL_PATHS.ALARM, element: <AlarmPage /> },
    { path: URL_PATHS.ALARM_SETTING, element: <AlarmSettingPage /> },
    { path: URL_PATHS.BLOCK, element: <BlockPage /> },
    // 신고
    { path: URL_PATHS.REPORT, element: <ReportPage /> },
  ],

  redirect: [
    { path: "*", to: URL_PATHS.ROOT },
    { path: URL_PATHS.COMMUNITY_TEACHER, to: "/community?type=teacher" },
    { path: URL_PATHS.COMMUNITY_STUDENT, to: "/community?type=pre-teacher" },
    { path: URL_PATHS.REVIEW_WORK, to: "/kindergarten/:id/review?type=work" },
    {
      path: URL_PATHS.REVIEW_LEARNING,
      to: "/kindergarten/:id/review?type=learning",
    },
  ],
};

export default function AppRouter() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {routes.direct.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        {routes.redirect.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<Navigate to={route.to} replace />}
          />
        ))}
      </Routes>
    </Suspense>
  );
}
