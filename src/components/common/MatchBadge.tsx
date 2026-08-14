import React from 'react';
import { Sparkles } from 'lucide-react';

interface MatchBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showSparkle?: boolean;
  className?: string;
}

export const MatchBadge: React.FC<MatchBadgeProps> = ({
  score,
  size = 'md',
  showSparkle = true,
  className = ''
}) => {
  // Color tiering
  const getBadgeStyle = () => {
    if (score >= 90) {
      return 'bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-emerald-500/15 text-emerald-700 border-emerald-300/80 shadow-glow-emerald';
    } else if (score >= 80) {
      return 'bg-gradient-to-r from-indigo-500/15 via-brand-500/15 to-purple-500/15 text-indigo-700 border-indigo-300/80 shadow-glow';
    } else {
      return 'bg-gradient-to-r from-amber-500/15 to-orange-500/15 text-amber-800 border-amber-300/80';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-xs px-2.5 py-0.5 font-semibold gap-1';
      case 'lg':
        return 'text-sm px-3.5 py-1.5 font-bold gap-1.5 shadow-md';
      case 'md':
      default:
        return 'text-xs px-3 py-1 font-semibold gap-1.5';
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-105 select-none ${getBadgeStyle()} ${getSizeClasses()} ${className}`}
    >
      {showSparkle && (
        <Sparkles className={`animate-pulse-subtle ${size === 'sm' ? 'w-3 h-3 text-emerald-500' : 'w-3.5 h-3.5 text-indigo-600'}`} />
      )}
      <span>✨ {score}% Match</span>
    </span>
  );
};
