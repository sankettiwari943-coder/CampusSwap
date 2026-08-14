import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useApp } from '../context/AppContext';
import { categoryList } from '../data/mockBooks';
import { BookCard } from '../components/common/BookCard';
import { MatchBadge } from '../components/common/MatchBadge';
import { calculateAIMatch } from '../lib/ai-engine';
import { Book, AIMatchExplanation } from '../types';
import {
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AIMatchResultItem {
  book: Book;
  match: AIMatchExplanation;
}

export const HomePage: React.FC = () => {
  const [, setLocation] = useLocation();
  const { books, searchQuery, setSearchQuery } = useApp();

  const [aiSearchInput, setAiSearchInput] = useState('first year CSE maths book');
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiSearchStep, setAiSearchStep] = useState('');
  const [aiResults, setAiResults] = useState<AIMatchResultItem[] | null>(null);

  const popularBooks = books.filter((b: Book) => b.isPopular).slice(0, 6);

  const sampleSearches = [
    'First year CSE maths book',
    'Data structures under ₹500',
    'Operating systems for 3rd semester',
    'Affordable Engineering Physics'
  ];

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setLocation('/marketplace');
      return;
    }
    setLocation(`/marketplace?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleRunAIMatch = (query: string) => {
    setAiSearchInput(query);
    setIsAiSearching(true);
    setAiSearchStep('Understanding your requirements...');
    setAiResults(null);

    setTimeout(() => {
      setAiSearchStep('Scanning campus textbook listings...');
      setTimeout(() => {
        setAiSearchStep('Calculating semantic relevance & match scores...');
        setTimeout(() => {
          // Rank all books by AI match score
          const ranked: AIMatchResultItem[] = books
            .map((book: Book) => {
              const match = calculateAIMatch(book, query);
              return {
                book,
                match
              };
            })
            .sort((a: AIMatchResultItem, b: AIMatchResultItem) => b.match.score - a.match.score)
            .slice(0, 3);

          setAiResults(ranked);
          setIsAiSearching(false);
        }, 600);
      }, 600);
    }, 700);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200/60 bg-gradient-to-b from-brand-50/50 via-white to-slate-50">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-300/25 to-purple-300/25 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col: Hero Copy & Search */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              {/* Trust Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-xs font-bold text-brand-700 shadow-sm animate-pulse-subtle">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span>Next-Gen Campus Textbook Exchange</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-slate-950 leading-[1.08]">
                  BUY SMART.<br />
                  <span className="gradient-text">SELL EASY.</span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed pt-2">
                  Your campus marketplace for affordable textbooks — powered by natural language matching and AI-generated listings.
                </p>
              </div>

              {/* Search Bar Container */}
              <div className="max-w-2xl mx-auto lg:mx-0">
                <form
                  onSubmit={handleHeroSearch}
                  className="p-2 bg-white rounded-3xl shadow-premium border border-slate-200 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/10 transition-all flex flex-col sm:flex-row gap-2"
                >
                  <div className="flex-1 flex items-center gap-3 px-3 py-2">
                    <Search className="w-5 h-5 text-slate-400 shrink-0" />
                    <input
                      id="hero-search-input"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for a book, subject or describe what you need..."
                      className="w-full text-sm sm:text-base text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Explore Marketplace</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>

                {/* Example Searches */}
                <div className="mt-3.5 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs">
                  <span className="text-slate-400 font-semibold">Try searching:</span>
                  {sampleSearches.map((sample, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setSearchQuery(sample);
                        setLocation(`/marketplace?q=${encodeURIComponent(sample)}`);
                      }}
                      className="text-slate-600 hover:text-brand-600 bg-white hover:bg-brand-50 px-2.5 py-1 rounded-lg border border-slate-200/80 transition-all"
                    >
                      "{sample}"
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setLocation('/marketplace')}
                  className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md hover:scale-105 active:scale-95"
                >
                  Explore Marketplace
                </button>
                <a
                  href="#ai-match-section"
                  className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200/90 shadow-sm transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-brand-600" />
                  <span>✨ Find with AI</span>
                </a>
              </div>
            </div>

            {/* Right Col: Floating 3D AI Match Showcase Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm">
                
                {/* Floating AI Match Card (Directly from Prompt Spec) */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-slate-200/90 relative z-20 space-y-4 hover:shadow-card-hover transition-all"
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-3 py-1 rounded-full shadow-glow">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse-subtle" />
                      ✨ AI MATCH
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Good Condition
                    </span>
                  </div>

                  {/* Book Image & Title */}
                  <div className="flex gap-4 items-center">
                    <img
                      src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&auto=format&fit=crop&q=80"
                      alt="Engineering Mathematics"
                      className="w-20 h-24 object-cover rounded-2xl shadow-md shrink-0 ring-1 ring-slate-200"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 font-display leading-tight">
                        Engineering Mathematics
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">by R.K. Jain & S.R.K. Iyengar</p>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900 font-display">
                          ₹450
                        </span>
                        <span className="text-xs text-slate-400 line-through">₹895</span>
                      </div>
                    </div>
                  </div>

                  {/* Match Pill & Reason Callout */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-brand-50/80 to-purple-50/50 border border-brand-100/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Calculated Match:</span>
                      <MatchBadge score={96} size="sm" />
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      Because you searched: <span className="font-bold text-slate-900">"First year CSE maths"</span>
                    </p>
                  </div>

                  {/* View Button */}
                  <button
                    onClick={() => setLocation('/book/book-1')}
                    className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-brand-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>View Book</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>

                {/* Secondary Decorative Floating Card (DSA under 500) */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [6, -6, 6] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-200/80 z-30 hidden sm:flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">
                    98%
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Data Structures in C</p>
                    <p className="text-[10px] text-slate-500">₹500 • 3rd Sem CSE</p>
                  </div>
                </motion.div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. EXPLORE BY CATEGORY */}
      <section className="py-16 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="text-xs font-bold text-brand-600 tracking-wider uppercase mb-1">
                Curriculum Categories
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-950">
                Explore by Category
              </h2>
            </div>
            <button
              onClick={() => setLocation('/marketplace')}
              className="mt-3 md:mt-0 text-sm font-bold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1 group"
            >
              <span>View all categories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoryList.map((cat: { id: string; name: string; icon: string; count: number; color: string }) => (
              <div
                key={cat.id}
                onClick={() => setLocation(`/marketplace?subject=${encodeURIComponent(cat.id)}`)}
                className="group p-5 rounded-3xl bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-brand-300 hover:shadow-card-hover transition-all duration-300 cursor-pointer flex flex-col items-center text-center hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-subtle border border-slate-200/60 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform mb-3">
                  {cat.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors font-display">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-medium">
                  {cat.count} listings
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DEDICATED AI MATCH EXPERIENCE (PRIMARY USP) */}
      <section id="ai-match-section" className="py-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
        {/* Background glow lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/20 border border-brand-400/40 text-xs font-bold text-brand-300 shadow-glow">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>Natural Language Recommendation Engine</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white">
              ✨ Find Exactly What You Need
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Tell CampusSwap what you're looking for. Our intelligent matching system analyzes semester, curriculum branch, synonyms, condition, and price constraints.
            </p>
          </div>

          {/* Interactive AI Search Card */}
          <div className="bg-slate-800/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={aiSearchInput}
                  onChange={(e) => setAiSearchInput(e.target.value)}
                  placeholder="e.g., I need a cheap DBMS book for 3rd semester..."
                  className="w-full text-sm sm:text-base bg-slate-900 text-white placeholder:text-slate-500 px-5 py-4 rounded-2xl border border-slate-700 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/20 outline-none transition-all"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRunAIMatch(aiSearchInput)}
                disabled={isAiSearching}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-500 via-indigo-500 to-purple-500 hover:from-brand-600 hover:to-purple-600 text-white font-bold text-sm shadow-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-105 active:scale-95 shrink-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isAiSearching ? 'Analyzing...' : '✨ Find My Book'}</span>
              </button>
            </div>

            {/* Quick Demo Buttons for Hackathon Presenters */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-slate-400">Quick Test Prompts:</span>
              <button
                onClick={() => handleRunAIMatch('first year CSE maths book')}
                className="bg-slate-700/70 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-600 transition-colors"
              >
                "first year CSE maths book"
              </button>
              <button
                onClick={() => handleRunAIMatch('I need a cheap DBMS book for 3rd semester')}
                className="bg-slate-700/70 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-600 transition-colors"
              >
                "cheap DBMS book for 3rd semester"
              </button>
              <button
                onClick={() => handleRunAIMatch('Data structures under 500')}
                className="bg-slate-700/70 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-600 transition-colors"
              >
                "Data structures under 500"
              </button>
            </div>

            {/* Loading State Animation */}
            {isAiSearching && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-10 text-center flex flex-col items-center justify-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full border-4 border-brand-500/20 border-t-brand-400 animate-spin" />
                <p className="text-sm font-semibold text-brand-300 animate-pulse">
                  {aiSearchStep}
                </p>
              </motion.div>
            )}

            {/* Results Display */}
            {aiResults && !isAiSearching && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 pt-4 border-t border-slate-700/80"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    AI Match Results Ranked by Campus Relevance
                  </h3>
                  <span className="text-xs text-brand-400 font-semibold">
                    Top {aiResults.length} Matches
                  </span>
                </div>

                <div className="space-y-3">
                  {aiResults.map(({ book, match }: AIMatchResultItem, index: number) => (
                    <div
                      key={book.id}
                      onClick={() => setLocation(`/book/${book.id}`)}
                      className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-700/80 hover:border-brand-500/60 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                    >
                      <div className="flex items-start gap-4">
                        <span className="w-7 h-7 rounded-full bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-slate-700">
                          #{index + 1}
                        </span>
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-14 h-18 object-cover rounded-xl shrink-0 ring-1 ring-slate-700"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors font-display">
                              {book.title}
                            </h4>
                            <span className="text-xs text-slate-400">by {book.author}</span>
                          </div>

                          {/* Price & Condition */}
                          <div className="flex items-center gap-3 mt-1 text-xs">
                            <span className="text-base font-black text-white font-display">
                              ₹{book.price}
                            </span>
                            <span className="text-slate-400 line-through">₹{book.originalPrice}</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-slate-300 font-medium">{book.condition} Condition</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-slate-300">{book.branch} Sem {book.semester}</span>
                          </div>

                          {/* Explain Why Matched */}
                          <div className="flex flex-wrap gap-2 mt-2.5">
                            {match.reasons.slice(0, 4).map((r: string, idx: number) => (
                              <span
                                key={idx}
                                className="text-[11px] font-medium text-emerald-300 bg-emerald-950/70 border border-emerald-800/80 px-2.5 py-0.5 rounded-full"
                              >
                                {r}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Action */}
                      <div className="flex md:flex-col items-end justify-between md:justify-center gap-2 shrink-0">
                        <MatchBadge score={match.score} size="md" />
                        <button
                          type="button"
                          className="text-xs font-bold text-brand-400 group-hover:text-brand-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* 4. POPULAR ON CAMPUS */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="text-xs font-bold text-brand-600 tracking-wider uppercase mb-1">
                Trending Among Students
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-950">
                🔥 Popular on Campus
              </h2>
            </div>
            <button
              onClick={() => setLocation('/marketplace')}
              className="mt-3 md:mt-0 px-5 py-2.5 rounded-full text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 shadow-sm transition-all flex items-center gap-2"
            >
              <span>Explore All {books.length} Books</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularBooks.map((book: Book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
              Seamless Peer Exchange
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-950">
              How CampusSwap Works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Designed specifically for college workflows — instant AI matching and safe on-campus handovers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 relative space-y-4 hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white font-black text-lg flex items-center justify-center shadow-md shadow-brand-500/30">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Search in Plain English
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Describe your required course, semester, or budget. No need to memorize exact ISBN numbers or full author names.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 relative space-y-4 hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-md shadow-indigo-500/30">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                AI Analyzes & Matches
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our model ranks listings using curriculum taxonomy, synonyms, and condition notes to display transparent Match Scores.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 relative space-y-4 hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white font-black text-lg flex items-center justify-center shadow-md shadow-purple-500/30">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Handover on Campus
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Connect with the peer seller in 1 click, meet at the college library or canteen, inspect the book, and save up to 60%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CAMPUS SAVINGS METRICS */}
      <section className="py-16 bg-brand-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold font-display text-white">2,400+</p>
              <p className="text-xs sm:text-sm text-brand-200">Textbooks Exchanged</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold font-display text-emerald-400">₹4.8 Lakh+</p>
              <p className="text-xs sm:text-sm text-brand-200">Saved by Students</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold font-display text-white">96%</p>
              <p className="text-xs sm:text-sm text-brand-200">Average AI Match Accuracy</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold font-display text-amber-400">4.8 / 5.0</p>
              <p className="text-xs sm:text-sm text-brand-200">Peer Trust Rating</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
