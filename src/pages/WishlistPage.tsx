import React from 'react';
import { useApp } from '../context/AppContext';
import { BookCard } from '../components/common/BookCard';
import { Book } from '../types';
import { Heart, ArrowRight } from 'lucide-react';
import { useLocation } from 'wouter';

export const WishlistPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const { books, wishlistIds } = useApp();

  const savedBooks = books.filter((b: Book) => wishlistIds.includes(b.id));

  const totalSavedValue = savedBooks.reduce(
    (acc: number, b: Book) => acc + (b.originalPrice - b.price),
    0
  );

  return (
    <div className="flex-1 bg-slate-50/60 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
              <Heart className="w-3.5 h-3.5 fill-rose-500" /> Saved Textbooks
            </div>
            <h1 className="text-3xl font-extrabold font-display text-slate-950">
              Your Wishlist ❤️
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {savedBooks.length} books saved for this semester
            </p>
          </div>

          {savedBooks.length > 0 && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                ₹
              </div>
              <div>
                <span className="text-xs font-semibold text-emerald-800">
                  Potential Campus Savings
                </span>
                <p className="text-lg font-black text-emerald-700 font-display">
                  ₹{totalSavedValue} vs retail MRP
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Wishlist Grid or Empty State */}
        {savedBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedBooks.map((book: Book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200/80 shadow-subtle max-w-md mx-auto space-y-5">
            <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
              <Heart className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold font-display text-slate-950">
                Your wishlist is empty
              </h3>
              <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
                Save books you want to keep an eye on or compare prices across semesters.
              </p>
            </div>
            <button
              onClick={() => setLocation('/marketplace')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-brand-500/25 transition-all inline-flex items-center gap-2 hover:scale-105"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
