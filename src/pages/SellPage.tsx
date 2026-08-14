import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useApp } from '../context/AppContext';
import { generateListingWithAI } from '../lib/ai-engine';
import { SubjectCategory, Branch, BookCondition } from '../types';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SellPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const { addBook } = useApp();

  // Raw student text input for AI
  const [rawNotes, setRawNotes] = useState(
    'Good condition maths book, some highlighted pages, no torn pages.'
  );

  // Form State
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [subject, setSubject] = useState<SubjectCategory>('Mathematics');
  const [branch, setBranch] = useState<Branch>('CSE');
  const [semester, setSemester] = useState<number>(1);
  const [condition, setCondition] = useState<BookCondition>('Good');
  const [price, setPrice] = useState<number>(450);
  const [originalPrice, setOriginalPrice] = useState<number>(895);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([
    '#EngineeringMaths',
    '#Mathematics',
    '#BTech',
    '#CSE',
    '#FirstYear',
    '#Semester1'
  ]);
  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=80'
  );

  // AI Generation Loading States
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Publish Success Modal
  const [publishedBookId, setPublishedBookId] = useState<string | null>(null);

  const samplePrompts = [
    'Good condition maths book, some highlighted pages, no torn pages.',
    'Used DBMS book 3rd sem Korth, clean condition with solved questions',
    'Data structures in C by Reema Thareja like new condition',
    'Engineering Physics Malik and Singh, slightly used with formulas marked'
  ];

  const presetCovers = [
    'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&auto=format&fit=crop&q=80'
  ];

  const aiSteps = [
    'Analyzing your description & condition...',
    'Identifying syllabus curriculum & author...',
    'Creating professional listing copy...',
    'Generating keyword tags & fair price...'
  ];

  const handleGenerateWithAI = async () => {
    if (!rawNotes.trim()) return;

    setIsGenerating(true);
    setCurrentStepIndex(0);

    // Step by step visual simulation
    for (let i = 0; i < aiSteps.length; i++) {
      setCurrentStepIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    const aiResult = await generateListingWithAI(rawNotes);

    setTitle(aiResult.title);
    setAuthor(aiResult.author);
    setSubject(aiResult.subject);
    setBranch(aiResult.branch);
    setSemester(aiResult.semester);
    setCondition(aiResult.condition);
    setPrice(aiResult.suggestedPrice);
    setOriginalPrice(aiResult.originalPrice);
    setDescription(aiResult.description);
    setTags(aiResult.tags);

    setIsGenerating(false);
    setHasGenerated(true);

    // Smooth scroll down to the generated form
    setTimeout(() => {
      document.getElementById('listing-details-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !price) return;

    const newBook = addBook({
      title,
      author,
      subject,
      branch,
      semester,
      condition,
      price: Number(price),
      originalPrice: Number(originalPrice || price * 1.8),
      coverImage,
      description,
      aiDescription: description,
      tags,
      seller: {} as any
    });

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    setPublishedBookId(newBook.id);
  };

  return (
    <div className="flex-1 bg-slate-50/60 py-8 lg:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-xs font-bold text-brand-700">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>AI-Assisted Listing Studio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-950">
            Sell Your Book
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
            Turn your old textbooks into someone else's opportunity. Let AI structure the perfect campus listing in seconds.
          </p>
        </div>

        {/* 11. AI SECTION (HERO USP OF SELLER FLOW) */}
        <div className="bg-gradient-to-br from-brand-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-700/80 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Subtle glow accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-500/30 border border-brand-400/40 flex items-center justify-center text-brand-300">
                <Sparkles className="w-5 h-5 animate-pulse-subtle" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold font-display text-white">
                  ✨ Let AI write your listing
                </h2>
                <p className="text-xs text-slate-400">
                  Enter rough notes — our AI generates title, professional description, category & tags
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-flex text-[11px] font-bold text-brand-300 bg-brand-500/20 border border-brand-400/30 px-3 py-1 rounded-full">
              Zero Manual Effort
            </span>
          </div>

          {/* Prompt Textarea */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-300 block">
              Describe your book in your own words:
            </label>
            <textarea
              id="ai-seller-notes-input"
              value={rawNotes}
              onChange={(e) => setRawNotes(e.target.value)}
              rows={3}
              placeholder="e.g., Book is used but good. Some pages highlighted. No torn pages. Bought last year."
              className="w-full text-sm text-white bg-slate-900/90 p-4 rounded-2xl border border-slate-700 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/20 outline-none transition-all placeholder:text-slate-500 resize-none leading-relaxed"
            />
          </div>

          {/* Quick Preset Prompt Chips */}
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-slate-400 block">
              Or click a demo sample prompt:
            </label>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRawNotes(p)}
                  className="text-xs text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white px-3 py-1.5 rounded-xl border border-slate-700 transition-colors text-left"
                >
                  "{p}"
                </button>
              ))}
            </div>
          </div>

          {/* Trigger Action */}
          <div className="pt-2">
            <button
              id="ai-generate-listing-btn"
              type="button"
              onClick={handleGenerateWithAI}
              disabled={isGenerating || !rawNotes.trim()}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-500 via-indigo-500 to-purple-500 hover:from-brand-600 hover:to-purple-600 text-white font-bold text-sm shadow-glow transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {isGenerating ? 'Synthesizing with AI...' : '✨ Generate Listing with AI'}
              </span>
            </button>
          </div>
        </div>

        {/* 12. AI GENERATION ANIMATED STEPS MODAL / OVERLAY */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-8 border border-brand-200 shadow-xl space-y-6 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-brand-50 border-4 border-brand-200 border-t-brand-600 animate-spin mx-auto flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-brand-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  ✨ CampusSwap AI is crafting your listing...
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Extracting textbook taxonomy and formatting copy
                </p>
              </div>

              {/* Progress Steps */}
              <div className="max-w-md mx-auto space-y-3 text-left">
                {aiSteps.map((step, idx) => {
                  const isDone = idx < currentStepIndex;
                  const isCurrent = idx === currentStepIndex;
                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 p-3 rounded-2xl text-xs transition-all ${
                        isCurrent
                          ? 'bg-brand-50 border border-brand-200 font-bold text-brand-900'
                          : isDone
                          ? 'text-emerald-700 font-semibold'
                          : 'text-slate-400 opacity-60'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : isCurrent ? (
                        <div className="w-4 h-4 rounded-full border-2 border-brand-600 border-t-transparent animate-spin shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                      )}
                      <span>{step}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 13. EDITABLE GENERATED LISTING FORM */}
        <form
          id="listing-details-form"
          onSubmit={handlePublish}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-subtle space-y-8"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold font-display text-slate-900">
                Book Listing Details
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Review and adjust fields before publishing to campus
              </p>
            </div>
            {hasGenerated && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" /> AI Generated
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Title */}
            <div className="sm:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Book Title *
              </label>
              <input
                id="book-title-input"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Engineering Mathematics — R.K. Jain"
                className="w-full text-sm text-slate-900 p-3.5 rounded-2xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
              />
            </div>

            {/* Author */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Author(s) *
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. R.K. Jain & S.R.K. Iyengar"
                className="w-full text-sm text-slate-900 p-3.5 rounded-2xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
              />
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Subject / Category *
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as SubjectCategory)}
                className="w-full text-sm font-semibold text-slate-900 p-3.5 rounded-2xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all bg-white"
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electronics">Electronics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="General">General</option>
              </select>
            </div>

            {/* Branch */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Branch *
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value as Branch)}
                className="w-full text-sm font-semibold text-slate-900 p-3.5 rounded-2xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all bg-white"
              >
                <option value="CSE">CSE (Computer Science)</option>
                <option value="ECE">ECE (Electronics)</option>
                <option value="ME">ME (Mechanical)</option>
                <option value="IT">IT (Information Tech)</option>
                <option value="Civil">Civil Engineering</option>
                <option value="EE">EE (Electrical)</option>
                <option value="All Branches">All Branches</option>
              </select>
            </div>

            {/* Semester */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Semester *
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
                className="w-full text-sm font-semibold text-slate-900 p-3.5 rounded-2xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all bg-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Condition *
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as BookCondition)}
                className="w-full text-sm font-semibold text-slate-900 p-3.5 rounded-2xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all bg-white"
              >
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Used">Used</option>
              </select>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Selling Price (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                  ₹
                </span>
                <input
                  type="number"
                  required
                  min="50"
                  max="5000"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  placeholder="450"
                  className="w-full text-sm font-bold text-slate-900 pl-8 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
                />
              </div>
            </div>

            {/* Cover Selector */}
            <div className="sm:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Select Cover Photo
              </label>
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {presetCovers.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Cover Option"
                    onClick={() => setCoverImage(img)}
                    className={`w-16 h-20 object-cover rounded-xl cursor-pointer border-2 transition-all shrink-0 ${
                      coverImage === img
                        ? 'border-brand-600 ring-4 ring-brand-500/20 scale-105'
                        : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="sm:col-span-2 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  AI-Generated Description *
                </label>
                <span className="text-[11px] text-brand-600 font-semibold">
                  Editable
                </span>
              </div>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Professional description of book condition, edition, and highlights..."
                className="w-full text-sm text-slate-900 p-4 rounded-2xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Tags */}
            <div className="sm:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Tags & Keywords
              </label>
              <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                {tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium text-brand-700 bg-white border border-brand-200 px-3 py-1 rounded-xl shadow-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleGenerateWithAI}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Regenerate with AI</span>
            </button>

            <button
              id="publish-listing-btn"
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Check className="w-4 h-4" />
              <span>Publish Listing</span>
            </button>
          </div>
        </form>
      </div>

      {/* 13. PUBLISH SUCCESS MODAL (WITH CONFETTI & ROUTING) */}
      <AnimatePresence>
        {publishedBookId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200 max-w-md w-full text-center z-10 space-y-6"
            >
              <div className="w-20 h-20 bg-gradient-to-tr from-brand-500 to-purple-600 text-white rounded-full flex items-center justify-center mx-auto shadow-glow">
                <Sparkles className="w-10 h-10 animate-pulse" />
              </div>

              <div>
                <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">
                  Success
                </span>
                <h3 className="text-2xl font-extrabold font-display text-slate-950 mt-1">
                  Your book is now live! ✨
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Students on your campus can now discover it using AI search and contact you for instant peer exchange.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left flex items-center gap-3">
                <img
                  src={coverImage}
                  alt="Cover"
                  className="w-12 h-14 object-cover rounded-lg shadow-sm"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">{title}</p>
                  <p className="text-xs font-semibold text-brand-600 mt-0.5">₹{price}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  id="view-live-listing-btn"
                  onClick={() => setLocation(`/book/${publishedBookId}`)}
                  className="py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all"
                >
                  View Listing
                </button>
                <button
                  onClick={() => {
                    setPublishedBookId(null);
                    setTitle('');
                    setHasGenerated(false);
                  }}
                  className="py-3 rounded-2xl bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-xs border border-brand-200 transition-all"
                >
                  Sell Another Book
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
