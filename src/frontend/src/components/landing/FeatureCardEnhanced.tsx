import { useState, useRef, useEffect, CSSProperties } from 'react';
import { Shield } from 'lucide-react';

interface FeatureCardEnhancedProps {
  title: string;
  description: string;
  iconSrc: string;
}

function useMouseTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
        transition: 'transform 0.1s ease-out',
      });
    };

    const handleMouseLeave = () => {
      setStyle({
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { ref, style };
}

export default function FeatureCardEnhanced({ title, description, iconSrc }: FeatureCardEnhancedProps) {
  const { ref, style } = useMouseTilt();
  const [imageError, setImageError] = useState(false);

  return (
    <div
      ref={ref}
      style={style}
      className="feature-card-premium bg-card/90 backdrop-blur-sm rounded-3xl p-10 md:p-12 border-2 border-transparent bg-gradient-border hover:border-gradient transition-all duration-400 group shadow-layered hover:shadow-layered-hover"
    >
      <div className="relative flex items-center justify-center w-28 h-28 mx-auto mb-8 bg-gradient-icon rounded-3xl group-hover:scale-110 transition-transform duration-400 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-pulse animate-gradient-pulse opacity-50" />
        {!imageError ? (
          <img
            src={iconSrc}
            alt={title}
            className="relative z-10 w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-400"
            onError={() => setImageError(true)}
          />
        ) : (
          <Shield className="relative z-10 w-16 h-16 text-primary group-hover:scale-110 transition-transform duration-400" />
        )}
      </div>
      <h3 className="font-heading text-2xl font-semibold mb-4 text-foreground text-center tracking-tight">{title}</h3>
      <p className="text-muted-foreground text-center leading-relaxed font-sans">{description}</p>
    </div>
  );
}
