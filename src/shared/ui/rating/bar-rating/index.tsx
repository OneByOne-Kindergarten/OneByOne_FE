import styles from "./index.module.css";

interface BarRatingProps {
  value: number;
  max?: number;
  className?: string;
}

export default function BarRating({
  value,
  max = 5,
  className,
}: BarRatingProps) {
  return (
    <progress
      value={value}
      max={max}
      className={`${styles.progressBar} ${className}`}
    />
  );
}
