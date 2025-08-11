import KakaoMap from "@/features/map";
import KindergartenMapMarker from "@/features/map/ui/KindergartenMapMarker";
import KakaoMapWrapper from "@/shared/ui/providers/KakaoMapWrapper";

interface SchoolDetailMapProps {
  latitude: number;
  longitude: number;
  schoolName: string;
  establishment?: string;
  className?: string;
}

export default function SchoolDetailMap({
  latitude,
  longitude,
  schoolName,
  establishment,
  className = "",
}: SchoolDetailMapProps) {
  return (
    <KakaoMapWrapper height="h-64">
      <KakaoMap
        latitude={latitude}
        longitude={longitude}
        level={4}
        height="h-64"
        className={className}
        showUserLocation={false}
      >
        <KindergartenMapMarker
          latitude={latitude}
          longitude={longitude}
          name={schoolName}
          establishment={establishment}
          size="md"
          showLabel={true}
        />
      </KakaoMap>
    </KakaoMapWrapper>
  );
}
