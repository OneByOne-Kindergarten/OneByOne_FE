import { SVG_PATHS } from "@/constants/assets-path";

export default function MapSkeleton() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-primary-normal01">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <div className="relative">
          <img
            src={SVG_PATHS.LOCATION}
            alt="위치"
            className="h-8 w-8 animate-bounce"
          />
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform">
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
