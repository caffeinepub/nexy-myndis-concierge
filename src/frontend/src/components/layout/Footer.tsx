import { Heart, Mail, Linkedin, Twitter, Facebook } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(window.location.hostname || 'nexy-myndis');

  return (
    <footer className="bg-gradient-to-br from-[#0d7377] via-[#1a1a2e] to-[#16697a] text-white">
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">NEXY MYNDIS</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Empowering NDIS participants with intelligent plan management and seamless provider connections.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white/90">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/dashboard"
                  className="text-sm text-white/70 hover:text-[#00b894] transition-colors duration-200 inline-block"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/get-started"
                  className="text-sm text-white/70 hover:text-[#00b894] transition-colors duration-200 inline-block"
                >
                  Get Started
                </Link>
              </li>
              <li>
                <Link
                  to="/providers"
                  className="text-sm text-white/70 hover:text-[#00b894] transition-colors duration-200 inline-block"
                >
                  Find Providers
                </Link>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-sm text-white/70 hover:text-[#00b894] transition-colors duration-200 inline-block"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-sm text-white/70 hover:text-[#00b894] transition-colors duration-200 inline-block"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white/90">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#privacy"
                  className="text-sm text-white/70 hover:text-[#00b894] transition-colors duration-200 inline-block"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="text-sm text-white/70 hover:text-[#00b894] transition-colors duration-200 inline-block"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#accessibility"
                  className="text-sm text-white/70 hover:text-[#00b894] transition-colors duration-200 inline-block"
                >
                  Accessibility Statement
                </a>
              </li>
              <li>
                <a
                  href="#compliance"
                  className="text-sm text-white/70 hover:text-[#00b894] transition-colors duration-200 inline-block"
                >
                  NDIS Compliance
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white/90">Connect</h4>
            <div className="space-y-3">
              <a
                href="mailto:support@nexymyndis.com"
                className="text-sm text-white/70 hover:text-[#00b894] transition-colors duration-200 flex items-center gap-2"
              >
                <Mail size={16} />
                <span>support@nexymyndis.com</span>
              </a>
            </div>
            <div className="flex gap-4 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#00b894] flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#00b894] flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#00b894] flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/60">
              © {currentYear} NEXY MYNDIS CONCIERGE. All rights reserved.
            </p>
            <p className="text-xs text-white/60 flex items-center gap-2">
              Built with{' '}
              <Heart size={12} className="text-[#00b894] fill-[#00b894] inline-block" />{' '}
              using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00b894] hover:text-white font-medium transition-colors duration-200"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
