interface SchoolCardSkeletonProps {
  count?: number;
}

export default function SchoolCardSkeleton({
  count = 3,
}: SchoolCardSkeletonProps) {
  return (
    <ul className="flex flex-col gap-2 pb-5">
      {Array.from({ length: count }, (_, index) => (
        <li key={index} className="bg-white px-5 py-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col gap-2.5">
              {/* Badge skeleton */}
              <div className="h-5 w-16 animate-pulse rounded bg-gray-200"></div>

              <div className="gap-1">
                {/* School name skeleton */}
                <div className="mb-2 h-5 w-32 animate-pulse rounded bg-gray-200"></div>

                {/* Location skeleton */}
                <div className="flex gap-1.5">
                  <div className="h-[18px] w-[18px] animate-pulse rounded bg-gray-200"></div>
                  <div className="h-4 w-48 animate-pulse rounded bg-gray-200"></div>
                </div>
              </div>
            </div>

            {/* Rating skeleton */}
            <div className="flex gap-2">
              <div className="h-6 w-6 animate-pulse rounded bg-gray-200"></div>
              <div className="h-5 w-8 animate-pulse rounded bg-gray-200"></div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
