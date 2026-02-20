import { Users, DollarSign, Star, Clock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const stats = [
  { icon: Users, value: 10000, suffix: '+', label: 'NDIS Participants Supported' },
  { icon: DollarSign, value: 50, suffix: 'M+', label: 'Budgets Managed' },
  { icon: Star, value: 95, suffix: '%', label: 'User Satisfaction' },
  { icon: Clock, value: 24, suffix: '/7', label: 'Support Available' },
];

function useIntersectionObserver(threshold: number = 0.1) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        }
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

function useCountUp(target: number, duration: number = 2000): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === 0) {
      setCount(0);
      return;
    }

    const startTime = Date.now();
    const startValue = 0;

    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = easeOutCubic(progress);
      const currentCount = startValue + (target - startValue) * easedProgress;

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return count;
}

export default function TrustIndicators() {
  const { ref, isIntersecting } = useIntersectionObserver(0.2);

  return (
    <section ref={ref} className="py-20 md:py-24 px-6 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              shouldAnimate={isIntersecting}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface StatCardProps {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  shouldAnimate: boolean;
  delay: number;
}

function StatCard({ icon: Icon, value, suffix, label, shouldAnimate, delay }: StatCardProps) {
  const animatedValue = useCountUp(shouldAnimate ? value : 0, 2000);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (shouldAnimate) {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [shouldAnimate, delay]);

  return (
    <div 
      className={`text-center p-8 bg-card rounded-3xl shadow-layered hover:shadow-layered-hover transition-all duration-400 border border-border/50 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ 
        transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDelay: `${delay}ms`
      }}
    >
      <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
        <div className="absolute inset-0 bg-gradient-icon rounded-full animate-gradient-pulse opacity-60" />
        <Icon className="relative z-10 w-10 h-10 text-primary" />
      </div>
      <div className="text-5xl font-bold text-foreground mb-3 tabular-nums tracking-tight">
        {Math.round(animatedValue).toLocaleString()}
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground leading-snug">{label}</div>
    </div>
  );
}
