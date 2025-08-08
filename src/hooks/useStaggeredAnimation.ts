import { useEffect, useRef, useState } from "react";

interface UseStaggeredAnimationProps {
  items: unknown[];
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}

export function useStaggeredAnimation({
  items,
  threshold = 0.1,
  rootMargin = "50px",
  delay = 150,
}: UseStaggeredAnimationProps) {
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const firstItemRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (!firstItemRef.current || items.length === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAnimationStarted(true);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(firstItemRef.current);

    return () => observer.disconnect();
  }, [items.length, threshold, rootMargin]);

  const getAnimationProps = (index: number) => ({
    ref: index === 0 ? firstItemRef : null,
    className: `transform transition-all duration-500 ease-out ${
      isAnimationStarted
        ? "translate-x-0 scale-100 opacity-100"
        : "translate-x-8 scale-95 opacity-0"
    }`,
    style: {
      transitionDelay: `${index * delay}ms`,
    },
  });

  return {
    isAnimationStarted,
    getAnimationProps,
  };
}
