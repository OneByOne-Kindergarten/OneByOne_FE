import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import Empty from "@/components/@shared/layout/empty";
import Error from "@/components/@shared/layout/error";
import PageLayout from "@/components/@shared/layout/page-layout";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import NearbySchoolMap from "@/components/school/NearbySchoolMap";
import SchoolCard from "@/components/school/school-card";

import { URL_PATHS } from "@/constants/url-path";
import { useGeolocation } from "@/hooks/useGeolocation";
import { getNearbyKindergartens } from "@/services/kindergartenService";
import type { Kindergarten } from "@/types/kindergartenDTO";

export default function SchoolPage() {
  const geolocationOptions = useMemo(
    () => ({
      enableHighAccuracy: true,
      timeout: 10000, // 10초
      maximumAge: 600000, // 10분
    }),
    []
  );

  const {
    position: userLocation,
    loading: isLoadingLocation,
    error: locationError,
  } = useGeolocation(geolocationOptions);

  const {
    data: nearbyKindergartensResponse,
    isLoading: isLoadingKindergartens,
    error: kindergartensError,
  } = useQuery({
    queryKey: [
      "kindergartens",
      "nearby",
      userLocation?.latitude,
      userLocation?.longitude,
    ],
    queryFn: () =>
      getNearbyKindergartens({
        latitude: userLocation!.latitude,
        longitude: userLocation!.longitude,
      }),
    enabled: !!userLocation, // 위치 정보가 있을 때 실행
    staleTime: 1000 * 60 * 10, // 10분
    gcTime: 1000 * 60 * 30, // 30분
  });

  // 데이터 정제
  const kindergartens =
    nearbyKindergartensResponse?.success && nearbyKindergartensResponse?.data
      ? nearbyKindergartensResponse.data
      : [];

  const isLoading =
    isLoadingLocation || (!!userLocation && isLoadingKindergartens);

  const error =
    locationError ||
    (kindergartensError instanceof Error ? kindergartensError.message : null) ||
    (nearbyKindergartensResponse && !nearbyKindergartensResponse.success
      ? nearbyKindergartensResponse.message
      : null);

  return (
    <PageLayout
      title="원바원 | 기관 찾기"
      description="지도와 검색을 통해 기관 찾기"
      headerType="school"
      headerLogo={true}
      currentPath={URL_PATHS.SCHOOL}
      mainBg="gray"
      hasBackButton={false}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <Error type="page">{error}</Error>
      ) : (
        <>
          <section className="flex flex-col gap-3 p-5">
            <NearbySchoolMap
              latitude={userLocation!.latitude}
              longitude={userLocation!.longitude}
              kindergartens={kindergartens.map((k) => ({
                id: k.id,
                name: k.name,
                latitude: k.latitude,
                longitude: k.longitude,
                establishment: k.establishment,
              }))}
            />
          </section>
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-1 px-5 font-bold">
              <h2 className="text-lg">주변 유치원</h2>
              <span className="text-xs">
                {kindergartens.length > 0 && `(${kindergartens.length})`}
              </span>
            </div>
            {kindergartens.length === 0 ? (
              <Empty
                title="주변 유치원을 찾을 수 없습니다."
                subTitle="위치 정보를 확인해주세요."
              />
            ) : (
              <ul className="flex flex-col gap-2 pb-5">
                {kindergartens.map((kindergarten: Kindergarten) => (
                  <SchoolCard
                    key={kindergarten.id}
                    id={kindergarten.id.toString()}
                    schoolName={kindergarten.name}
                    location={kindergarten.address}
                    establishment={kindergarten.establishment}
                    workReviewAggregate={kindergarten.workReviewAggregate}
                  />
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </PageLayout>
  );
}
