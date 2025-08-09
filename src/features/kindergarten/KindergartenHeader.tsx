import { useNearbyKindergartens } from "@/entities/kindergarten/hooks/useNearbyKindergartens";

interface KindergartenHeaderProps {
  latitude: number;
  longitude: number;
}

export default function KindergartenHeader({
  latitude,
  longitude,
}: KindergartenHeaderProps) {
  const { kindergartens } = useNearbyKindergartens({
    latitude,
    longitude,
  });

  return (
    <div className="flex items-center gap-1 px-5 font-bold">
      <h2 className="text-lg">주변 유치원</h2>
      <span className="text-xs">
        {kindergartens.length > 0 && `(${kindergartens.length})`}
      </span>
    </div>
  );
}
