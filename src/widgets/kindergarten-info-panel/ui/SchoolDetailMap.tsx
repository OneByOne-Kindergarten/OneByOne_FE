import LeafletMapWrapper from "@/app/providers/LeafletMapWrapper";
import LeafletMap from "@/features/map";
import KindergartenMapMarker from "@/features/map/ui/KindergartenMapMarker";

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
    <LeafletMapWrapper height="h-64">
      <LeafletMap
        latitude={latitude}
        longitude={longitude}
        level={17}
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
      </LeafletMap>
    </LeafletMapWrapper>
  );
}
