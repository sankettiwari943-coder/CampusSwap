import React, { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Heart,
  Bell,
  PlusCircle,
  Menu,
  X,
  ShieldCheck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [location, setLocation] = useLocation();
  const { wishlistIds, userProfile } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'New AI Match Alert! ✨',
      desc: '"Operating System Concepts" matching your wishlist just listed for ₹650.',
      time: '10m ago',
      unread: true
    },
    {
      id: 2,
      title: 'Buyer Message 💬',
      desc: 'Priya sent an inquiry regarding your Engineering Mathematics book.',
      time: '1h ago',
      unread: false
    }
  ];

  const navLinks = [
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'AI Match', href: '/#ai-match-section' },
    { name: 'Sell a Book', href: '/sell' },
  ];

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false;
    return location === href;
  };

  return (
    <header className="sticky top-0 z-40 w-full glassmorphism border-b border-slate-200/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black font-display tracking-tight text-slate-950 group-hover:text-brand-600 transition-colors flex items-center gap-1.5">
                  CampusSwap
                  <span className="inline-flex items-center text-[10px] font-bold text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded-full border border-brand-200">
                    AI
                  </span>
                </span>
                <span className="text-[10px] font-medium text-slate-500 tracking-wide uppercase -mt-0.5">
                  Buy Smart • Sell Easy
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Center Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/80">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith('/#')) {
                    e.preventDefault();
                    if (location !== '/') {
                      setLocation('/');
                      setTimeout(() => {
                        const el = document.querySelector(link.href.substring(1));
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    } else {
                      const el = document.querySelector(link.href.substring(1));
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }
                  } else {
                    e.preventDefault();
                    setLocation(link.href);
                  }
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-white text-brand-700 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {link.name === 'AI Match' && <span className="mr-1">✨</span>}
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Icons & Profile */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Wishlist Button */}
            <button
              id="nav-wishlist-btn"
              onClick={() => setLocation('/wishlist')}
              className="relative p-2.5 text-slate-600 hover:text-rose-500 rounded-full hover:bg-slate-100/80 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistIds.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm animate-pulse-subtle">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Notification Popover */}
            <div className="relative">
              <button
                id="nav-notif-btn"
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2.5 text-slate-600 hover:text-brand-600 rounded-full hover:bg-slate-100/80 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-brand-600 rounded-full ring-2 ring-white" />
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 px-2">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Notifications
                    </span>
                    <span className="text-[11px] text-brand-600 font-semibold cursor-pointer hover:underline">
                      Mark all as read
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                          n.unread ? 'bg-brand-50/70 border border-brand-100' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-slate-900">{n.title}</p>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-snug">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar Pill */}
            <Link
              href="/profile"
              id="nav-profile-pill"
              className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-slate-100/80 border border-transparent hover:border-slate-200 transition-all group"
            >
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/20"
              />
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-brand-600 transition-colors">
                    Harsh
                  </span>
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                </div>
                <span className="text-[10px] text-slate-400 block -mt-0.5">
                  ⭐ {userProfile.rating}
                </span>
              </div>
            </Link>

            {/* Primary Action Button */}
            <button
              id="nav-sell-btn"
              onClick={() => setLocation('/sell')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 shadow-md shadow-brand-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Sell a Book</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setLocation('/wishlist')}
              className="relative p-2 text-slate-600"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistIds.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 px-6 py-5 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (link.href.startsWith('/#')) {
                    e.preventDefault();
                    if (location !== '/') {
                      setLocation('/');
                      setTimeout(() => {
                        const el = document.querySelector(link.href.substring(1));
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    } else {
                      const el = document.querySelector(link.href.substring(1));
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }
                  } else {
                    e.preventDefault();
                    setLocation(link.href);
                  }
                }}
                className={`block px-4 py-3 rounded-2xl text-sm font-semibold ${
                  isActive(link.href)
                    ? 'bg-brand-50 text-brand-700 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3"
            >
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500/20"
              />
              <div>
                <p className="text-sm font-bold text-slate-900">{userProfile.name}</p>
                <p className="text-xs text-slate-500">{userProfile.branch} • {userProfile.year}</p>
              </div>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setLocation('/sell');
              }}
              className="px-4 py-2.5 rounded-full text-xs font-bold text-white bg-brand-600 shadow-md"
            >
              + Sell a Book
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
