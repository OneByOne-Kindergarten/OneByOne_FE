import { useNavigate } from "react-router-dom";

import { URL_PATHS } from "@/common/constants/url-path";
import Empty from "@/common/ui/layout/empty";
import Error from "@/common/ui/layout/error";
import PageLayout from "@/common/ui/layout/page-layout";
import LoadingSpinner from "@/common/ui/loading/loading-spinner";
import { useGetFavorites } from "@/entities/favorites/hooks/useGetFavorites";
import SchoolCard from "@/features/kindergarten/school-card";

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites, isLoading, isError, error } = useGetFavorites({
    enabled: true,
  });

  const handleKindergartenClick = (id: string) => {
    navigate(`${URL_PATHS.KINDERGARTEN}/${id}`, {
      state: {
        fromBookmarks: true,
      },
    });
  };

  return (
    <PageLayout
      title="원바원 | 즐겨찾기"
      description="즐겨찾기한 유치원 목록"
      currentPath={URL_PATHS.FAVORITES}
      headerLogo={true}
      mainBg="gray"
      hasBackButton={false}
      mainClassName={favorites.length === 0 ? "pb-0 mb-0 mt-14" : "mb-14 mt-14"}
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
