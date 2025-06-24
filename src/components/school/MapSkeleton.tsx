import { SVG_PATHS } from "@/constants/assets-path";

export default function MapSkeleton() {
  return (
    <div className="w-full h-full bg-primary-normal01 rounded-lg relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <img
            src={SVG_PATHS.LOCATION}
            alt="위치"
            className="w-8 h-8 animate-bounce"
          />
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-white/90 px-3 py-1 rounded-full shadow-sm">
          <div className="text-xs text-gray-600 flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-tertiary-3 border-t-transparent rounded-full animate-spin"></div>
            <span>카카오맵 로딩 중</span>
          </div>
        </div>
      </div>
    </div>
  );
}
