import { useState, useEffect } from "react";

import Button from "@/components/@shared/buttons/base-button";
import SchoolCard from "@/components/school/school-card";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import PageLayout from "@/components/@shared/layout/page-layout";
import { getNearbyKindergartens } from "@/services/kindergartenService";
import { Kindergarten } from "@/types/kindergarten";
import { URL_PATHS } from "@/constants/url-path";

export default function School() {
  const [loading, setLoading] = useState<boolean>(true);
  const [kindergartens, setKindergartens] = useState<Kindergarten[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // 위치 정보 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("위치 정보를 가져오는데 실패했습니다:", error);
          setError(
            "위치 정보를 가져오는데 실패했습니다. 위치 권한을 확인해주세요."
          );
          setLoading(false);
        }
      );
    } else {
      setError("이 브라우저에서는 위치 정보를 지원하지 않습니다.");
      setLoading(false);
    }
  }, []);

  // 위치 정보가 있을 때 주변 유치원 조회
  useEffect(() => {
    const fetchNearbyKindergartens = async () => {
      if (!userLocation) return;

      try {
        setLoading(true);
        const response = await getNearbyKindergartens({
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        });

        if (response.success && response.data) {
          setKindergartens(response.data);
        } else {
          setError(
            response.message || "주변 유치원을 조회하는데 실패했습니다."
          );
        }
      } catch (error) {
        console.error("주변 유치원 조회 실패:", error);
        setError("주변 유치원을 조회하는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyKindergartens();
  }, [userLocation]);

  return (
    <PageLayout
      title="원바원 | 기관 찾기"
      description="지도와 검색을 통해 기관 찾기"
      headerTitle="기관 찾기"
      headerType="school"
      currentPath={URL_PATHS.SCHOOL}
      mainBg="gray"
      hasBackButton={false}
    >
      <section className="p-5 flex flex-col gap-3">
        <div className="bg-primary-normal01 h-52 rounded-md text-primary-normal02 flex items-center justify-center">
          {userLocation ? (
            <span>
              현재 위치: 위도 {userLocation.latitude.toFixed(6)}, 경도{" "}
              {userLocation.longitude.toFixed(6)}
            </span>
          ) : (
            <span>위치 정보를 불러오는 중...</span>
          )}
        </div>
        <Button size="lg" disabled={!userLocation || loading}>
          지도에서 유치원 찾기
        </Button>
      </section>
      <section className="flex flex-col gap-3">
        <div className="flex font-bold items-center gap-1 px-5">
          <h2 className="text-lg">주변 유치원</h2>
          <span className="text-xs">
            {kindergartens.length > 0 && `(${kindergartens.length})`}
          </span>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="px-5 py-10 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : kindergartens.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p>주변에 유치원이 없습니다.</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-2 pb-5">
            {kindergartens.map((kindergarten) => (
              <SchoolCard
                key={kindergarten.id}
                id={kindergarten.id.toString()}
                schoolName={kindergarten.name}
                location={kindergarten.address}
                category={kindergarten.establishment}
                score={0}
              />
            ))}
          </ul>
        )}
      </section>
    </PageLayout>
  );
}
