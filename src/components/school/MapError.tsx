import Button from "@/components/@shared/buttons/base-button";
import { SVG_PATHS } from "@/constants/assets-path";

interface MapErrorProps {
  height: string;
  latitude: number;
  longitude: number;
  mapError: string;
}

export default function MapError({
  height,
  latitude,
  longitude,
  mapError,
}: MapErrorProps) {
  return (
    <div
      className={`${height} to-green-100 flex w-full flex-col items-center justify-center gap-6 rounded-lg border border-primary-normal01 bg-gradient-to-br from-blue-100 p-4`}
    >
      <div className="text-center">
        <img
          src={SVG_PATHS.LOCATION}
          alt="위치"
          className="mx-auto mb-2 h-6 w-6"
        />
        <p className="mb-2 text-sm font-medium text-primary-dark02">
          현재 위치
        </p>
        <p className="text-xs text-primary-normal03">
          위도: {latitude.toFixed(6)}
        </p>
        <p className="text-xs text-primary-normal03">
          경도: {longitude.toFixed(6)}
        </p>
      </div>

      <div className="flex w-full flex-col gap-3 rounded-lg bg-white p-3 text-center opacity-80">
        <p className="text-xs font-medium text-red-600">⚠️ {mapError}</p>
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
