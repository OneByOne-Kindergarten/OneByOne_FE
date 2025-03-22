import { URL } from "@/constants/url";
import Button from "@/components/@shared/buttons/button";
import SchoolCard from "@/components/school/school-card";
import PageLayout from "@/components/@shared/layout/page-layout";

export default function School() {
  return (
    <PageLayout
      title="원바원 | 기관 찾기"
      description="지도와 검색을 통해 기관 찾기"
      headerTitle="기관 찾기"
      currentPath={URL.SCHOOL}
      mainBg="gray"
    >
      <section className="p-5 flex flex-col gap-3">
        <div className="bg-primary-normal01 h-52 rounded-md text-primary-normal02">
          <span>현재 위치</span>
        </div>
        <Button size="lg">지도에서 유치원 찾기</Button>
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="font-bold text-lg flex flex-col gap-3 px-5">
          주변 유치원
        </h2>
        <ul className="flex flex-col gap-2 pb-5">
          <SchoolCard />
          <SchoolCard />
        </ul>
      </section>
    </PageLayout>
  );
}
