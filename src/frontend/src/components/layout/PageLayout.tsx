import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[oklch(0.95_0.01_180)] to-[oklch(0.98_0.005_200)]">
      <Header />
      <main id="main-content" className="flex-1 container mx-auto px-4 py-8 max-w-7xl mt-4">
        {title && (
          <h1 className="text-3xl font-bold text-[oklch(0.35_0.08_195)] mb-6">
            {title}
          </h1>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
}
