import { useState, ReactNode } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

import MapError from "./MapError";
import MapSkeleton from "./MapSkeleton";

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  level?: number;
  height?: string;
  className?: string;
  showUserLocation?: boolean;
  children?: ReactNode;
}

export default function KakaoMap({
  latitude,
  longitude,
  level = 6,
  height = "h-72",
  className = "",
  showUserLocation = false,
  children,
}: KakaoMapProps) {
  const [isMapLoading, setIsMapLoading] = useState<boolean>(true);
  const [mapError, setMapError] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

  const [loading, error] = useKakaoLoader({
    appkey: apiKey || "",
    libraries: ["services", "clusterer", "drawing"],
  });

  if (!apiKey) {
    return (
      <MapError
        height={height}
        latitude={latitude}
        longitude={longitude}
        mapError="카카오맵 키가 설정되지 않았습니다"
      />
    );
  }

  if (error) {
    return (
      <MapError
        height={height}
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
      <MapError
        height={height}
        latitude={latitude}
        longitude={longitude}
        mapError={mapError}
      />
    );
  }

  return (
    <div
      className={`${height} overflow-hidden rounded-lg border border-primary-normal01`}
    >
      <div className={`h-full w-full ${className}`}>
        {isMapLoading && <MapSkeleton />}
        <Map
          center={{ lat: latitude, lng: longitude }}
          style={{ width: "100%", height: "100%" }}
          level={level}
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
          {showUserLocation && (
            <MapMarker
              position={{ lat: latitude, lng: longitude }}
              title="현재 위치"
            />
          )}

          {/* 추가 마커들 */}
          {children}
        </Map>
      </div>
    </div>
  );
}
