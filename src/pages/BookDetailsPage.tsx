import React, { useState } from 'react';
import { useRoute } from 'wouter';
import { useApp } from '../context/AppContext';
import { MatchBadge } from '../components/common/MatchBadge';
import { ContactModal } from '../components/common/ContactModal';
import { BookCard } from '../components/common/BookCard';
import { calculateAIMatch } from '../lib/ai-engine';
import { Book } from '../types';
import {
  Heart,
  MessageSquare,
  Share2,
  ShieldCheck,
  Star,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  BookOpen
} from 'lucide-react';

export const BookDetailsPage: React.FC = () => {
  const [, params] = useRoute('/book/:id');
  const { books, isInWishlist, toggleWishlist, addToast, searchQuery } = useApp();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const bookId = params?.id;
  const book = books.find((b: Book) => b.id === bookId) || books[0];

  const isSaved = isInWishlist(book.id);

  // Compute AI Match Explanation
  const matchExplanation = calculateAIMatch(book, searchQuery || 'first year CSE maths book');

  const discountPercent = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);

  const similarBooks = books
    .filter((b: Book) => b.id !== book.id && (b.subject === book.subject || b.branch === book.branch))
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast({
      title: 'Link Copied! 🔗',
      message: 'Listing URL copied to clipboard. Share it with classmates!',
      type: 'info'
    });
  };

  const images = [
    book.coverImage,
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&auto=format&fit=crop&q=80'
  ];

  return (
    <div className="flex-1 bg-slate-50/60 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Back Link */}
        <div>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm transition-all hover:-translate-x-0.5"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Marketplace
          </button>
        </div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Col: Image Gallery (5 cols) */}
          <div className="lg:col-span-5 space-y-4 sticky top-28">
            <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-premium aspect-[4/5] flex items-center justify-center p-4">
              <img
                src={selectedImage || book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover rounded-2xl shadow-md"
              />

              {/* Match Badge Floating on Cover */}
              <div className="absolute top-6 left-6 z-10">
                <MatchBadge score={matchExplanation.score} size="lg" />
              </div>

              {/* Condition Badge */}
              <div className="absolute bottom-6 left-6 z-10">
                <span className="text-xs font-bold text-slate-900 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-md">
                  ⭐ Condition: {book.condition}
                </span>
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="flex items-center gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                    (selectedImage || book.coverImage) === img
                      ? 'border-brand-600 ring-2 ring-brand-500/20 scale-105'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Campus Handover Assurance */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-subtle flex items-center gap-3 text-xs text-slate-600">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="leading-snug">
                <strong className="text-slate-900">100% Peer Protection:</strong> Inspect the book on-campus before paying via UPI/Cash.
              </p>
            </div>
          </div>

          {/* Right Col: Book Specs, AI Explanation & Seller (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header & Price Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle space-y-5">
              
              {/* Category Breadcrumbs */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-brand-600">
                <span className="bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-100">
                  {book.subject}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600 font-medium">Branch: {book.branch}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600 font-medium">Semester {book.semester}</span>
              </div>

              {/* Title & Author */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-950 leading-tight">
                  {book.title}
                </h1>
                <p className="text-sm font-semibold text-slate-500 mt-1">
                  Author: <span className="text-slate-800 font-bold">{book.author}</span>
                  {book.edition && <span> • {book.edition}</span>}
                </p>
              </div>

              {/* Price Banner */}
              <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-3xl sm:text-4xl font-black text-slate-950 font-display">
                  ₹{book.price}
                </span>
                <span className="text-sm text-slate-400 line-through">
                  MRP ₹{book.originalPrice}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full ml-auto">
                  Save {discountPercent}% vs Retail
                </span>
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  id="book-contact-seller-btn"
                  onClick={() => setIsContactOpen(true)}
                  className="w-full sm:flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>💬 Contact Seller ({book.seller.name})</span>
                </button>

                <button
                  id="book-wishlist-toggle-btn"
                  onClick={() => toggleWishlist(book.id)}
                  className={`w-full sm:w-auto px-5 py-3.5 rounded-2xl border font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    isSaved
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{isSaved ? 'In Wishlist' : 'Add to Wishlist'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="w-full sm:w-auto p-3.5 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                  aria-label="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 10. AI MATCH EXPLANATION (KEY HACKATHON USP CARD) */}
            <div className="bg-gradient-to-br from-brand-50/90 via-indigo-50/50 to-purple-50/50 rounded-3xl p-6 sm:p-8 border border-brand-200/80 shadow-subtle space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-500/30">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-display">
                      ✨ Why this is a good match
                    </h3>
                    <p className="text-xs text-slate-500">
                      Calculated from your search intent & curriculum requirements
                    </p>
                  </div>
                </div>
                <MatchBadge score={matchExplanation.score} size="md" />
              </div>

              {/* Match Checklist */}
              <div className="space-y-2.5 pt-2">
                {matchExplanation.reasons.map((reason: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-xs font-semibold text-slate-800 bg-white/80 backdrop-blur-sm p-2.5 rounded-xl border border-brand-100/60"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{reason.replace('✓ ', '')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Generated Structured Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-brand-600" />
                  Book Description
                </h3>
                <span className="text-[11px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md border border-brand-200">
                  ✨ AI-Generated Listing Copy
                </span>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                {book.aiDescription || book.description}
              </p>

              {book.isbn && (
                <div className="pt-2 text-xs text-slate-500">
                  <strong>ISBN:</strong> {book.isbn}
                </div>
              )}

              {/* Tags */}
              <div className="pt-3 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-800 block mb-2">
                  Keywords & Curriculum Tags:
                </label>
                <div className="flex flex-wrap gap-2">
                  {book.tags.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="text-xs font-medium text-brand-700 bg-brand-50/80 border border-brand-200/80 px-3 py-1 rounded-xl"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Verified Seller Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Seller Information
              </h3>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={book.seller.avatar}
                    alt={book.seller.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-500/20"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-slate-900 font-display">
                        {book.seller.name}
                      </h4>
                      {book.seller.isVerified && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <ShieldCheck className="w-3 h-3" /> Verified Student
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {book.seller.branch} • {book.seller.year} ({book.seller.campus})
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-600">
                      <span className="flex items-center gap-1 font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {book.seller.rating} ({book.seller.totalReviews} reviews)
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-slate-700">
                        {book.seller.booksSold} books sold
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsContactOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-brand-600 text-white text-xs font-bold transition-all"
                >
                  Message {book.seller.name.split(' ')[0]}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Similar Recommended Textbooks */}
        {similarBooks.length > 0 && (
          <div className="pt-8 border-t border-slate-200/80 space-y-6">
            <h2 className="text-xl sm:text-2xl font-extrabold font-display text-slate-950">
              Students also checked out:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarBooks.map((b: Book) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Contact Seller Modal */}
      <ContactModal
        book={book}
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
};
