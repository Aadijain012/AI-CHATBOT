import React, { useState } from 'react';
import { Sparkles, MessageSquare, LogOut, Menu, X } from 'lucide-react';
import { UserProfileData } from '../types';

interface NavbarProps {
  onNavigate: (view: 'landing' | 'login' | 'chat') => void;
  isLoggedIn: boolean;
  currentUser: UserProfileData | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, isLoggedIn, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-6">

        {/* ── Logo (left) ─────────────────────────────────────────────── */}
        <div
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 cursor-pointer flex-shrink-0 group"
        >
          <div className="w-9 h-9 rounded-lg bg-forest-700 flex items-center justify-center shadow-sm group-hover:bg-forest-600 transition-colors">
            <Sparkles className="w-4.5 h-4.5 text-white w-[18px] h-[18px]" />
          </div>
          <span
            className="text-xl font-bold text-gray-900 tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            SmartChat AI
          </span>
        </div>

        {/* ── Nav links (center) ───────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-1 font-sans">
          {[
            { label: 'Home',     href: '#home',     action: () => onNavigate('landing') },
            { label: 'Features', href: '#features', action: () => onNavigate('landing') },
            { label: 'About',    href: '#about',    action: () => onNavigate('landing') },
          ].map(({ label, href, action }) => (
            <a
              key={label}
              href={href}
              onClick={action}
              className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
            >
              {label}
            </a>
          ))}
        </div>

        {/* ── CTA (right) ─────────────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0 font-sans">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => onNavigate('chat')}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-forest-700 hover:bg-forest-600 rounded-full shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                Open Chat
              </button>
              <button
                onClick={onLogout}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onNavigate('login')}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => onNavigate('login')}
                className="px-5 py-2 text-sm font-semibold text-white bg-forest-700 hover:bg-forest-600 rounded-full shadow-sm transition-all"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* ── Mobile hamburger ────────────────────────────────────────── */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile drawer ───────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-3 pb-5 space-y-1 font-sans shadow-lg">
          {[
            { label: 'Home',     href: '#home',     action: () => onNavigate('landing') },
            { label: 'Features', href: '#features', action: () => onNavigate('landing') },
            { label: 'About',    href: '#about',    action: () => onNavigate('landing') },
          ].map(({ label, href, action }) => (
            <a
              key={label}
              href={href}
              onClick={() => { action(); setMobileMenuOpen(false); }}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              {label}
            </a>
          ))}

          <div className="pt-3 border-t border-gray-100 space-y-2">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => { onNavigate('chat'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 text-sm font-semibold text-white bg-forest-700 hover:bg-forest-600 rounded-full transition-colors"
                >
                  Open Chat
                </button>
                <button
                  onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                  className="w-full py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { onNavigate('login'); setMobileMenuOpen(false); }}
                  className="w-full py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { onNavigate('login'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 text-sm font-semibold text-white bg-forest-700 hover:bg-forest-600 rounded-full transition-colors"
                >
                  Get Started Free
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
