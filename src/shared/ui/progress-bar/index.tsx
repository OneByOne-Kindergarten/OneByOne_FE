interface ProgressBarProps {
  value: number;
  max: number;
}

export default function ProgressBar({ value, max }: ProgressBarProps) {
  const percentage = (value / max) * 100;
  const dots = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <div className="w-full px-2">
      <div className="relative h-2.5">
        <div className="absolute left-0 top-0 h-full w-full rounded-full bg-primary-foreground" />
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-tertiary-2 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />

        {/* 도트 오버레이 */}
        <div className="absolute left-0 top-0 flex h-full w-full items-center px-2">
          <div className="relative h-full w-full">
            {dots.map((dot) => {
              const leftPosition =
                max === 1 ? 50 : ((dot - 1) / (max - 1)) * 100;

              return (
                <div
                  key={dot}
                  className="absolute top-1/2 h-1 w-1 rounded-full bg-tertiary-2"
                  style={{
                    left: `${leftPosition}%`,
                    transform: "translateY(-50%) translateX(-50%)",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
