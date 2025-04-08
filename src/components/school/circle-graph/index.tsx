interface CircleGraphProps {
  stats: Array<{
    age: number;
    count: number;
    percent: number;
    color: string;
  }>;
  size?: number;
  totalCount?: number;
  unit?: string;
}

const fixedColors = ["#FFD700", "#4CAF50", "#6CA6ED"];

export default function CircleGraph({ stats, size = 100 }: CircleGraphProps) {
  const radius = size / 2; // 외부 원 반지름
  const strokeWidth = size * 0.23; // 두께
  const innerRadius = radius - strokeWidth / 1.3; // 내부 원 반지름
  let startAngle = -90; // 시작 각도 (12시 방향, -90도)

  // 모든 퍼센트의 합이 100이 되도록 보정
  const totalPercent = stats.reduce((sum, stat) => sum + stat.percent, 0);
  const scaleFactor = totalPercent > 0 ? 100 / totalPercent : 1;

  // 통계 항목 최대 3개까지 표시
  const displayStats =
    stats.length > 3
      ? [
          ...stats.slice(0, 2),
          // 나머지 항목들 "기타"로 표시
          {
            age: 0,
            count: stats.slice(2).reduce((sum, stat) => sum + stat.count, 0),
            percent: stats
              .slice(2)
              .reduce((sum, stat) => sum + stat.percent, 0),
            color: fixedColors[2],
          },
        ]
      : stats.map((stat, index) => ({
          ...stat,
          color:
            index < fixedColors.length ? fixedColors[index] : fixedColors[0], // 고정된 색상 사용
        }));

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* 배경 원 */}
        <circle
          cx={radius}
          cy={radius}
          r={innerRadius}
          fill="none"
          stroke="#F2F4F6"
          strokeWidth={strokeWidth}
        />

        {/* 그래프 조각 */}
        {displayStats.map((stat, index) => {
          // 현재 통계의 각도 계산 (퍼센트를 각도로 변환, 보정된 값 사용)
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

          // 각도가 180도를 넘는지 확인 (큰 원호인지 작은 원호인지)
          const largeArcFlag = angle > 180 ? 1 : 0;

          // SVG 패스 생성
          const pathData = [
            `M ${startX} ${startY}`, // 시작점으로 이동
            `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${endX} ${endY}`, // 원호 그리기
          ].join(" ");

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
            />
          );
        })}
      </svg>
    </div>
  );
}
