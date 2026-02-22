import { Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import LoginButton from '../auth/LoginButton';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useUserRole } from '../../hooks/useUserRole';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { identity } = useInternetIdentity();
  const { role } = useUserRole();
  const navigate = useNavigate();

  const isAuthenticated = !!identity;

  const getDashboardLink = () => {
    if (!isAuthenticated) return '/';
    
    switch (role) {
      case 'participant':
        return '/dashboard';
      case 'provider':
        return '/provider-dashboard';
      case 'guardian':
        return '/guardian-dashboard';
      case 'planManager':
        return '/plan-manager-dashboard';
      default:
        return '/dashboard';
    }
  };

  const navLinks = isAuthenticated
    ? [
        { to: getDashboardLink(), label: 'Dashboard' },
        { to: '/providers', label: 'Providers' },
        ...(role === 'participant' ? [{ to: '/plan-upload', label: 'Upload Plan' }] : []),
      ]
    : [];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <span className="text-xl font-bold text-foreground">NDIS Connect</span>
          </Link>

          {/* Desktop Navigation */}
          {navLinks.length > 0 && (
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            <LoginButton />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-border">
              <LoginButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
