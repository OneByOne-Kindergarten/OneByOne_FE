import { calculateMapLevel } from "@/utils/mapUtils";

import KakaoMap from "./KakaoMap";
import KindergartenMapMarker from "./KindergartenMapMarker";

interface KindergartenMapMarker {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  establishment?: string;
}

interface NearbySchoolMapProps {
  latitude: number;
  longitude: number;
  className?: string;
  kindergartens?: KindergartenMapMarker[];
}

export default function NearbySchoolMap({
  latitude,
  longitude,
  className = "",
  kindergartens = [],
}: NearbySchoolMapProps) {
  const mapLevel = calculateMapLevel(
    { latitude, longitude },
    kindergartens.map((k) => ({ latitude: k.latitude, longitude: k.longitude }))
  );

  return (
    <KakaoMap
      latitude={latitude}
      longitude={longitude}
      level={mapLevel}
      height="h-80"
      className={className}
      showUserLocation={true}
    >
      {kindergartens.map((kindergarten) => (
        <KindergartenMapMarker
          key={kindergarten.id}
          latitude={kindergarten.latitude}
          longitude={kindergarten.longitude}
          name={kindergarten.name}
          establishment={kindergarten.establishment}
          size="md"
          onClick={() => {
            window.location.href = `/school/${kindergarten.id}`;
          }}
        />
      ))}
    </KakaoMap>
  );
}
