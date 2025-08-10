interface MapSkeletonProps {
  height?: string;
}

export default function MapSkeleton({ height = "h-full" }: MapSkeletonProps) {
  return (
    <div
      className={`${height} relative flex w-full items-end justify-center overflow-hidden rounded-lg border border-primary-normal01 bg-primary-normal01 p-4`}
    >
      <div className="flex w-fit items-center gap-2 rounded-lg bg-white px-3 py-2">
        <div className="h-3 w-3 animate-spin rounded-full border-2 border-tertiary-3 border-t-transparent"></div>
        <p className="text-xs font-medium text-primary-dark01">
          지도 정보를 불러오는 중입니다
        </p>
      </div>
    </div>
  );
}
