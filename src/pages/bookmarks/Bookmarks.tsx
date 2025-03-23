import { URL } from "@/constants/url";
import SchoolCard from "@/components/school/school-card";
import PageLayout from "@/components/@shared/layout/page-layout";

export default function Bookmarks() {
  return (
    <PageLayout
      title="원바원 | 즐겨찾기"
      description="즐겨찾기한 유치원 목록"
      currentPath={URL.BOOKMARKS}
      headerTitle="즐겨찾기"
      mainBg="gray"
      hasBackButton={false}
    >
      <ul className="flex flex-col gap-2 my-3">
        <SchoolCard />
        <SchoolCard />
      </ul>
    </PageLayout>
  );
}
