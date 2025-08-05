import { SVG_PATHS } from "@/constants/assets-path";

interface MapSkeletonProps {
  height?: string;
}

export default function MapSkeleton({ height = "h-full" }: MapSkeletonProps) {
  return (
    <div
      className={`${height} relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-primary-normal01 bg-primary-normal01`}
    >
      <div className="flex flex-col items-center gap-4">
        <img
          src={SVG_PATHS.LOCATION}
          alt="위치"
          className="h-8 w-8 animate-bounce"
        />
        <div className="rounded-full bg-white/90 px-3 py-1 shadow-sm">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <div className="h-3 w-3 animate-spin rounded-full border-2 border-tertiary-3 border-t-transparent"></div>
            <span>카카오맵 로딩 중</span>
          </div>
        </div>
      </div>
    </div>
  );
}
