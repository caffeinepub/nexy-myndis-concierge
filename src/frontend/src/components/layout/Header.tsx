import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../../hooks/useQueries';
import { useUserRole } from '../../hooks/useUserRole';
import { useNavigate } from '@tanstack/react-router';
import LoginButton from '../auth/LoginButton';
import { Home, FileText, Users, Calendar, Upload, Menu, X, DollarSign, Brain } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const { isAdmin } = useUserRole();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAuthenticated = !!identity;

  const getUserInitials = () => {
    if (!userProfile) return '';
    return userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getRoleLabel = () => {
    if (!userProfile) return 'Guest';
    const role = userProfile.role.toLowerCase();
    if (role === 'participant') return 'Participant';
    if (role === 'guardian') return 'Guardian';
    if (role === 'provider') return 'Provider';
    if (role === 'planmanager') return 'Plan Manager';
    return 'User';
  };

  const navLinks = [
    { label: 'Dashboard', icon: Home, path: '/dashboard', show: isAuthenticated },
    { label: 'Upload Plan', icon: Upload, path: '/plan/upload', show: isAuthenticated && userProfile?.role === 'participant' },
    { label: 'Providers', icon: Users, path: '/providers', show: isAuthenticated },
    { label: 'Create Invoice', icon: DollarSign, path: '/invoices/create', show: isAuthenticated && userProfile?.role === 'provider' },
    { label: 'AI Monitoring', icon: Brain, path: '/admin/ai-agents', show: isAuthenticated && isAdmin() },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg shadow-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate({ to: '/' })}
            className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
          >
            NDIS Connect
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.filter(link => link.show).map((link) => (
              <button
                key={link.path}
                onClick={() => navigate({ to: link.path })}
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </button>
            ))}
          </nav>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {isAuthenticated && userProfile && (
              <div className="hidden md:flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-semibold text-foreground">{userProfile.name}</div>
                  <div className="text-xs text-muted-foreground">{getRoleLabel()}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">{getUserInitials()}</span>
                </div>
              </div>
            )}
            <LoginButton />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <nav className="flex flex-col gap-4">
              {navLinks.filter(link => link.show).map((link) => (
                <button
                  key={link.path}
                  onClick={() => {
                    navigate({ to: link.path });
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </button>
              ))}
            </nav>
            {isAuthenticated && userProfile && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="text-sm font-semibold text-foreground">{userProfile.name}</div>
                <div className="text-xs text-muted-foreground">{getRoleLabel()}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
