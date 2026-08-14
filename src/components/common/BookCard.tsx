import React from 'react';
import { Book } from '../../types';
import { useApp } from '../../context/AppContext';
import { MatchBadge } from './MatchBadge';
import { calculateAIMatch } from '../../lib/ai-engine';
import { Heart, ArrowRight } from 'lucide-react';
import { useLocation } from 'wouter';

interface BookCardProps {
  book: Book;
  customScore?: number;
  highlightQuery?: string;
}

export const BookCard: React.FC<BookCardProps> = ({ book, customScore, highlightQuery }) => {
  const { isInWishlist, toggleWishlist, searchQuery } = useApp();
  const [, setLocation] = useLocation();

  const isSaved = isInWishlist(book.id);

  // Compute dynamic match score based on current query if not provided
  const queryToUse = highlightQuery || searchQuery;
  const matchResult = calculateAIMatch(book, queryToUse);
  const displayScore = customScore !== undefined ? customScore : matchResult.score;

  const discountPercent = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);

  const getConditionColor = (cond: string) => {
    switch (cond) {
      case 'New':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Like New':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'Good':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Used':
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  return (
    <div
      id={`book-card-${book.id}`}
      onClick={() => setLocation(`/book/${book.id}`)}
      className="group relative bg-white rounded-3xl border border-slate-200/80 shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden cursor-pointer hover:-translate-y-1.5"
    >
      {/* Top Banner / Book Cover Preview */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <MatchBadge score={displayScore} size="sm" />
          
          <button
            type="button"
            id={`wishlist-btn-${book.id}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(book.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 shadow-sm ${
              isSaved
                ? 'bg-rose-500 text-white scale-110'
                : 'bg-white/80 hover:bg-white text-slate-700 hover:text-rose-500'
            }`}
            aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-4 h-4 transition-transform active:scale-125 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Bottom Cover Info */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white z-10">
          <div>
            <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-md border ${getConditionColor(book.condition)}`}>
              ⭐ {book.condition} Condition
            </span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-slate-300 line-through mr-1">
              ₹{book.originalPrice}
            </span>
            <span className="text-lg font-black text-white font-display drop-shadow">
              ₹{book.price}
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Branch & Semester Metadata */}
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-600 mb-1.5">
            <span className="bg-brand-50 px-2 py-0.5 rounded-md border border-brand-100">
              {book.branch}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 font-medium">Semester {book.semester}</span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-600 font-semibold">{discountPercent}% OFF</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1 font-display">
            {book.title}
          </h3>

          {/* Author */}
          <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
            by {book.author}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {book.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium text-slate-600 bg-slate-100/90 px-2 py-0.5 rounded-md hover:bg-slate-200 transition-colors"
              >
                {tag}
              </span>
            ))}
            {book.tags.length > 3 && (
              <span className="text-[10px] font-medium text-slate-400 self-center">
                +{book.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Card Footer: Seller & CTA */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={book.seller.avatar}
              alt={book.seller.name}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate">
                {book.seller.name}
              </p>
              <p className="text-[10px] text-slate-400">
                {book.seller.branch} • {book.seller.year}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 group-hover:text-brand-700 transition-all group-hover:translate-x-0.5"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
