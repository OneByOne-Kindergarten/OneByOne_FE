import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import PostButton from "@/components/@shared/buttons/post-button";
import PageLayout from "@/components/@shared/layout/page-layout";
import NavBar from "@/components/@shared/nav/nav-bar";
import CategorySelector from "@/components/community/CategorySelector";
import PopularPostsList from "@/components/community/PopularPostsList";
import CommunityPostsList from "@/components/community/PostList";

import { SVG_PATHS } from "@/constants/assets-path";
import {
  PROSPECTIVE_TEACHER_CATEGORIES,
  TEACHER_CATEGORIES,
} from "@/constants/community";
import { setCommunityState } from "@/utils/lastVisitedPathUtils";

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
    setCommunityState({
      path: `/community?type=${communityType}&category=${categoryName}`,
      category: communityType,
      communityCategoryName: categoryName,
    });
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
        currentPath={`/community?type=${communityType}`}
      />

      <div className="flex w-full flex-col gap-9 px-5">
        <CategorySelector
          type={communityType as "teacher" | "pre-teacher"}
          categoryOptions={categoryOptions}
        />

        {categoryName === "top10" ? (
          <PopularPostsList />
        ) : (
          <CommunityPostsList
            type={communityType as "teacher" | "pre-teacher"}
            categoryName={categoryName}
          />
        )}
      </div>

      <PostButton onClick={() => navigate("/community/new")} label="글쓰기" />
    </PageLayout>
  );
}
