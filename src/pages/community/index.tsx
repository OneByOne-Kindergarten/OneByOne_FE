import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { COMMUNITY_CATEGORIES, CATEGORY_LABELS } from "@/constants/community";
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

  const categoryType =
    searchParams.get("category") || COMMUNITY_CATEGORIES.TOP10;

  const categoryOptions = Object.entries(COMMUNITY_CATEGORIES).map(
    ([key, value]) => ({
      value,
      label: CATEGORY_LABELS[value],
    })
  );

  const handleTypeChange = (newType: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("type", newType);
    setSearchParams(newParams);
  };

  // 세션 스토리지에 위치 정보 저장
  useEffect(() => {
    // 커뮤니티 상태 한번에 저장
    setCommunityState({
      type: communityType as "teacher" | "pre-teacher",
      category: categoryType,
      path: `/community?type=${communityType}&category=${categoryType}`,
    });
  }, [communityType, categoryType]);

  // 글쓰기 버튼 클릭 핸들러
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
      mainClassName="flex flex-col gap-6 pb-6 mb-28"
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
