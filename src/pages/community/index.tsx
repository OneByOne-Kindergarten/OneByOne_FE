import { Suspense, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { SVG_PATHS } from "@/common/constants/assets-path";
import {
  PROSPECTIVE_TEACHER_CATEGORIES,
  TEACHER_CATEGORIES,
} from "@/common/constants/community";
import PostButton from "@/common/ui/buttons/post-button";
import PageLayout from "@/common/ui/layout/page-layout";
import LoadingSpinner from "@/common/ui/loading/loading-spinner";
import { setCommunityState } from "@/common/utils/lastVisitedPathUtils";
import CategorySelector from "@/features/community/CategorySelector";
import NavBar from "@/widgets/nav/nav-bar";
import PostList from "@/widgets/postList";
import PopularPostList from "@/widgets/postList/PopularPostList";

const communityTypeOptions = [
  {
    href: "/community?type=teacher",
    label: "교사",
    icon: {
      path: SVG_PATHS.CHARACTER.chicken,
      alt: "교사 아이콘",
      width: 32,
      height: 32,
    },
  },
  {
    href: "/community?type=pre-teacher",
    label: "예비교사",
    icon: {
      path: SVG_PATHS.CHARACTER.chick,
      alt: "예비교사 아이콘",
      width: 32,
      height: 32,
    },
  },
];

export default function CommunityPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const communityType =
    searchParams.get("type") === "pre-teacher" ? "pre-teacher" : "teacher";
  const categoryName = searchParams.get("category") || "top10";

  const categoryOptions =
    communityType === "pre-teacher"
      ? PROSPECTIVE_TEACHER_CATEGORIES
      : TEACHER_CATEGORIES;

  // 세션 스토리지에 위치 정보 저장
  useEffect(() => {
    const newState = {
      path: `/community?type=${communityType}&category=${categoryName}`,
      category: communityType as "teacher" | "pre-teacher",
      communityCategoryName: categoryName,
    };

    setCommunityState(newState);
  }, [communityType, categoryName]);

  return (
    <PageLayout
      title={`원바원 | ${
        communityType === "teacher" ? "교사" : "예비교사"
      } 커뮤니티`}
      headerLogo={true}
      headerType="community"
      description="유치원 교사와 예비교사를 위한 커뮤니티"
      currentPath={`/community?type=${communityType}&category=${categoryName}`}
      mainClassName="flex flex-col gap-6 pb-0 mt-14"
      hasBackButton={false}
    >
      <NavBar
        options={communityTypeOptions}
        currentPath={`/community?type=${communityType}&category=${categoryName}`}
      />

      <div className="flex w-full flex-col gap-9 px-5">
        <CategorySelector
          type={communityType as "teacher" | "pre-teacher"}
          categoryOptions={categoryOptions}
        />
        {categoryName === "top10" ? (
          <section className="mb-12 flex flex-col gap-9 pb-1.5">
            <div className="flex items-center gap-2">
              <img src={SVG_PATHS.CHART} alt="그래프" width="20" height="18" />
              <h2 className="text-lg font-semibold">실시간 인기 게시글</h2>
            </div>
            <Suspense fallback={<LoadingSpinner type="element" />}>
              <PopularPostList />
            </Suspense>
          </section>
        ) : (
          <Suspense fallback={<LoadingSpinner type="element" />}>
            <PostList
              type={communityType as "teacher" | "pre-teacher"}
              categoryName={categoryName}
            />
          </Suspense>
        )}
      </div>

      <PostButton onClick={() => navigate("/community/new")} label="글쓰기" />
    </PageLayout>
  );
}
