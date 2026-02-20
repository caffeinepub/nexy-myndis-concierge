import { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  delay: number;
  duration: number;
  currentX: number;
  currentY: number;
  velocityX: number;
  velocityY: number;
}

export default function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, isInside: false });

  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 25 }, (_, i) => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      return {
        id: i,
        x,
        y,
        baseX: x,
        baseY: y,
        delay: Math.random() * 10,
        duration: 15 + Math.random() * 10,
        currentX: 0,
        currentY: 0,
        velocityX: 0,
        velocityY: 0,
      };
    })
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Check if touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const container = containerRef.current;
    if (!container) return;

    particlesRef.current = particles.map(p => ({ ...p }));

    const followStrength = 0.08; // How strongly particles follow the mouse
    const returnStrength = 0.03; // How quickly particles return to base position
    const maxDistance = 250; // Maximum distance particles can be affected from cursor
    const damping = 0.85; // Velocity damping for smooth motion

    const animate = () => {
      const rect = container.getBoundingClientRect();
      const mouse = mouseRef.current;

      particlesRef.current.forEach((particle, index) => {
        const element = container.children[index] as HTMLDivElement;
        if (!element) return;

        // Calculate particle position in pixels
        const particleX = (particle.baseX / 100) * rect.width;
        const particleY = (particle.baseY / 100) * rect.height;

        let targetX = 0;
        let targetY = 0;

        if (mouse.isInside) {
          // Calculate distance from mouse to particle
          const deltaX = mouse.x - particleX;
          const deltaY = mouse.y - particleY;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

          if (distance < maxDistance && distance > 0) {
            // Calculate influence based on distance (closer = stronger)
            const influence = Math.pow(1 - distance / maxDistance, 2);
            
            // Move particle toward mouse with smooth easing
            targetX = deltaX * influence * followStrength * 100;
            targetY = deltaY * influence * followStrength * 100;
          }
        }

        // Apply return force to base position
        particle.velocityX += (targetX - particle.currentX) * returnStrength;
        particle.velocityY += (targetY - particle.currentY) * returnStrength;

        // Apply damping
        particle.velocityX *= damping;
        particle.velocityY *= damping;

        // Update position
        particle.currentX += particle.velocityX;
        particle.currentY += particle.velocityY;

        // Apply transform
        element.style.transform = `translate(${particle.currentX}px, ${particle.currentY}px)`;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isInside: true,
      };
    };

    const handleMouseEnter = () => {
      mouseRef.current.isInside = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isInside = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particles]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle absolute w-2 h-2 bg-white/40 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.3)]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
