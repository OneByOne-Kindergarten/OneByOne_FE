import { useNavigate } from "react-router-dom";

import Empty from "@/components/@shared/layout/empty";
import Error from "@/components/@shared/layout/error";
import PageLayout from "@/components/@shared/layout/page-layout";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import SchoolCard from "@/components/school/school-card";
import { URL_PATHS } from "@/constants/url-path";
import { useFavorites } from "@/hooks/useFavorites";

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
      headerLogo={true}
      mainBg="gray"
      hasBackButton={false}
      mainClassName={favorites.length === 0 ? "pb-0 mb-0 mt-14" : "mt-14"}
      showAlarmButton={true}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <Error type="page">{error?.message}</Error>
      ) : favorites.length === 0 ? (
        <Empty
          type="page"
          title="관심있는 유치원을 추가해보세요."
          subTitle="유치원 상단바의 북마크 아이콘을 클릭해보세요."
        />
      ) : (
        <ul className="my-3 flex flex-col gap-2">
          {favorites.map((favorite) => (
            <li
              key={favorite.id}
              onClick={() => handleKindergartenClick(favorite.id.toString())}
              className="cursor-pointer"
            >
              <SchoolCard
                id={favorite.id.toString()}
                schoolName={favorite.name}
                location={favorite.address}
                establishment={favorite.establishment}
                workReviewAggregate={favorite.workReviewAggregate}
              />
            </li>
          ))}
        </ul>
      )}
    </PageLayout>
  );
}
