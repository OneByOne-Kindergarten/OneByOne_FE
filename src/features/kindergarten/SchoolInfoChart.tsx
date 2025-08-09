import { SVG_PATHS } from "@/common/constants/assets-path";
import CircleGraph from "@/features/kindergarten/circle-graph";
import SchoolInfoItem from "@/features/kindergarten/SchoolInfoItem";

const fixedColors = ["#FFD700", "#4CAF50", "#6CA6ED"];

interface StatItemProps {
  colorIndex: number;
  age: number;
  count: number;
  percent: string;
  unit: string;
}

function StatItem({ colorIndex, age, count, percent, unit }: StatItemProps) {
  // 색상 인덱스에 따라 색상 코드 사용
  const colorStyle = {
    backgroundColor: fixedColors[colorIndex % fixedColors.length],
  };

  return (
    <div className="flex items-center gap-4">
      <div style={colorStyle} className="h-2 w-2 rounded-full" />
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
    color?: string;
  }>;
}

export default function SchoolInfoChart({
  title,
  totalCount,
  unit,
  stats,
}: SchoolInfoChartProps) {
  // 그래프 데이터
  const graphStats = stats.map((stat, index) => ({
    ...stat,
    percent:
      typeof stat.percent === "number"
        ? stat.percent
        : parseFloat(stat.percent.replace("%", "")) || 0,
    color: fixedColors[index % fixedColors.length],
  }));

  // unit을 CircleGraph에 표시할 형식으로 변환
  const graphUnit = unit === "class" ? "개 학급" : "명";

  return (
    <div className="flex flex-col gap-1.5">
      <SchoolInfoItem
        icon={SVG_PATHS.CLASS}
        title={title}
        altText={`${title} 아이콘`}
      />
      <div className="flex justify-around gap-7 rounded-lg bg-primary-foreground px-4 py-4">
        <div className="flex flex-col gap-4 text-primary-dark02">
          <p className="text-base font-semibold">
            {title === "학급" ? "" : "유아 "}
            {totalCount}
            {unit === "class" ? "개 학급" : "명"}
          </p>
          <div>
            {stats.map((stat, index) => (
              <StatItem
                key={stat.age}
                colorIndex={index}
                age={stat.age}
                count={stat.count}
                percent={stat.percent}
                unit={unit === "class" ? "개 학급" : "명"}
              />
            ))}
          </div>
        </div>
        <CircleGraph
          stats={graphStats}
          totalCount={totalCount}
          unit={graphUnit}
          size={100}
        />
      </div>
    </div>
  );
}
