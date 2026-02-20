import { Star } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

const testimonials = [
  {
    quote: "NEXY MYNDIS has completely transformed how I manage my NDIS plan. Everything is so much easier now!",
    name: "Sarah Mitchell",
    role: "NDIS Participant",
    rating: 5,
    avatar: "/assets/generated/avatar-1.dim_80x80.png",
  },
  {
    quote: "As a guardian, this platform gives me peace of mind knowing I can track everything in one place.",
    name: "James Chen",
    role: "Guardian",
    rating: 5,
    avatar: "/assets/generated/avatar-2.dim_80x80.png",
  },
  {
    quote: "The provider booking system is intuitive and saves me hours every week. Highly recommended!",
    name: "Emily Rodriguez",
    role: "Plan Manager",
    rating: 5,
    avatar: "/assets/generated/avatar-3.dim_80x80.png",
  },
];

function useCarousel(slideCount: number, interval: number = 5000) {
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

export default function TestimonialsCarousel() {
  const { currentIndex, goTo, pause, resume } = useCarousel(testimonials.length, 7000);

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-muted/30 to-background section-spacing">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-20 text-foreground tracking-tight">
          What Our Users Say
        </h2>
        
        <div 
          className="relative min-h-[320px]"
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ${
                index === currentIndex 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mt-16">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`h-3 rounded-full transition-all duration-400 ${
                index === currentIndex
                  ? 'bg-primary w-10'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 w-3'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  rating: number;
  avatar: string;
}

function TestimonialCard({ quote, name, role, rating, avatar }: TestimonialCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative bg-card/95 backdrop-blur-lg rounded-3xl p-12 shadow-layered border border-border/50">
      {/* Stylized Quote Mark */}
      <div className="absolute top-8 left-8 text-[120px] leading-none text-primary/10 font-serif select-none pointer-events-none">
        "
      </div>
      
      <div className="relative z-10">
        <div className="flex gap-1 mb-8 justify-center">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-6 h-6 fill-[#ffc107] text-[#ffc107]" />
          ))}
        </div>
        
        <p className="text-xl text-foreground text-center mb-10 leading-relaxed italic max-w-[65ch] mx-auto">
          "{quote}"
        </p>
        
        <div className="flex items-center justify-center gap-5">
          {!imageError ? (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#00b894] to-primary rounded-full blur-sm opacity-50" />
              <img
                src={avatar}
                alt={name}
                className="relative w-20 h-20 rounded-full object-cover border-3 border-gradient-ring shadow-lg"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-2xl border-3 border-primary/30">
              {name.charAt(0)}
            </div>
          )}
          <div className="text-left">
            <div className="font-semibold text-lg text-foreground">{name}</div>
            <div className="text-sm text-muted-foreground">{role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
