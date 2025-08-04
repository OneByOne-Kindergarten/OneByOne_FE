import SchoolCardSkeleton from "@/components/@shared/skeleton/school-card-skeleton";
import MapSkeleton from "@/components/school/MapSkeleton";

export default function SchoolPageSkeleton() {
  return (
    <>
      <section className="flex flex-col gap-3 p-5">
        <MapSkeleton height="h-80" />
      </section>

      <section className="flex min-h-[300px] flex-col gap-3">
        <div className="flex items-center gap-1 px-5 font-bold">
          <h2 className="text-lg">주변 유치원</h2>
        </div>
        <SchoolCardSkeleton count={5} />
      </section>
    </>
  );
}
