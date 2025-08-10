import { useEffect, useRef } from "react";

interface AutoFetchSentinelProps {
  hasNext: boolean;
  fetchNext: () => void;
  loading?: boolean;
}

export default function AutoFetchSentinel({
  hasNext,
  fetchNext,
  loading,
}: AutoFetchSentinelProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNext && !loading) fetchNext();
    });
    io.observe(el);
    return () => io.disconnect();
  }, [hasNext, loading, fetchNext]);

  return <div ref={ref} className="h-1" aria-hidden />;
}
