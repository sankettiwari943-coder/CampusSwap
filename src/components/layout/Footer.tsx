import React from 'react';
import { Link } from 'wouter';
import { BookOpen, ShieldCheck, MapPin, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-display text-white tracking-tight">
                CampusSwap
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The AI-powered peer-to-peer textbook marketplace. Matching student buyers and sellers with natural language search, match scores, and automated listing copy.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1.5 rounded-full w-fit">
              <ShieldCheck className="w-4 h-4" /> 100% Verified Campus Community
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Marketplace
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/marketplace" className="hover:text-white transition-colors">
                  All Textbooks
                </Link>
              </li>
              <li>
                <Link href="/#ai-match-section" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>✨ AI Match Finder</span>
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-white transition-colors">
                  Sell Your Books
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-white transition-colors">
                  Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Departments
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/marketplace?subject=Computer+Science" className="hover:text-white transition-colors">
                  Computer Science (CSE)
                </Link>
              </li>
              <li>
                <Link href="/marketplace?subject=Mathematics" className="hover:text-white transition-colors">
                  Engineering Mathematics
                </Link>
              </li>
              <li>
                <Link href="/marketplace?subject=Electronics" className="hover:text-white transition-colors">
                  Electronics (ECE)
                </Link>
              </li>
              <li>
                <Link href="/marketplace?subject=Physics" className="hover:text-white transition-colors">
                  Applied Sciences (PHY/CHEM)
                </Link>
              </li>
            </ul>
          </div>

          {/* Campus Hub */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Campus Hub
            </h4>
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                <MapPin className="w-3.5 h-3.5 text-brand-400" /> NIT Campus Hub
              </div>
              <p className="text-[11px] text-slate-400">
                Peer handovers active at Central Library, Cafeteria & Academic Blocks.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 CampusSwap. Built for College Hackathon • All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-slate-400">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Powered by CampusSwap AI Engine
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
