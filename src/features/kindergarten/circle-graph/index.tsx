import { useInView } from "@/common/hooks/useInView";

interface CircleGraphProps {
  stats: Array<{
    age: number;
    count: number;
    percent: number | string;
    color: string;
  }>;
  size?: number;
  totalCount?: number;
  unit?: string;
}

const fixedColors = ["#FFD700", "#4CAF50", "#6CA6ED"];

export default function CircleGraph({ stats, size = 100 }: CircleGraphProps) {
  const [graphRef, isInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const radius = size / 2; // 외부 원 반지름
  const strokeWidth = size * 0.23; // 두께
  const innerRadius = radius - strokeWidth / 1.3; // 내부 원 반지름
  let startAngle = -90; // 시작 각도 (12시 방향, -90도)

  // percent를 숫자로 변환
  const parsePercent = (percent: number | string): number => {
    if (typeof percent === "number") return percent;
    return parseFloat(percent.replace("%", "")) || 0;
  };

  const normalizedStats = stats.map((stat) => ({
    ...stat,
    percent: parsePercent(stat.percent),
  }));

  // NaN이나 숫자가 아닌 값 검사
  const validStats = normalizedStats.filter(
    (stat) =>
      !isNaN(stat.percent) &&
      typeof stat.percent === "number" &&
      !isNaN(stat.count) &&
      typeof stat.count === "number"
  );

  // 모든 퍼센트의 합 보정
  const totalPercent = validStats.reduce((sum, stat) => sum + stat.percent, 0);
  const scaleFactor = totalPercent > 0 ? 100 / totalPercent : 1;

  // 통계 항목 최대 3개까지 표시
  const displayStats =
    validStats.length > 3
      ? [
          ...validStats.slice(0, 2),
          // 나머지 항목들 "기타"로 표시
          {
            age: 0,
            count: validStats
              .slice(2)
              .reduce((sum, stat) => sum + stat.count, 0),
            percent: validStats
              .slice(2)
              .reduce((sum, stat) => sum + stat.percent, 0),
            color: fixedColors[2],
          },
        ]
      : validStats.map((stat, index) => ({
          ...stat,
          color:
            index < fixedColors.length ? fixedColors[index] : fixedColors[0], // 고정된 색상 사용
        }));

  return (
    <div
      ref={graphRef as React.RefObject<HTMLDivElement>}
      className={`relative transition-all duration-700 ease-out ${isInView ? "scale-100 opacity-100" : "scale-95 opacity-60"} `}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* 배경 원 */}
        <circle
          cx={radius}
          cy={radius}
          r={innerRadius}
          fill="none"
          stroke="#F2F4F6"
          strokeWidth={strokeWidth}
          className={`transition-opacity duration-500 ease-in-out ${isInView ? "opacity-100" : "opacity-30"} `}
        />

        {/* 그래프 조각 */}
        {displayStats.map((stat, index) => {
          // 현재 통계의 각도 계산
          const adjustedPercent = stat.percent * scaleFactor;
          const angle = (adjustedPercent / 100) * 360;

          // 원호의 시작점과 끝점 좌표 계산
          const startX =
            radius + innerRadius * Math.cos((startAngle * Math.PI) / 180);
          const startY =
            radius + innerRadius * Math.sin((startAngle * Math.PI) / 180);

          // 현재 통계의 끝 각도
          const endAngle = startAngle + angle;
          const endX =
            radius + innerRadius * Math.cos((endAngle * Math.PI) / 180);
          const endY =
            radius + innerRadius * Math.sin((endAngle * Math.PI) / 180);

          // 각도가 180도를 넘는지 확인
          const largeArcFlag = angle > 180 ? 1 : 0;

          // SVG 패스 생성
          const pathData = [
            `M ${startX} ${startY}`, // 시작점으로 이동
            `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${endX} ${endY}`, // 원호 그리기
          ].join(" ");

          // 패스 길이 계산 (애니메이션용)
          const circumference = 2 * Math.PI * innerRadius;
          const pathLength = (angle / 360) * circumference;

          // 다음 조각의 시작 각도 업데이트
          startAngle = endAngle;

          return (
            <path
              key={index}
              d={pathData}
              fill="none"
              stroke={stat.color || fixedColors[0]}
              strokeWidth={strokeWidth}
              strokeLinecap="butt"
              className="transition-all duration-1000 ease-out"
              style={{
                strokeDasharray: `${pathLength}`,
                strokeDashoffset: isInView ? 0 : pathLength,
                transitionDelay: `${index * 200}ms`,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
