import MapSkeleton from "@/features/map/ui/MapSkeleton";
import KindergartenCardSkeleton from "@/shared/ui/skeleton/kindergarten-card-skeleton";

export default function KindergartenPageSkeleton() {
  return (
    <>
      <section className="flex flex-col gap-3 p-5">
        <MapSkeleton height="h-80" />
      </section>

      <section className="flex min-h-[300px] flex-col gap-3">
        <div className="flex items-center gap-1 px-5 font-bold">
          <h2 className="text-lg">주변 유치원</h2>
        </div>
        <KindergartenCardSkeleton count={5} />
      </section>
    </>
  );
}
