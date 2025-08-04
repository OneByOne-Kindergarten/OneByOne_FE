import { useMemo } from "react";

import Error from "@/components/@shared/layout/error";
import PageLayout from "@/components/@shared/layout/page-layout";
import SchoolPageSkeleton from "@/components/@shared/skeleton/school-page-skeleton";
import KindergartenList from "@/components/school/KindergartenList";
import NearbySchoolMap from "@/components/school/NearbySchoolMap";
import { URL_PATHS } from "@/constants/url-path";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useNearbyKindergartens } from "@/hooks/useNearbyKindergartens";

export default function SchoolPage() {
  const geolocationOptions = useMemo(
    () => ({
      enableHighAccuracy: true,
      timeout: 10000, // 10초
      maximumAge: 3600000, // 1시간
    }),
    []
  );

  const {
    position: userLocation,
    loading: isLoadingLocation,
    error: locationError,
  } = useGeolocation(geolocationOptions);

  const {
    kindergartens,
    isLoading: isLoadingKindergartens,
    error: kindergartensError,
  } = useNearbyKindergartens({
    latitude: userLocation?.latitude || null,
    longitude: userLocation?.longitude || null,
  });

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
      {isLoadingLocation || isLoadingKindergartens || !userLocation ? (
        <SchoolPageSkeleton />
      ) : locationError ? (
        <Error type="page">{locationError}</Error>
      ) : kindergartensError ? (
        <Error type="page">{kindergartensError}</Error>
      ) : (
        <>
          <NearbySchoolMap
            latitude={userLocation.latitude}
            longitude={userLocation.longitude}
            kindergartens={kindergartens.map((k) => ({
              id: k.id,
              name: k.name,
              latitude: k.latitude,
              longitude: k.longitude,
              establishment: k.establishment,
            }))}
          />
          <KindergartenList kindergartens={kindergartens} />
        </>
      )}
    </PageLayout>
  );
}
