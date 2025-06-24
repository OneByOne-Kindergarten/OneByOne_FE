import { useState } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

import MapError from "./MapError";
import MapSkeleton from "./MapSkeleton";

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  className?: string;
}

export default function KakaoMap({
  latitude,
  longitude,
  className = "",
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

  // SDK가 로딩 중일 때
  if (loading) {
    return <MapSkeleton />;
  }

  if (mapError) {
    return (
      <MapError latitude={latitude} longitude={longitude} mapError={mapError} />
    );
  }

  return (
    <div className="h-72 rounded-md overflow-hidden">
      <div className={`w-full h-full ${className}`}>
        {isMapLoading && <MapSkeleton />}
        <Map
          center={{ lat: latitude, lng: longitude }}
          style={{ width: "100%", height: "100%" }}
          level={5}
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
          <MapMarker position={{ lat: latitude, lng: longitude }} />
        </Map>
      </div>
    </div>
  );
}
