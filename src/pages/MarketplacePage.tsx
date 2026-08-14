import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BookCard } from '../components/common/BookCard';
import { Book, SubjectCategory, Branch, BookCondition } from '../types';
import { calculateAIMatch } from '../lib/ai-engine';
import {
  Search,
  RotateCcw,
  Sparkles,
  X,
  Filter
} from 'lucide-react';
import { useSearch } from 'wouter';

export const MarketplacePage: React.FC = () => {
  const { books, filters, updateFilter, resetFilters, searchQuery, setSearchQuery } = useApp();
  const [, setMobileFilterOpen] = useState(false);
  const searchParams = new URLSearchParams(useSearch());

  // Handle URL params if passed e.g. /marketplace?q=... or ?subject=...
  useEffect(() => {
    const q = searchParams.get('q');
    const subject = searchParams.get('subject');
    if (q) {
      setSearchQuery(q);
    }
    if (subject) {
      updateFilter('subjects', [subject as SubjectCategory]);
    }
  }, []);

  const subjectsList: SubjectCategory[] = [
    'Computer Science',
    'Mathematics',
    'Electronics',
    'Physics',
    'Chemistry',
    'General'
  ];

  const semestersList = [1, 2, 3, 4, 5, 6];
  const conditionsList: BookCondition[] = ['New', 'Like New', 'Good', 'Used'];
  const branchesList: Branch[] = ['CSE', 'ECE', 'ME', 'IT', 'Civil', 'EE'];

  const toggleSubject = (sub: SubjectCategory) => {
    const current = filters.subjects;
    if (current.includes(sub)) {
      updateFilter('subjects', current.filter((s: SubjectCategory) => s !== sub));
    } else {
      updateFilter('subjects', [...current, sub]);
    }
  };

  const toggleSemester = (sem: number) => {
    const current = filters.semesters;
    if (current.includes(sem)) {
      updateFilter('semesters', current.filter((s: number) => s !== sem));
    } else {
      updateFilter('semesters', [...current, sem]);
    }
  };

  const toggleCondition = (cond: BookCondition) => {
    const current = filters.conditions;
    if (current.includes(cond)) {
      updateFilter('conditions', current.filter((c: BookCondition) => c !== cond));
    } else {
      updateFilter('conditions', [...current, cond]);
    }
  };

  const toggleBranch = (branch: Branch) => {
    const current = filters.branches;
    if (current.includes(branch)) {
      updateFilter('branches', current.filter((b: Branch) => b !== branch));
    } else {
      updateFilter('branches', [...current, branch]);
    }
  };

  // Filter & Sort books
  const filteredBooks = useMemo(() => {
    return books
      .filter((book: Book) => {
        // Search query filter with AI matching fallback
        if (searchQuery.trim()) {
          const match = calculateAIMatch(book, searchQuery);
          const queryLower = searchQuery.toLowerCase();
          const titleMatch = book.title.toLowerCase().includes(queryLower);
          const authorMatch = book.author.toLowerCase().includes(queryLower);
          const tagMatch = book.tags.some((t: string) => t.toLowerCase().includes(queryLower));
          if (!titleMatch && !authorMatch && !tagMatch && match.score < 40) {
            return false;
          }
        }

        // Subjects filter
        if (filters.subjects.length > 0 && !filters.subjects.includes(book.subject)) {
          return false;
        }

        // Semester filter
        if (filters.semesters.length > 0 && !filters.semesters.includes(book.semester)) {
          return false;
        }

        // Condition filter
        if (filters.conditions.length > 0 && !filters.conditions.includes(book.condition)) {
          return false;
        }

        // Branch filter
        if (
          filters.branches.length > 0 &&
          !filters.branches.includes(book.branch) &&
          book.branch !== 'All Branches'
        ) {
          return false;
        }

        // Price filter
        if (book.price < filters.minPrice || book.price > filters.maxPrice) {
          return false;
        }

        return true;
      })
      .sort((a: Book, b: Book) => {
        if (filters.sortBy === 'price_asc') {
          return a.price - b.price;
        } else if (filters.sortBy === 'price_desc') {
          return b.price - a.price;
        } else if (filters.sortBy === 'newest') {
          return b.id.localeCompare(a.id);
        } else {
          // AI Recommended sorting: rank by calculated match score
          const scoreA = calculateAIMatch(a, searchQuery).score;
          const scoreB = calculateAIMatch(b, searchQuery).score;
          return scoreB - scoreA;
        }
      });
  }, [books, filters, searchQuery]);

  const activeFilterCount =
    filters.subjects.length +
    filters.semesters.length +
    filters.conditions.length +
    filters.branches.length +
    (filters.maxPrice < 2000 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="flex-1 bg-slate-50/60 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Ribbon */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-subtle">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Peer Textbook Catalog
            </div>
            <h1 className="text-3xl font-extrabold font-display text-slate-950">
              Campus Marketplace
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Showing {filteredBooks.length} available textbooks from verified students
            </p>
          </div>

          {/* Search Bar in Header */}
          <div className="w-full md:w-96 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, author, or describe requirement..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Main Grid: Sidebar Filters + Book Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar (3 cols) */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 sticky top-28 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-subtle">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 font-display">
                <Filter className="w-4 h-4 text-brand-600" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 text-[11px] font-bold flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>

            {/* Subject Filter */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Subject
              </label>
              <div className="space-y-2">
                {subjectsList.map((subject) => {
                  const isSelected = filters.subjects.includes(subject);
                  return (
                    <label
                      key={subject}
                      className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer hover:text-slate-900"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSubject(subject)}
                        className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 rounded-md"
                      />
                      <span>{subject}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Semester Filter */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Semester
              </label>
              <div className="grid grid-cols-3 gap-2">
                {semestersList.map((sem) => {
                  const isSelected = filters.semesters.includes(sem);
                  return (
                    <button
                      key={sem}
                      type="button"
                      onClick={() => toggleSemester(sem)}
                      className={`py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        isSelected
                          ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Sem {sem}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Condition Filter */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Condition
              </label>
              <div className="space-y-2">
                {conditionsList.map((cond) => {
                  const isSelected = filters.conditions.includes(cond);
                  return (
                    <label
                      key={cond}
                      className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer hover:text-slate-900"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleCondition(cond)}
                        className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 rounded-md"
                      />
                      <span>{cond}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Branch Filter */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Branch / Dept
              </label>
              <div className="grid grid-cols-3 gap-2">
                {branchesList.map((branch) => {
                  const isSelected = filters.branches.includes(branch);
                  return (
                    <button
                      key={branch}
                      type="button"
                      onClick={() => toggleBranch(branch)}
                      className={`py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        isSelected
                          ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {branch}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-800 uppercase tracking-wider">
                  Max Price
                </label>
                <span className="font-bold text-brand-600 font-display text-sm">
                  ₹{filters.maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={filters.maxPrice}
                onChange={(e) => updateFilter('maxPrice', parseInt(e.target.value, 10))}
                className="w-full accent-brand-600 cursor-pointer"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>₹100</span>
                <span>₹2,000</span>
              </div>
            </div>
          </div>

          {/* Book Cards & Sorting (9 cols) */}
          <div className="lg:col-span-9 space-y-6">
            {/* Active Filter Chips & Sorting Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-subtle">
              {/* Active Filter Chips */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden px-3.5 py-1.5 rounded-xl bg-slate-100 text-xs font-bold text-slate-800 flex items-center gap-1.5"
                >
                  <Filter className="w-3.5 h-3.5 text-brand-600" />
                  <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
                </button>

                {filters.subjects.map((s: SubjectCategory) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-lg"
                  >
                    {s}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-brand-900"
                      onClick={() => toggleSubject(s)}
                    />
                  </span>
                ))}

                {filters.semesters.map((sem: number) => (
                  <span
                    key={sem}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-lg"
                  >
                    Sem {sem}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-brand-900"
                      onClick={() => toggleSemester(sem)}
                    />
                  </span>
                ))}

                {filters.branches.map((b: Branch) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-lg"
                  >
                    {b}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-brand-900"
                      onClick={() => toggleBranch(b)}
                    />
                  </span>
                ))}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs font-medium text-slate-500">Sort:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilter('sortBy', e.target.value as any)}
                  className="text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 outline-none focus:border-brand-500 cursor-pointer"
                >
                  <option value="ai_recommended">✨ AI Recommended</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="newest">Recently Added</option>
                </select>
              </div>
            </div>

            {/* Grid of Books */}
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book: Book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-subtle space-y-4 max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto text-2xl">
                  🔍
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  No exact matches found
                </h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Try broadening your filters or let our AI engine find related books across semesters and branches.
                </p>
                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    onClick={resetFilters}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      updateFilter('maxPrice', 2000);
                      updateFilter('semesters', []);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>✨ Expand Search</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
