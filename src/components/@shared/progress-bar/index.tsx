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
        <div className="absolute top-0 left-0 w-full h-full bg-primary-foreground rounded-full" />
        <div
          className="absolute top-0 left-0 h-full bg-tertiary-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />

        {/* 도트 오버레이 */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center pr-3">
          <div className="relative w-full h-full">
            {dots.map((dot) => (
              <div
                key={dot}
                className="absolute top-1/2 bg-tertiary-2 -translate-y-1/2 w-1 h-1 rounded-full"
                style={{ left: `${(dot / max) * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
