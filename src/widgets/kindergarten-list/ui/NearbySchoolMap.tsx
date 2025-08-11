import KakaoMap from "@/features/map";
import { calculateMapLevel } from "@/features/map/lib/calculateMapLevel";
import KindergartenMapMarker from "@/features/map/ui/KindergartenMapMarker";
import KakaoMapWrapper from "@/shared/ui/providers/KakaoMapWrapper";

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
    <section className="flex flex-col gap-3 p-5">
      <KakaoMapWrapper height="h-80">
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
                window.location.href = `/kindergarten/${kindergarten.id}`;
              }}
            />
          ))}
        </KakaoMap>
      </KakaoMapWrapper>
    </section>
  );
}
