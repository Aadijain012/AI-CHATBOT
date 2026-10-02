import React, { useState } from 'react';
import { Sparkles, Zap, ChevronRight, Eye, EyeOff, X } from 'lucide-react';
import { UserProfileData } from '../types';
import { GlobeCollection } from '../shaders/globe/GlobeCollection';
import '../shaders/threeui.css';

interface LoginFormProps {
  onLoginSuccess: (user: UserProfileData) => void;
  onBackToLanding: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, onBackToLanding }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const derivedName = email.split('@')[0].replace(/[._]/g, ' ');
      const formattedName = derivedName
        ? derivedName.charAt(0).toUpperCase() + derivedName.slice(1)
        : 'User';
      onLoginSuccess({ name: formattedName, email: email.trim(), plan: 'Pro Plan' });
    }
  };

  const handleQuickDemo = () => {
    setEmail('alex.carter@example.com');
    setPassword('DemoPass123!');
    setErrors({});
    setTimeout(() => {
      onLoginSuccess({
        name: 'Alex Carter',
        email: 'alex.carter@example.com',
        plan: 'Enterprise Pro',
      });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* ── EnergyOrb background ─────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <GlobeCollection
          variant="energy-orb"
          speed={1.00} scale={1.00} smokeScale={1.00} smokeStrength={1.00}
          smokeSpeed={1.00} hue={0} saturation={1.00} glow={1.00}
          starDensity={1.00} starSpeed={1.00} starSize={1.00}
          brightness={1.00} opacity={0.50}
        />
      </div>
      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" style={{ zIndex: 1 }} />

      {/* ── Back button ──────────────────────────────────────────────── */}
      <div className="absolute top-5 left-5 z-20">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-1.5 font-sans text-sm text-white/60 hover:text-white px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/15 transition-all"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to Home
        </button>
      </div>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative px-4" style={{ zIndex: 2 }}>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-forest-700 flex items-center justify-center shadow-xl shadow-forest-900/50 mb-4">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Sign in to SmartChat AI
          </h2>
          <p className="mt-2 font-sans text-sm text-white/50">
            Access your assistant, saved threads, and smart memory
          </p>
        </div>

        {/* ── Card ─────────────────────────────────────────────────── */}
        <div className="bg-white/8 backdrop-blur-2xl border border-white/12 rounded-3xl shadow-2xl shadow-black/60 py-8 px-6 sm:px-9">

          {/* Quick Demo banner */}
          <div className="mb-6 p-4 rounded-2xl bg-forest-900/40 border border-forest-700/30 text-center">
            <p className="font-sans text-xs text-white/60 mb-3">
              Evaluating the project? Skip registration:
            </p>
            <button
              type="button"
              onClick={handleQuickDemo}
              className="w-full py-2.5 px-4 rounded-full bg-forest-700 hover:bg-forest-600 text-white font-sans text-sm font-semibold shadow-md shadow-forest-900/40 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-forest-300" />
              Quick Demo Login (Alex Carter)
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="font-sans text-[11px] uppercase tracking-widest text-white/30 bg-transparent px-3">
                or continue with credentials
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block font-sans text-xs font-medium text-white/70 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                className={`w-full px-4 py-2.5 rounded-xl bg-white/10 border ${
                  errors.email
                    ? 'border-red-500/70 focus:ring-red-500/50'
                    : 'border-white/15 focus:border-forest-500/60'
                } text-white placeholder-white/30 font-sans text-sm focus:outline-none focus:ring-2 transition-all backdrop-blur-sm`}
              />
              {errors.email && (
                <p className="mt-1.5 font-sans text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block font-sans text-xs font-medium text-white/70 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  className={`w-full px-4 py-2.5 pr-10 rounded-xl bg-white/10 border ${
                    errors.password
                      ? 'border-red-500/70 focus:ring-red-500/50'
                      : 'border-white/15 focus:border-forest-500/60'
                  } text-white placeholder-white/30 font-sans text-sm focus:outline-none focus:ring-2 transition-all backdrop-blur-sm`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/80 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 font-sans text-xs text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between font-sans text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none text-white/60">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-white/20 bg-white/10 text-forest-600 focus:ring-forest-500 w-4 h-4 cursor-pointer"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="text-forest-400 hover:text-forest-300 font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-full bg-forest-700 hover:bg-forest-600 text-white font-sans text-sm font-semibold shadow-lg shadow-forest-900/40 transition-all"
            >
              Sign In to Dashboard
            </button>
          </form>
        </div>
      </div>

      {/* ── Forgot Password Modal ─────────────────────────────────────── */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/15 rounded-3xl max-w-sm w-full p-7 shadow-2xl relative">
            <button
              onClick={() => { setForgotModalOpen(false); setResetSuccess(false); }}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3
              className="text-xl font-bold text-white mb-1"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Reset Password
            </h3>

            {resetSuccess ? (
              <div className="space-y-4 mt-4">
                <div className="p-3 bg-forest-900/40 border border-forest-700/30 rounded-2xl font-sans text-forest-300 text-xs leading-relaxed">
                  ✓ Reset link sent! If that email matches an account, instructions have been dispatched.
                </div>
                <button
                  onClick={() => { setForgotModalOpen(false); setResetSuccess(false); }}
                  className="w-full py-2.5 bg-white/10 hover:bg-white/15 border border-white/15 text-white rounded-full font-sans text-sm transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <p className="font-sans text-xs text-white/50">
                  Enter your email address and we'll send you a password recovery link.
                </p>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/30 font-sans text-sm focus:outline-none focus:border-forest-500/60 focus:ring-2 focus:ring-forest-500/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => { if (forgotEmail) setResetSuccess(true); }}
                  className="w-full py-2.5 bg-forest-700 hover:bg-forest-600 text-white rounded-full font-sans text-sm font-semibold transition-colors"
                >
                  Send Recovery Link
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
