import { useSetAtom } from "jotai";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { memo, ReactNode, useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

import { leafletMapErrorAtom } from "@/entities/kindergarten/model";

import MapSkeleton from "./ui/MapSkeleton";

interface LeafletMapProps {
  latitude: number;
  longitude: number;
  level?: number;
  height?: string;
  className?: string;
  showUserLocation?: boolean;
  children?: ReactNode;
}

// 지도 중심 및 줌 업데이트 (메모이제이션으로 최적화)
const MapController = memo(
  ({
    latitude,
    longitude,
    zoom,
  }: {
    latitude: number;
    longitude: number;
    zoom: number;
  }) => {
    const map = useMap();

    useEffect(() => {
      map.setView([latitude, longitude], zoom);
    }, [latitude, longitude, zoom, map]);

    return null;
  }
);

export default function LeafletMap({
  latitude,
  longitude,
  level = 12,
  height = "h-80",
  className = "",
  showUserLocation = false,
  children,
}: LeafletMapProps) {
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);
  const setMapError = useSetAtom(leafletMapErrorAtom);

  const leafletZoom = Math.max(1, Math.min(18, level));

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${height} relative overflow-hidden rounded-lg border border-primary-normal01`}
    >
      <div className={`h-full w-full ${className}`}>
        <MapContainer
          center={[latitude, longitude]}
          zoom={leafletZoom}
          style={{ width: "100%", height: "100%" }}
          zoomControl={true}
          scrollWheelZoom={true}
          attributionControl={true}
          whenReady={() => {
            setShowSkeleton(false);
            setMapError(undefined);
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapController
            latitude={latitude}
            longitude={longitude}
            zoom={leafletZoom}
          />

          {/* 사용자 위치 마커 */}
          {showUserLocation && (
            <Marker
              position={[latitude, longitude]}
              icon={
                new L.Icon({
                  iconUrl:
                    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                })
              }
              title="현재 위치"
            />
          )}

          {/* 추가 마커들 */}
          {children}
        </MapContainer>

        {/* 스켈레톤을 오버레이로 표시 */}
        {showSkeleton && (
          <div className="absolute inset-0 z-[1000] bg-white">
            <MapSkeleton />
          </div>
        )}
      </div>
    </div>
  );
}
