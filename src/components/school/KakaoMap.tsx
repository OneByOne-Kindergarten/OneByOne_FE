import { ReactNode, useEffect, useState } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

import MapError from "./MapError";
import MapSkeleton from "./MapSkeleton";

const apiKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

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
  height = "h-80",
  className = "",
  showUserLocation = false,
  children,
}: KakaoMapProps) {
  const [isMapLoading, setIsMapLoading] = useState<boolean>(true);
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);
  const [renderError, setRenderError] = useState<unknown>(null);

  const [, loadError] = useKakaoLoader({
    appkey: apiKey || "",
    libraries: ["services", "clusterer", "drawing"],
  });

  // 최소 1초 동안 스켈레톤 표시
  useEffect(() => {
    if (!isMapLoading) {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isMapLoading]);

  // 에러메세지 출력
  const finalError = !apiKey
    ? "카카오맵 키가 설정되지 않았습니다"
    : loadError || renderError;

  return finalError ? (
    <MapError
      height={height}
      latitude={latitude}
      longitude={longitude}
      error={finalError}
    />
  ) : (
    <div
      className={`${height} overflow-hidden rounded-lg border border-primary-normal01`}
    >
      <div className={`h-full w-full ${className}`}>
        {showSkeleton && <MapSkeleton />}
        <Map
          center={{ lat: latitude, lng: longitude }}
          style={{ width: "100%", height: "100%" }}
          level={level}
          onCreate={() => {
            setIsMapLoading(false);
            setRenderError(null);
          }}
          onLoad={() => {
            setIsMapLoading(false);
            setRenderError(null);
          }}
          onError={(e) => {
            console.error("❌ 카카오맵 에러:", e);
            setRenderError(e);
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
