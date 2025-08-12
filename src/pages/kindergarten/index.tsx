import { useMemo } from "react";

import { useNearbyKindergartens } from "@/entities/kindergarten/hooks";
import { URL_PATHS } from "@/shared/constants/url-path";
import Error from "@/shared/ui/layout/error";
import PageLayout from "@/shared/ui/layout/page-layout";
import KindergartenPageSkeleton from "@/shared/ui/skeleton/kindergarten-page-skeleton";
import KindergartenList from "@/widgets/kindergarten-list";
import { useGeolocation } from "@/widgets/kindergarten-list/lib/useGeolocation";
import NearbySchoolMap from "@/widgets/kindergarten-list/ui/NearbySchoolMap";

export default function KindergartenPage() {
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
      headerType="kindergarten"
      headerLogo={true}
      currentPath={URL_PATHS.KINDERGARTEN}
      mainBg="gray"
      hasBackButton={false}
    >
      {isLoadingLocation || isLoadingKindergartens || !userLocation ? (
        <KindergartenPageSkeleton />
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
