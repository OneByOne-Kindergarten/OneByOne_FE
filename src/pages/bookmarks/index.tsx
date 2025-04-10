import { useNavigate } from "react-router-dom";

import Empty from "@/components/@shared/layout/empty";
import Error from "@/components/@shared/layout/error";
import SchoolCard from "@/components/school/school-card";
import PageLayout from "@/components/@shared/layout/page-layout";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";

import { useFavorites } from "@/hooks/useFavorites";
import { URL_PATHS } from "@/constants/url-path";

export default function Bookmarks() {
  const navigate = useNavigate();
  const { favorites, isLoading, isError, error } = useFavorites();

  const handleKindergartenClick = (id: string) => {
    navigate(`/school/${id}`);
  };

  return (
    <PageLayout
      title="원바원 | 즐겨찾기"
      description="즐겨찾기한 유치원 목록"
      currentPath={URL_PATHS.BOOKMARKS}
      headerTitle="즐겨찾기"
      mainBg="gray"
      hasBackButton={false}
      mainClassName={favorites.length === 0 ? "pb-0 mb-0" : ""}
    >
      {isLoading ? (
        <LoadingSpinner type="page" />
      ) : isError ? (
        <Error type="page">{error?.message}</Error>
      ) : favorites.length === 0 ? (
        <Empty type="page">
          <p className="text-sm">유치원을 즐겨찾기 해보세요.</p>
          <span className="text-xxs text-primary-normal02">
            유치원 상세 페이지에서 북마크를 눌러 즐겨찾기에 추가해보세요.
          </span>
        </Empty>
      ) : (
        <ul className="flex flex-col gap-2 my-3 ">
          {favorites.map((favorite) => (
            <div
              key={favorite.id}
              onClick={() =>
                handleKindergartenClick(favorite.kindergartenId.toString())
              }
              className="cursor-pointer"
            >
              <SchoolCard
                id={favorite.kindergartenId.toString()}
                schoolName={favorite.kindergartenName}
                location={favorite.kindergartenAddress}
                category=""
                score={0}
              />
            </div>
          ))}
        </ul>
      )}
    </PageLayout>
  );
}
