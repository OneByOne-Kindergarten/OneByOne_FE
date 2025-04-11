import { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import {
  PROSPECTIVE_TEACHER_CATEGORIES,
  TEACHER_CATEGORIES,
} from "@/constants/community";
import NavBar from "@/components/@shared/nav/nav-bar";
import PageLayout from "@/components/@shared/layout/page-layout";
import CategorySelector from "@/components/community/category-selector";
import PopularPostsList from "@/components/community/popular-posts-list";
import CommunityPostsList from "@/components/community/post-list";
import PostButton from "@/components/@shared/buttons/post-button";
import { setCommunityState } from "@/utils/lastVisitedPathUtils";

export default function Community() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 카테고리 변경 추적을 위한 ref
  const prevCategoryRef = useRef<string | null>(null);
  const prevTypeRef = useRef<string | null>(null);

  const communityTypeOptions = [
    { href: "/community?type=teacher", label: "교사" },
    { href: "/community?type=pre-teacher", label: "예비교사" },
  ];

  const communityType =
    searchParams.get("type") === "pre-teacher" ? "pre-teacher" : "teacher";
  const categoryName = searchParams.get("category") || "top10";

  const categoryOptions =
    communityType === "pre-teacher"
      ? PROSPECTIVE_TEACHER_CATEGORIES
      : TEACHER_CATEGORIES;

  // 세션 스토리지에 위치 정보 저장 및 카테고리 변경 시 데이터 관리
  useEffect(() => {
    setCommunityState({
      path: `/community?type=${communityType}&category=${categoryName}`,
      category: communityType,
      communityCategoryName: categoryName,
    });

    const categoryChanged = prevCategoryRef.current !== categoryName;
    const typeChanged = prevTypeRef.current !== communityType;

    prevCategoryRef.current = categoryName;
    prevTypeRef.current = communityType;

    if (categoryChanged || typeChanged) {
      // 일반 게시글 카테고리에서 데이터 갱신
      if (categoryName !== "top10") {
        const queryParams = {
          pageSize: 10,
          category:
            communityType === "teacher" ? "TEACHER" : "PROSPECTIVE_TEACHER",
          categoryName: categoryName !== "all" ? categoryName : undefined,
        };

        if (categoryName === "all") {
          queryClient.refetchQueries({
            queryKey: ["communityPosts", queryParams],
            exact: false,
          });
        }
      }
    }
  }, [communityType, categoryName, queryClient]);

  const handleWritePost = () => {
    navigate("/community/new");
  };

  return (
    <PageLayout
      title={`원바원 | ${
        communityType === "teacher" ? "교사" : "예비교사"
      } 커뮤니티`}
      headerTitle="커뮤니티"
      headerType="community"
      description="유치원 교사와 예비교사를 위한 커뮤니티"
      currentPath={`/community?type=${communityType}&category=${categoryName}`}
      mainClassName="flex flex-col gap-6 pb-0 "
      hasBackButton={false}
    >
      <NavBar
        options={communityTypeOptions}
        currentPath={`/community?type=${communityType}`}
      />

      <div className="px-5 flex flex-col w-full gap-9">
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

      <PostButton onClick={handleWritePost} label="글쓰기" />
    </PageLayout>
  );
}
