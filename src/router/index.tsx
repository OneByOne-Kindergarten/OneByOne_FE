import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "../components/@shared/loading";
import { URL } from "@/constants/url";

const HomePage = lazy(() => import("../pages/Home"));
const SchoolPage = lazy(() => import("../pages/school/School"));
const SignInPage = lazy(() => import("../pages/auth/SignIn"));
const SignUpPage = lazy(() => import("../pages/auth/SignUp"));
const SchoolDetailPage = lazy(() => import("../pages/school/SchoolDetail"));
const ReviewPage = lazy(() => import("../pages/review/Review"));
const ReviewEditorPage = lazy(() => import("../pages/review/ReviewEditor"));
const CommunityPage = lazy(() => import("../pages/community/Community"));
const CommunityPostPage = lazy(
  () => import("../pages/community/CommunityPost")
);
const PostEditorPage = lazy(() => import("../pages/community/PostEditor"));
const BookmarksPage = lazy(() => import("../pages/bookmarks/Bookmarks"));
const UserPage = lazy(() => import("../pages/user/User"));

const routes = {
  direct: [
    { path: URL.HOME, element: <HomePage /> },
    { path: URL.BOOKMARKS, element: <BookmarksPage /> },
    { path: URL.USER, element: <UserPage /> },
    { path: URL.SIGNIN, element: <SignInPage /> },
    { path: URL.SIGNUP, element: <SignUpPage /> },
    // 유치원 페이지
    { path: URL.SCHOOL, element: <SchoolPage /> },
    { path: URL.SCHOOL_DETAIL, element: <SchoolDetailPage /> },
    { path: URL.SCHOOL_REVIEW, element: <ReviewPage /> },
    { path: URL.SCHOOL_REVIEW_EDITOR, element: <ReviewEditorPage /> },
    // 커뮤니티 페이지
    { path: URL.COMMUNITY, element: <CommunityPage /> },
    { path: URL.COMMUNITY_POST_EDITOR, element: <PostEditorPage /> },
    { path: URL.COMMUNITY_POST, element: <CommunityPostPage /> },
  ],

  redirect: [
    { path: "*", to: URL.HOME },
    { path: URL.COMMUNITY_TEACHER, to: "/community?type=teacher" },
    { path: URL.COMMUNITY_STUDENT, to: "/community?type=pre-teacher" },
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
