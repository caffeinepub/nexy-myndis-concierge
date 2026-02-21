import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, lazy, Suspense, useState, CSSProperties } from 'react';
import { useUserRole } from '../hooks/useUserRole';
import { ArrowRight } from 'lucide-react';
import FloatingParticles from '../components/landing/FloatingParticles';
import HeroParticles from '../components/landing/HeroParticles';
import RippleButton from '../components/landing/RippleButton';
import TrustIndicators from '../components/landing/TrustIndicators';
import FeatureCardEnhanced from '../components/landing/FeatureCardEnhanced';
import ScrollReveal from '../components/common/ScrollReveal';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';

const TestimonialsCarousel = lazy(() => import('../components/landing/TestimonialsCarousel'));
const DemoVideoSection = lazy(() => import('../components/landing/DemoVideoSection'));

function useParallax(speed: number = 0.5): CSSProperties {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      setOffset(scrolled * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return {
    transform: `translateY(${offset}px)`,
  };
}

export default function LandingPage() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { role, isFetched } = useUserRole();
  const navigate = useNavigate();
  const parallaxStyle = useParallax(0.3);
  const parallaxStyleSlow = useParallax(0.15);

  useEffect(() => {
    if (identity && isFetched) {
      if (role === 'guest') {
        navigate({ to: '/get-started' });
      } else {
        navigate({ to: '/dashboard' });
      }
    }
  }, [identity, role, isFetched, navigate]);

  const handleGetStarted = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Always visible header with hero-matching background */}
      <Header />

      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden flex items-center justify-center bg-background">
        {/* Animated Gradient Mesh Background */}
        <div className="absolute inset-0 bg-gradient-mesh">
          {/* Top gradient overlay to match navbar background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent h-32" />
          
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d7377] via-[#1a1a2e] to-[#16697a] animate-gradient-shift" />
          
          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] noise-texture" />
          
          {/* Radial Vignette */}
          <div className="absolute inset-0 bg-radial-vignette" />
          
          {/* Ambient Light Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0d7377] rounded-full blur-[120px] opacity-30 animate-float-slow" style={parallaxStyleSlow} />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[#00b894] rounded-full blur-[140px] opacity-20 animate-float-slower" style={parallaxStyle} />
          <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-[#16697a] rounded-full blur-[100px] opacity-25 animate-float-medium" />
        </div>

        {/* Animated Hero Particles */}
        <HeroParticles />

        {/* Floating Particles with Mouse-Following Effect */}
        <FloatingParticles />

        <div className="relative z-10 text-center text-white max-w-5xl px-6 page-entrance">
          <h1 className="text-[5rem] md:text-[5.5rem] font-bold mb-8 leading-[0.95] hero-title-premium tracking-tight">
            <span className="gradient-text-premium bg-gradient-to-r from-white via-[#b2dfdb] to-white bg-clip-text text-transparent">
              NEXY MYNDIS
            </span>
          </h1>

          <p className="text-2xl md:text-3xl mb-6 opacity-95 font-light hero-subtitle-animate tracking-wide">
            Your NDIS Journey, Simplified
          </p>

          <p className="text-lg md:text-xl mb-14 opacity-85 max-w-[70ch] mx-auto leading-relaxed hero-description-animate">
            Manage your NDIS plan, connect with trusted providers, and track your goals—all in one intelligent platform designed for you.
          </p>

          <RippleButton
            onClick={handleGetStarted}
            disabled={loginStatus === 'logging-in'}
            className="cta-button-premium group inline-flex items-center gap-3 bg-white/95 backdrop-blur-md text-[#0d7377] px-12 py-6 rounded-2xl text-lg font-medium shadow-premium-multi hover:shadow-premium-glow transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border border-white/30"
          >
            <span className="tracking-wider">
              {loginStatus === 'logging-in' ? 'Connecting...' : 'Get Started'}
            </span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </RippleButton>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <ScrollReveal>
        <TrustIndicators />
      </ScrollReveal>

      {/* Connecting Visual Element */}
      <div className="relative h-16 md:h-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-px">
          <div className="h-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary/40 animate-pulse" />
      </div>

      {/* Feature highlights */}
      <ScrollReveal>
        <section className="py-20 md:py-24 px-6 bg-gradient-to-b from-background to-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 md:mb-20 text-foreground tracking-tight">
              Everything You Need in One Place
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <FeatureCardEnhanced
                title="Secure & Private"
                description="Your data is protected with blockchain-level security"
                iconSrc="/assets/generated/icon-security.dim_128x128.png"
              />
              <FeatureCardEnhanced
                title="Connect Easily"
                description="Find and book verified NDIS providers instantly"
                iconSrc="/assets/generated/icon-connections.dim_128x128.png"
              />
              <FeatureCardEnhanced
                title="Track Progress"
                description="Monitor your goals and budget in real-time"
                iconSrc="/assets/generated/icon-progress.dim_128x128.png"
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Testimonials Section */}
      <ScrollReveal>
        <Suspense fallback={<div className="py-24 text-center">Loading testimonials...</div>}>
          <TestimonialsCarousel />
        </Suspense>
      </ScrollReveal>

      {/* Demo Video Section */}
      <ScrollReveal>
        <Suspense fallback={<div className="py-24 text-center">Loading demo...</div>}>
          <DemoVideoSection />
        </Suspense>
      </ScrollReveal>

      {/* Modern Footer */}
      <Footer />
    </div>
  );
}
