import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppProvider from "./components/@shared/providers/AppProvider";

const HomePage = lazy(() => import("./pages/Home"));
const SchoolPage = lazy(() => import("./pages/school/School"));
const SignInPage = lazy(() => import("./pages/auth/SignIn"));
const SignUpPage = lazy(() => import("./pages/auth/SignUp"));
const SchoolDetailPage = lazy(() => import("./pages/school/SchoolDetail"));
const WorkReviewPage = lazy(() => import("./pages/review/WorkReview"));
const LearningReviewPage = lazy(() => import("./pages/review/LearningReview"));
const CommunityTeacherPage = lazy(
  () => import("./pages/community/CommunityTeacher")
);
const CommunityStudentPage = lazy(
  () => import("./pages/community/CommunityStudent")
);
const BookmarksPage = lazy(() => import("./pages/bookmarks/Bookmarks"));
const UserPage = lazy(() => import("./pages/user/User"));

const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

export default function App() {
  return (
    <AppProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/school" element={<SchoolPage />} />
          <Route path="/school/:id" element={<SchoolDetailPage />} />
          <Route path="/school/:id/work-review" element={<WorkReviewPage />} />
          <Route
            path="/school/:id/learning-review"
            element={<LearningReviewPage />}
          />
          <Route path="/community-teacher" element={<CommunityTeacherPage />} />
          <Route path="/community-student" element={<CommunityStudentPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AppProvider>
  );
}
