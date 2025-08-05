import { useAtom } from "jotai";
import { ReactNode, useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import { kakaoMapSDKLoadedAtom } from "@/stores/kakaoMapStore";

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
  height = "h-80",
  className = "",
  showUserLocation = false,
  children,
}: KakaoMapProps) {
  const [isMapLoading, setIsMapLoading] = useState<boolean>(true);
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);
  const [renderError, setRenderError] = useState<unknown>(null);
  const [isSDKLoaded] = useAtom(kakaoMapSDKLoadedAtom);

  // SDK가 로딩되지 않았거나 지도가 렌더링 중이면 스켈레톤 표시
  useEffect(() => {
    setShowSkeleton(!isSDKLoaded || isMapLoading);
  }, [isSDKLoaded, isMapLoading]);

  const finalError = renderError;

  if (showSkeleton) {
    return <MapSkeleton height={height} />;
  }

  if (finalError) {
    return (
      <MapError
        height={height}
        latitude={latitude}
        longitude={longitude}
        error={finalError}
      />
    );
  }

  return (
    <div
      className={`${height} relative overflow-hidden rounded-lg border border-primary-normal01`}
    >
      <div className={`h-full w-full ${className}`}>
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
