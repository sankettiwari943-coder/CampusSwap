import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Sparkles, ChevronUp, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DemoGuideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { setSearchQuery } = useApp();

  const handleStep1 = () => {
    setLocation('/');
    setSearchQuery('first year CSE maths book');
    setTimeout(() => {
      const el = document.getElementById('hero-search-input');
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el?.focus();
    }, 100);
  };

  const handleStep2 = () => {
    setLocation('/');
    setSearchQuery('first year CSE maths book');
    setTimeout(() => {
      const el = document.getElementById('ai-match-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleStep3 = () => {
    setLocation('/book/book-1');
  };

  const handleStep4 = () => {
    setLocation('/sell');
  };

  const handleStep5 = () => {
    setLocation('/profile');
  };

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <div className="bg-slate-900/95 backdrop-blur-xl text-white rounded-2xl shadow-2xl border border-slate-700/80 overflow-hidden transition-all duration-300 max-w-md">
        {/* Bar Header */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-800/80 transition-colors select-none"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5 font-display">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              ⚡ Hackathon Demo Quick-Tour
            </span>
          </div>

          <button className="text-slate-400 hover:text-white p-1" aria-label="Toggle Demo Bar">
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Collapsible Steps */}
        {isOpen && (
          <div className="p-3.5 pt-1 space-y-2 border-t border-slate-800 text-xs animate-in slide-in-from-bottom-2 duration-200">
            <p className="text-[11px] text-slate-400 leading-snug">
              Follow this 2-minute narrative flow to demonstrate the problem statement & USP:
            </p>

            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={handleStep1}
                className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-800 hover:bg-brand-600/30 hover:border-brand-500/50 text-left border border-slate-700/60 transition-all text-slate-200"
              >
                <span className="w-4 h-4 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-[10px]">1</span>
                <span className="truncate">Hero NL Search</span>
              </button>

              <button
                onClick={handleStep2}
                className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-800 hover:bg-brand-600/30 hover:border-brand-500/50 text-left border border-slate-700/60 transition-all text-slate-200"
              >
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">2</span>
                <span className="truncate">✨ 96% AI Match</span>
              </button>

              <button
                onClick={handleStep3}
                className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-800 hover:bg-brand-600/30 hover:border-brand-500/50 text-left border border-slate-700/60 transition-all text-slate-200"
              >
                <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-[10px]">3</span>
                <span className="truncate">Match Explanation</span>
              </button>

              <button
                onClick={handleStep4}
                className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-800 hover:bg-brand-600/30 hover:border-brand-500/50 text-left border border-slate-700/60 transition-all text-slate-200"
              >
                <span className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-[10px]">4</span>
                <span className="truncate">✨ AI Seller Generator</span>
              </button>

              <button
                onClick={handleStep5}
                className="col-span-2 flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-800 hover:bg-brand-600/30 hover:border-brand-500/50 text-center border border-slate-700/60 transition-all text-slate-200"
              >
                <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px]">5</span>
                <span>Student Profile & Wishlist</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
