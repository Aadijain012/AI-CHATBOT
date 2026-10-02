import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, badge }) => (
  <div className="relative group p-6 rounded-2xl bg-white/5 border border-white/8 hover:border-forest-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-forest-900/20 hover:-translate-y-1">
    <div className="absolute inset-0 bg-gradient-to-br from-forest-900/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10 flex flex-col h-full">
      <div className="w-12 h-12 rounded-xl bg-forest-900/40 border border-forest-700/30 flex items-center justify-center text-forest-400 mb-5 group-hover:scale-110 group-hover:bg-forest-700 group-hover:text-white transition-all">
        {icon}
      </div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-serif text-lg font-bold text-white tracking-tight">{title}</h3>
        {badge && (
          <span className="font-sans text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-forest-700/20 text-forest-400 border border-forest-700/30">
            {badge}
          </span>
        )}
      </div>
      <p className="font-sans text-white/50 text-sm leading-relaxed mt-1 flex-1">
        {description}
      </p>
    </div>
  </div>
);

export default FeatureCard;
