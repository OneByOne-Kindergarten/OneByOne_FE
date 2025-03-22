import { useParams } from "react-router-dom";
import { URL } from "@/constants/url";
import PageLayout from "@/components/@shared/layout/page-layout";
import CategoryNav from "@/components/@shared/nav/category-nav";

export default function LearningReview() {
  const { id } = useParams<{ id: string }>();
  const safeId = id || "unknown";

  const categoryOptions = [
    { href: URL.SCHOOL_DETAIL.replace(":id", safeId), label: "기관정보" },
    { href: URL.SCHOOL_REVIEW_WORK.replace(":id", safeId), label: "근무리뷰" },
    {
      href: URL.SCHOOL_REVIEW_LEARNING.replace(":id", safeId),
      label: "실습리뷰",
    },
  ];

  return (
    <PageLayout
      title={`원바원 | ${safeId} 실습리뷰`}
      description={`${safeId} 유치원 실습 리뷰 정보`}
      headerTitle={`${safeId}`}
      currentPath={URL.SCHOOL_REVIEW_LEARNING.replace(":id", safeId)}
      wrapperBg="white"
      mainBg="white"
    >
      <CategoryNav
        id={safeId}
        options={categoryOptions}
        currentPath={URL.SCHOOL_REVIEW_LEARNING.replace(":id", safeId)}
      />
      <section className="p-5 flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">학교 실습 리뷰</h2>
          <div className="p-5 bg-gray-light01 rounded-lg">
            <p className="text-primary-normal02">
              실습 리뷰 콘텐츠가 추가될 예정입니다.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
