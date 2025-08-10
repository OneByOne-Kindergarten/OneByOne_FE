import type { Kindergarten } from "@/entities/kindergarten/DTO.d";
import Empty from "@/shared/ui/layout/empty";
import SchoolCard from "@/widgets/content-list/kindergarten-list/ui/SchoolCard";

interface KindergartenListProps {
  kindergartens: Kindergarten[];
}

export default function KindergartenList({
  kindergartens,
}: KindergartenListProps) {
  return (
    <section className="flex min-h-[300px] flex-col gap-3">
      <div className="flex items-center gap-1 px-5 font-bold">
        <h2 className="text-lg">주변 유치원</h2>
        <span className="text-xs">
          {kindergartens.length > 0 && `(${kindergartens.length})`}
        </span>
      </div>

      {kindergartens.length === 0 ? (
        <Empty
          title="주변 유치원을 찾을 수 없습니다."
          subTitle="위치 정보를 확인해주세요."
        />
      ) : (
        <ul className="flex flex-col gap-2 pb-5">
          {kindergartens.map((kindergarten: Kindergarten) => (
            <SchoolCard
              key={kindergarten.id}
              id={kindergarten.id.toString()}
              schoolName={kindergarten.name}
              location={kindergarten.address}
              establishment={kindergarten.establishment}
              workReviewAggregate={kindergarten.workReviewAggregate}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
