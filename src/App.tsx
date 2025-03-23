import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/@shared/loading";
import AppProvider from "./components/@shared/providers/AppProvider";
import { URL } from "@/constants/url";

const HomePage = lazy(() => import("./pages/Home"));
const SchoolPage = lazy(() => import("./pages/school/School"));
const SignInPage = lazy(() => import("./pages/auth/SignIn"));
const SignUpPage = lazy(() => import("./pages/auth/SignUp"));
const SchoolDetailPage = lazy(() => import("./pages/school/SchoolDetail"));
const ReviewPage = lazy(() => import("./pages/review/Review"));
const ReviewEditorPage = lazy(() => import("./pages/review/ReviewEditor"));
const CommunityPage = lazy(() => import("./pages/community/Community"));
const CommunityPostPage = lazy(() => import("./pages/community/CommunityPost"));
const PostEditorPage = lazy(() => import("./pages/community/PostEditor"));
const BookmarksPage = lazy(() => import("./pages/bookmarks/Bookmarks"));
const UserPage = lazy(() => import("./pages/user/User"));

export default function App() {
  return (
    <div className="hide-scrollbar">
      <AppProvider>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path={URL.BOOKMARKS} element={<BookmarksPage />} />
            <Route path={URL.USER} element={<UserPage />} />
            <Route path={URL.HOME} element={<HomePage />} />
            <Route path={URL.SIGNIN} element={<SignInPage />} />
            <Route path={URL.SIGNUP} element={<SignUpPage />} />
            <Route path={URL.SCHOOL} element={<SchoolPage />} />
            <Route path={URL.SCHOOL_DETAIL} element={<SchoolDetailPage />} />
            <Route path={URL.SCHOOL_REVIEW} element={<ReviewPage />} />
            <Route
              path={URL.SCHOOL_REVIEW_EDITOR}
              element={<ReviewEditorPage />}
            />
            <Route path={URL.COMMUNITY} element={<CommunityPage />} />
            <Route
              path={URL.COMMUNITY_POST_EDITOR}
              element={<PostEditorPage />}
            />
            <Route path={URL.COMMUNITY_POST} element={<CommunityPostPage />} />

            {/* 리다이렉트 */}
            <Route path="*" element={<Navigate to={URL.HOME} replace />} />
            <Route
              path={URL.COMMUNITY_TEACHER}
              element={<Navigate to="/community?type=teacher" replace />}
            />
            <Route
              path={URL.COMMUNITY_STUDENT}
              element={<Navigate to="/community?type=pre-teacher" replace />}
            />
            <Route
              path="/school/:id/work-review"
              element={<Navigate to="/school/:id/review?type=work" replace />}
            />
            <Route
              path="/school/:id/learning-review"
              element={
                <Navigate to="/school/:id/review?type=learning" replace />
              }
            />
          </Routes>
        </Suspense>
      </AppProvider>
    </div>
  );
}
