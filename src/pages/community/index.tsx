import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import {
  PRE_TEACHER_CATEGORIES,
  TEACHER_CATEGORIES,
  CategoryOption,
} from "@/constants/community";
import NavBar from "@/components/@shared/nav/nav-bar";
import PageLayout from "@/components/@shared/layout/page-layout";
import CommunityLayout from "@/components/community/community-layout";
import PostButton from "@/components/@shared/buttons/post-button";
import { setCommunityState } from "@/utils/lastVisitedPathUtils";

export default function Community() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const communityTypeOptions = [
    { href: "/community?type=teacher", label: "교사" },
    { href: "/community?type=pre-teacher", label: "예비교사" },
  ];

  const communityType =
    searchParams.get("type") === "pre-teacher" ? "pre-teacher" : "teacher";

  const categoryType = searchParams.get("category") || "top10";

  // 현재 타입에 맞는 카테고리 옵션 가져오기
  const categoryOptions =
    communityType === "pre-teacher"
      ? PRE_TEACHER_CATEGORIES
      : TEACHER_CATEGORIES;

  const handleTypeChange = (newType: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("type", newType);
    setSearchParams(newParams);
  };

  // 세션 스토리지에 위치 정보 저장
  useEffect(() => {
    setCommunityState({
      type: communityType as "teacher" | "pre-teacher",
      category: categoryType,
      path: `/community?type=${communityType}&category=${categoryType}`,
    });
  }, [communityType, categoryType]);

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
      currentPath={`/community?type=${communityType}&category=${categoryType}`}
      mainClassName="flex flex-col gap-6 pb-0 mb-28"
      hasBackButton={false}
    >
      <NavBar
        options={communityTypeOptions}
        currentPath={`/community?type=${communityType}`}
      />
      <CommunityLayout
        type={communityType as "teacher" | "pre-teacher"}
        categoryOptions={categoryOptions}
      />
      <PostButton onClick={handleWritePost} label="글쓰기" />
    </PageLayout>
  );
}
