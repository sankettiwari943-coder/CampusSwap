import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookCard } from '../components/common/BookCard';
import { Book } from '../types';
import {
  ShieldCheck,
  Star,
  BookOpen,
  DollarSign,
  Heart,
  PlusCircle,
  CheckCircle2,
  MapPin
} from 'lucide-react';
import { useLocation } from 'wouter';

export const ProfilePage: React.FC = () => {
  const [, setLocation] = useLocation();
  const { userProfile, books, wishlistIds, markBookAsSold } = useApp();
  const [activeTab, setActiveTab] = useState<'listings' | 'sold' | 'wishlist'>('listings');

  // User's active listed books
  const myListings = books.filter(
    (b: Book) => b.seller.id === userProfile.id || b.seller.name.includes('Harsh')
  );
  const activeListings = myListings.filter((b: Book) => b.isAvailable);
  const soldListings = myListings.filter((b: Book) => !b.isAvailable);
  const wishlistBooks = books.filter((b: Book) => wishlistIds.includes(b.id));

  return (
    <div className="flex-1 bg-slate-50/60 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-20 h-20 rounded-3xl object-cover ring-4 ring-brand-500/20 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold font-display text-slate-950">
                  {userProfile.name}
                </h1>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Campus Student
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-500 mt-1 flex items-center gap-2">
                <span>{userProfile.branch} • {userProfile.year} (Sem {userProfile.semester})</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {userProfile.campus}
                </span>
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-slate-600">
                <span className="flex items-center gap-1 font-bold text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400" /> {userProfile.rating} / 5.0 rating
                </span>
                <span>•</span>
                <span>Member since August 2025</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setLocation('/sell')}
            className="w-full md:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ List New Book</span>
          </button>
        </div>

        {/* Stats Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-subtle flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold font-display text-slate-950">
                {userProfile.totalListings}
              </p>
              <p className="text-xs font-semibold text-slate-500">Total Listings</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-subtle flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold font-display text-slate-950">
                {userProfile.soldCount}
              </p>
              <p className="text-xs font-semibold text-slate-500">Books Sold</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-subtle flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold font-display text-slate-950">
                {wishlistIds.length}
              </p>
              <p className="text-xs font-semibold text-slate-500">Saved Wishlist</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-subtle flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold font-display text-slate-950">
                ₹{userProfile.totalEarnings}
              </p>
              <p className="text-xs font-semibold text-slate-500">Total Earned</p>
            </div>
          </div>
        </div>

        {/* Tabbed Listings View */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <button
              onClick={() => setActiveTab('listings')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'listings'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              My Active Listings ({activeListings.length})
            </button>
            <button
              onClick={() => setActiveTab('sold')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'sold'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Sold Books ({soldListings.length})
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'wishlist'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Saved Wishlist ({wishlistBooks.length})
            </button>
          </div>

          {/* Active Listings Grid */}
          {activeTab === 'listings' && (
            <div>
              {activeListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeListings.map((book: Book) => (
                    <div
                      key={book.id}
                      className="bg-white rounded-3xl border border-slate-200/80 shadow-subtle p-5 flex flex-col justify-between space-y-4"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-16 h-20 object-cover rounded-xl shadow-sm"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                            ● Active Live
                          </span>
                          <h3 className="text-sm font-bold text-slate-900 line-clamp-1 font-display mt-1">
                            {book.title}
                          </h3>
                          <p className="text-xs text-slate-500">by {book.author}</p>
                          <p className="text-sm font-black text-slate-900 font-display mt-1">
                            ₹{book.price}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => setLocation(`/book/${book.id}`)}
                          className="text-xs font-bold text-brand-600 hover:underline"
                        >
                          View Listing
                        </button>
                        <button
                          onClick={() => markBookAsSold(book.id)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-xs font-bold text-slate-700 transition-colors"
                        >
                          Mark as Sold
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 max-w-md mx-auto space-y-4">
                  <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto text-2xl">
                    📚
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    You haven't listed any books yet
                  </h3>
                  <p className="text-xs text-slate-500">
                    Turn your old textbooks into cash and help junior campus students.
                  </p>
                  <button
                    onClick={() => setLocation('/sell')}
                    className="px-5 py-2.5 rounded-2xl bg-brand-600 text-white font-bold text-xs shadow-md"
                  >
                    + Sell a Book with AI
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Sold History */}
          {activeTab === 'sold' && (
            <div>
              {soldListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {soldListings.map((book: Book) => (
                    <div
                      key={book.id}
                      className="bg-white rounded-3xl border border-slate-200/80 shadow-subtle p-5 opacity-75 flex items-center gap-4"
                    >
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-16 h-20 object-cover rounded-xl grayscale"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          ✓ Sold to Student
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-1 mt-1">
                          {book.title}
                        </h4>
                        <p className="text-xs font-bold text-emerald-600 mt-1">
                          +₹{book.price} Earned
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 max-w-md mx-auto space-y-3">
                  <p className="text-sm font-bold text-slate-700">No sold books yet</p>
                  <p className="text-xs text-slate-500">
                    When you complete a handover, mark the item as sold here.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div>
              {wishlistBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistBooks.map((book: Book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 max-w-md mx-auto space-y-3">
                  <p className="text-sm font-bold text-slate-700">Your wishlist is empty</p>
                  <button
                    onClick={() => setLocation('/marketplace')}
                    className="px-5 py-2.5 rounded-2xl bg-brand-600 text-white font-bold text-xs"
                  >
                    Browse Textbooks
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
