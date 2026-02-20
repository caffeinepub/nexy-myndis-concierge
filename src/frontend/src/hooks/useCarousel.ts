import { useState, useEffect, useCallback } from 'react';

export function useCarousel(slideCount: number, interval: number = 5000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(next, interval);

    return () => {
      clearInterval(timer);
    };
  }, [isPaused, interval, next]);

  return {
    currentIndex,
    next,
    prev,
    goTo,
    isPaused,
    pause,
    resume,
  };
}
