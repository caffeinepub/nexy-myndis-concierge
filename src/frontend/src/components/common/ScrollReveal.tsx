import { ReactNode, useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  threshold?: number;
}

function useIntersectionObserver(threshold: number = 0.1) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, isIntersecting };
}

export default function ScrollReveal({ children, threshold = 0.2 }: ScrollRevealProps) {
  const { ref, isIntersecting } = useIntersectionObserver(threshold);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isIntersecting
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
}
