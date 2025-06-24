import Button from "@/components/@shared/buttons/base-button";
import { SVG_PATHS } from "@/constants/assets-path";

interface MapErrorProps {
  latitude: number;
  longitude: number;
  mapError: string;
}

export default function MapError({
  latitude,
  longitude,
  mapError,
}: MapErrorProps) {
  return (
    <div className="w-full h-full bg-gradient-to-br flex flex-col gap-3 from-blue-100 to-green-100 rounded-lg items-center justify-center px-4 py-6">
      <div className="text-center">
        <img
          src={SVG_PATHS.LOCATION}
          alt="위치"
          className="w-6 h-6 mx-auto mb-2"
        />
        <p className="text-sm font-medium text-primary-dark02 mb-1">
          현재 위치
        </p>
        <p className="text-xs text-primary-normal03">
          위도: {latitude.toFixed(6)}
        </p>
        <p className="text-xs text-primary-normal03">
          경도: {longitude.toFixed(6)}
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full text-center p-3 bg-white opacity-80 rounded-lg">
        <p className="text-xs text-red-600 font-medium">⚠️ {mapError}</p>
        <Button
          onClick={() => {
            const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
            window.open(googleMapsUrl, "_blank");
          }}
          variant="secondary"
          size="md"
          font="xs"
        >
          구글맵에서 보기
        </Button>
      </div>
    </div>
  );
}
