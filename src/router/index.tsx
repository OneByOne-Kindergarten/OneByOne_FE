import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "../components/@shared/loading";
import { URL_PATHS } from "@/constants/url-path";

const TestPage = lazy(() => import("../pages/test"));
const HomePage = lazy(() => import("../pages"));
const SchoolPage = lazy(() => import("../pages/school"));
const SignInPage = lazy(() => import("../pages/auth/sign-in"));
const SignUpPage = lazy(() => import("../pages/auth/sign-up"));
const SchoolDetailPage = lazy(() => import("../pages/school/school-detail"));
const ReviewPage = lazy(() => import("../pages/review"));
const ReviewEditorPage = lazy(() => import("../pages/review/review-editor"));
const CommunityPage = lazy(() => import("../pages/community"));
const CommunityPostPage = lazy(() => import("../pages/community/post"));
const PostEditorPage = lazy(() => import("../pages/community/post-editor"));
const BookmarksPage = lazy(() => import("../pages/bookmarks"));
const UserPage = lazy(() => import("../pages/user"));

const routes = {
  direct: [
    { path: URL_PATHS.TEST, element: <TestPage /> },
    { path: URL_PATHS.HOME, element: <HomePage /> },
    { path: URL_PATHS.BOOKMARKS, element: <BookmarksPage /> },
    { path: URL_PATHS.USER, element: <UserPage /> },
    { path: URL_PATHS.SIGNIN, element: <SignInPage /> },
    { path: URL_PATHS.SIGNUP, element: <SignUpPage /> },
    // 유치원 페이지
    { path: URL_PATHS.SCHOOL, element: <SchoolPage /> },
    { path: URL_PATHS.SCHOOL_DETAIL, element: <SchoolDetailPage /> },
    { path: URL_PATHS.SCHOOL_REVIEW, element: <ReviewPage /> },
    { path: URL_PATHS.SCHOOL_REVIEW_EDITOR, element: <ReviewEditorPage /> },
    // 커뮤니티 페이지
    { path: URL_PATHS.COMMUNITY, element: <CommunityPage /> },
    { path: URL_PATHS.COMMUNITY_POST_EDITOR, element: <PostEditorPage /> },
    { path: URL_PATHS.COMMUNITY_POST, element: <CommunityPostPage /> },
  ],

  redirect: [
    { path: "*", to: URL_PATHS.HOME },
    { path: URL_PATHS.COMMUNITY_TEACHER, to: "/community?type=teacher" },
    { path: URL_PATHS.COMMUNITY_STUDENT, to: "/community?type=pre-teacher" },
    { path: "/school/:id/work-review", to: "/school/:id/review?type=work" },
    {
      path: "/school/:id/learning-review",
      to: "/school/:id/review?type=learning",
    },
  ],
};

export default function AppRouter() {
  return (
    <Suspense fallback={<Loading />}>
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
