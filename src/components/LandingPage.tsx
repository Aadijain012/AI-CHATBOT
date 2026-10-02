import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Bot,
  Brain,
  Sliders,
  Zap,
  Check,
  Flame,
} from 'lucide-react';
import FeatureCard from './FeatureCard';
import { QUICK_PROMPTS } from '../constants';
import { GlobeCollection } from '../shaders/globe/GlobeCollection';
import '../shaders/threeui.css';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-forest-700 selection:text-white">

      {/* ── Hero Section ──────────────────────────────────────────────── */}
      <section id="home" className="relative pt-20 pb-28 md:pt-28 md:pb-36 overflow-hidden">

        {/* Energy Orb — full-screen behind content */}
        <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          <GlobeCollection
            variant="energy-orb"
            speed={1.00} scale={1.00} smokeScale={1.00} smokeStrength={1.00}
            smokeSpeed={1.00} hue={0} saturation={1.00} glow={1.00}
            starDensity={1.00} starSpeed={1.00} starSize={1.00}
            brightness={1.00} opacity={0.55}
          />
        </div>

        {/* Subtle dark overlay so text stays legible */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" style={{ zIndex: 1 }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 2 }}>
          <div className="text-center max-w-3xl mx-auto">

            {/* Badge pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs font-sans font-medium mb-8">
              <Sparkles className="w-3.5 h-3.5 text-forest-400 animate-pulse" />
              <span>Next-Gen Conversational Intelligence</span>
              <span className="bg-forest-700/40 text-forest-300 text-[10px] px-2 py-0.5 rounded-full border border-forest-600/40">
                v2.5
              </span>
            </div>

            {/* Main heading — Playfair Display serif, black + forest green */}
            <h1 className="font-serif text-5xl sm:text-7xl font-bold leading-[1.1] tracking-tight">
              <span className="text-white">Your Smart</span>
              <br />
              <span className="text-forest-400">AI Assistant</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-white/70 font-sans font-normal leading-relaxed max-w-2xl mx-auto">
              Experience seamless, context-aware dialogues. Practice mental math, solve brain
              teasers, and supercharge your everyday productivity with an intuitive AI partner.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 font-sans">
              <button
                onClick={onStart}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-forest-700 hover:bg-forest-600 text-white font-semibold text-base shadow-lg shadow-forest-900/40 hover:shadow-forest-800/50 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Start Chatting</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#features"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-sm text-white border border-white/20 font-medium text-base transition-all flex items-center justify-center gap-2"
              >
                <span>Learn More</span>
                <ChevronRight className="w-4 h-4 text-white/60" />
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex items-center justify-center gap-6 text-xs text-white/50 font-sans">
              {['Instant Demo Access', 'Zero Setup Required', 'Session Memory'].map((t) => (
                <div key={t} className="hidden sm:flex items-center gap-1.5 first:flex">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest-400" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Hero Chat Preview ────────────────────────────────────── */}
          <div className="mt-16 max-w-4xl mx-auto rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 p-3 sm:p-5 shadow-2xl">
            {/* Window chrome */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 px-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="text-xs text-white/40 ml-2 font-mono">smartchat-assistant.live</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-forest-500" />
                </span>
                <span className="text-xs text-white/40 font-sans">Ready</span>
              </div>
            </div>

            {/* Mock messages */}
            <div className="space-y-4 text-sm font-sans p-2">
              <div className="flex items-start gap-3 justify-end">
                <div className="bg-forest-700 text-white px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-md shadow-sm">
                  I want to practice something challenging.
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  U
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-forest-800 border border-forest-600/40 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white/8 backdrop-blur-sm border border-white/10 text-white/90 px-4 py-3 rounded-2xl rounded-tl-sm max-w-lg shadow-sm">
                  Sure! Would you like a mental math exercise, a logical reasoning riddle, or a tech trivia quiz?
                </div>
              </div>
              <div className="flex items-start gap-3 justify-end">
                <div className="bg-forest-700 text-white px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-md shadow-sm">
                  Give me a math question.
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  U
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-forest-800 border border-forest-600/40 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white/8 backdrop-blur-sm border border-white/10 text-white/90 px-4 py-3 rounded-2xl rounded-tl-sm max-w-lg shadow-sm">
                  <p className="font-semibold text-forest-300 mb-1">Challenge unlocked!</p>
                  What is <span className="font-bold text-white">25 × 4</span>?
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 text-center">
              <button
                onClick={onStart}
                className="text-xs text-forest-400 hover:text-forest-300 font-sans font-medium inline-flex items-center gap-1.5 transition-colors"
              >
                Try answering in the live app <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Section ──────────────────────────────────────────────── */}
      <section id="features" className="py-24 bg-neutral-950 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-sans font-bold tracking-[0.2em] uppercase text-forest-500 mb-3">
              Core Capabilities
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">
              Designed for{' '}
              <span className="text-forest-400">meaningful</span>
              {' '}conversations
            </h2>
            <p className="mt-5 text-white/60 font-sans leading-relaxed">
              Not a static FAQ. Our assistant retains memory across turns, understands math
              formulas, and assists your workflow in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Brain className="w-6 h-6" />}
              title="Intelligent Conversations"
              description="Handles multi-intent queries, natural language small-talk, and complex breakdowns with clear explanations."
              badge="Smart"
            />
            <FeatureCard
              icon={<Sliders className="w-6 h-6" />}
              title="Personalized Experience"
              description="Remembers your preferences, user name, and current learning mode throughout your active session."
              badge="Custom"
            />
            <FeatureCard
              icon={<Sparkles className="w-6 h-6" />}
              title="Context-Aware Responses"
              description="Maintains conversation state: evaluates math answers, guides you through riddles, and gives progressive clues."
              badge="Contextual"
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Fast & Simple"
              description="Zero clutter. Blazing quick responses, keyboard shortcuts, history syncing, and clean markdown rendering."
              badge="Lightweight"
            />
          </div>
        </div>
      </section>

      {/* ── About Section ─────────────────────────────────────────────────── */}
      <section id="about" className="py-24 border-t border-white/8 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-forest-500 mb-3">
                Modern Architecture
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">
                Engineered for{' '}
                <span className="text-forest-400">future expansion</span>
              </h2>
              <p className="mt-5 text-white/60 font-sans leading-relaxed">
                SmartChat AI is built with decoupled presentation and conversational logic layers.
                The chat interface is ready to connect with production LLM endpoints (OpenAI,
                Gemini, Anthropic) while running effortlessly offline.
              </p>

              <div className="mt-8 space-y-5">
                {[
                  {
                    title: 'Full Session Persistence',
                    desc: 'Chat threads, message logs, and quiz states persist seamlessly in your browser.',
                  },
                  {
                    title: 'Production-Ready Component Hierarchy',
                    desc: 'Modular TypeScript structures: Navbar, LoginForm, ChatSidebar, ChatWindow, and ChatInput.',
                  },
                  {
                    title: 'Adaptive Mobile Viewports',
                    desc: 'Smooth drawer navigation, responsive bubbles, and touch-optimized action targets.',
                  },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-forest-700/30 border border-forest-600/40 text-forest-400 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="font-sans text-sm font-semibold text-white">{title}</h4>
                      <p className="font-sans text-xs text-white/50 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick-start playground */}
            <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
              <h3 className="font-serif text-xl font-bold text-white mb-1 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                Quick-Start Playground
              </h3>
              <p className="font-sans text-sm text-white/50 mb-6">
                Try out typical prompts in the chatbot once signed in:
              </p>
              <div className="space-y-3">
                {QUICK_PROMPTS.map((prompt, idx) => (
                  <div
                    key={idx}
                    onClick={onStart}
                    className="p-3 rounded-xl bg-white/5 border border-white/8 hover:border-forest-600/50 hover:bg-white/8 font-sans text-xs sm:text-sm text-white/70 hover:text-white flex items-center justify-between cursor-pointer transition-all"
                  >
                    <span>"{prompt}"</span>
                    <ArrowRight className="w-4 h-4 text-forest-500 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/8 bg-neutral-950 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-forest-700 flex items-center justify-center text-white">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-serif font-bold text-white text-base">SmartChat AI</span>
          </div>

          <div className="flex items-center gap-6 font-sans text-sm text-white/40">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <button onClick={onStart} className="hover:text-white transition-colors">Sign In</button>
          </div>

          <div className="font-sans text-xs text-white/30">
            © {new Date().getFullYear()} SmartChat AI. Assignment Project.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
