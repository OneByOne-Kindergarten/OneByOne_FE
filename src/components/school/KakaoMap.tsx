import { useState } from "react";
import {
  Map,
  MapMarker,
  useKakaoLoader,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";

import MapError from "./MapError";
import MapSkeleton from "./MapSkeleton";
import { SVG_PATHS } from "@/constants/assets-path";

interface KindergartenMarker {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  establishment?: string;
}

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  className?: string;
  kindergartens?: KindergartenMarker[];
}

export default function KakaoMap({
  latitude,
  longitude,
  className = "",
  kindergartens = [],
}: KakaoMapProps) {
  const [isMapLoading, setIsMapLoading] = useState<boolean>(true);
  const [mapError, setMapError] = useState<string | null>(null);

  const calculateMapLevel = () => {
    if (kindergartens.length === 0) return 6;

    // 현재 위치와 모든 유치원의 위경도 범위 계산
    const lats = [latitude, ...kindergartens.map((k) => k.latitude)];
    const lngs = [longitude, ...kindergartens.map((k) => k.longitude)];

    const latDiff = Math.max(...lats) - Math.min(...lats);
    const lngDiff = Math.max(...lngs) - Math.min(...lngs);
    const maxDiff = Math.max(latDiff, lngDiff);

    // 범위에 따른 레벨 결정
    if (maxDiff > 0.3) return 9;
    if (maxDiff > 0.2) return 8;
    if (maxDiff > 0.1) return 7;
    return 6;
  };

  const apiKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

  const [loading, error] = useKakaoLoader({
    appkey: apiKey || "",
    libraries: ["services", "clusterer", "drawing"],
  });

  if (!apiKey) {
    return (
      <MapError
        latitude={latitude}
        longitude={longitude}
        mapError="카카오맵 키가 설정되지 않았습니다"
      />
    );
  }

  if (error) {
    return (
      <MapError
        latitude={latitude}
        longitude={longitude}
        mapError={`${error.message}`}
      />
    );
  }

  if (loading) {
    return <MapSkeleton />;
  }

  if (mapError) {
    return (
      <MapError latitude={latitude} longitude={longitude} mapError={mapError} />
    );
  }

  return (
    <div className="h-72 rounded-md shadow-md overflow-hidden">
      <div className={`w-full h-full ${className}`}>
        {isMapLoading && <MapSkeleton />}
        <Map
          center={{ lat: latitude, lng: longitude }}
          style={{ width: "100%", height: "100%" }}
          level={calculateMapLevel()}
          onCreate={() => {
            setIsMapLoading(false);
            setMapError(null);
          }}
          onLoad={() => {
            setIsMapLoading(false);
            setMapError(null);
          }}
          onError={(e) => {
            console.error("❌ 카카오맵 에러:", e);
            setMapError(`${e}`);
            setIsMapLoading(false);
          }}
        >
          {/* 사용자 위치 마커 */}
          <MapMarker
            position={{ lat: latitude, lng: longitude }}
            title="현재 위치"
          />

          {/* 유치원 위치 마커 */}
          {kindergartens.map((kindergarten) => {
            const getMarkerStyles = (establishment?: string) => {
              const isPublic = establishment?.includes("공립");
              const isPrivate = establishment?.includes("사립");

              if (isPublic) {
                return {
                  bgColor: "#6CA6ED",
                  borderColor: "transparent",
                  textColor: "white",
                  text: "공립",
                  showIcon: false,
                };
              }

              if (isPrivate) {
                return {
                  bgColor: "white",
                  borderColor: "#6CA6ED",
                  textColor: "#6CA6ED",
                  text: "사립",
                  showIcon: false,
                };
              }

              return {
                bgColor: "#6b7280",
                borderColor: "transparent",
                textColor: "white",
                text: "미확인",
                showIcon: false,
              };
            };

            const styles = getMarkerStyles(kindergarten.establishment);

            return (
              <CustomOverlayMap
                key={kindergarten.id}
                position={{
                  lat: kindergarten.latitude,
                  lng: kindergarten.longitude,
                }}
                yAnchor={1}
              >
                <div
                  className="flex flex-col items-center cursor-pointer transform hover:scale-110 transition-transform"
                  onClick={() => {
                    window.location.href = `/school/${kindergarten.id}`;
                  }}
                  title={`${kindergarten.name} (${kindergarten.establishment || "기타"})`}
                >
                  {/* 마커 아이콘 */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2"
                    style={{
                      backgroundColor: styles.bgColor,
                      borderColor: styles.borderColor,
                      color: styles.textColor,
                    }}
                  >
                    {styles.showIcon ? (
                      <img
                        src={SVG_PATHS.SCHOOL.active}
                        alt={kindergarten.establishment || "유치원"}
                        className="w-4 h-4 invert"
                      />
                    ) : (
                      <span className="text-xs font-bold">{styles.text}</span>
                    )}
                  </div>

                  {/* 화살표 */}
                  <div
                    className="w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent"
                    style={{
                      borderTopColor: styles.showIcon
                        ? styles.bgColor
                        : styles.borderColor === "transparent"
                          ? styles.bgColor
                          : styles.borderColor,
                    }}
                  />

                  {/* 유치원 이름 라벨 */}
                  <div className="opacity-90 bg-white p-0.5 rounded shadow-md text-xs font-semibold mt-0.5 max-w-24 truncate">
                    {kindergarten.name}
                  </div>
                </div>
              </CustomOverlayMap>
            );
          })}
        </Map>
      </div>
    </div>
  );
}
