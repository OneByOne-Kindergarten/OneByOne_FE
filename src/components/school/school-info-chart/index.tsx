import { SVG_PATHS } from "@/constants/assets-path";
import CircleGraph from "@/components/school/circle-graph";
import SchoolInfoItem from "@/components/school/school-info-item";

interface StatItemProps {
  color: string;
  age: number;
  count: number;
  percent: string;
  unit: string;
}

function StatItem({ color, age, count, percent, unit }: StatItemProps) {
  return (
    <div className="flex gap-4 items-center">
      <div className={`${color} w-2 h-2 rounded-full`} />
      <p className="text-xs text-primary-dark02">
        만 {age}세 {count}
        {unit} {percent}
      </p>
    </div>
  );
}

// 차트 섹션 컴포넌트
interface SchoolInfoChartProps {
  title: string;
  totalCount: number;
  unit: string;
  stats: Array<{
    age: number;
    count: number;
    percent: string;
    color: string;
  }>;
}

export default function SchoolInfoChart({
  title,
  totalCount,
  unit,
  stats,
}: SchoolInfoChartProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <SchoolInfoItem
        icon={SVG_PATHS.CLASS}
        title={title}
        altText={`${title} 아이콘`}
      />
      <div className="flex gap-7 py-4 px-4 justify-around bg-primary-foreground rounded-lg">
        <div className="flex flex-col gap-4 text-primary-dark02">
          <p className="text-base font-semibold">
            {title === "학급" ? "" : "유아 "}
            {totalCount}
            {unit === "class" ? "개 학급" : "명"}
          </p>
          <div>
            {stats.map((stat) => (
              <StatItem
                key={stat.age}
                color={stat.color}
                age={stat.age}
                count={stat.count}
                percent={stat.percent}
                unit={unit === "class" ? "개 학급" : "명"}
              />
            ))}
          </div>
        </div>
        <CircleGraph />
      </div>
    </div>
  );
}
