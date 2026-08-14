import React, { useState } from 'react';
import { Book } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Send, ShieldCheck, Star, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ book, isOpen, onClose }) => {
  const { sendMessage } = useApp();
  const [messageText, setMessageText] = useState(`Hi ${book.seller.name}! Is "${book.title}" still available for ₹${book.price}? Can we meet near the campus library?`);
  const [isSent, setIsSent] = useState(false);

  const presetMessages = [
    'Hi! Is this book still available?',
    'Can we meet near the library today?',
    'Is the price negotiable for campus students?',
    'Are all chapters and pages completely intact?'
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    sendMessage(book.id, messageText);
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 2200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/80 max-w-lg w-full overflow-hidden z-10"
          >
            {/* Header Ribbon */}
            <div className="bg-gradient-to-r from-brand-600 to-indigo-600 p-6 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold text-brand-100 uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Direct Campus Exchange
              </div>
              <h3 className="text-xl font-bold font-display">
                Contact {book.seller.name}
              </h3>
              <p className="text-sm text-brand-100 mt-1 line-clamp-1">
                Regarding: {book.title} (₹{book.price})
              </p>
            </div>

            {isSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-glow-emerald">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 font-display">
                  Message Sent Successfully!
                </h4>
                <p className="text-sm text-slate-600 mt-2 max-w-xs leading-relaxed">
                  {book.seller.name} has been notified. You can meet at the designated campus spot for instant exchange.
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> Safe On-Campus Peer Handover
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSend} className="p-6">
                {/* Seller Quick Profile */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/70 mb-5">
                  <img
                    src={book.seller.avatar}
                    alt={book.seller.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-white"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900 truncate">
                        {book.seller.name}
                      </span>
                      {book.seller.isVerified && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <ShieldCheck className="w-3 h-3" /> Verified Student
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {book.seller.branch} • {book.seller.year} • {book.seller.campus}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{book.seller.rating}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {book.seller.booksSold} books sold
                    </span>
                  </div>
                </div>

                {/* Quick Preset Chips */}
                <div className="mb-4">
                  <label className="text-xs font-semibold text-slate-700 block mb-2">
                    Quick Suggestions:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {presetMessages.map((msg, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setMessageText(msg)}
                        className="text-xs bg-slate-100 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200 transition-all text-left"
                      >
                        {msg}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Message Area */}
                <div className="mb-6">
                  <label className="text-xs font-semibold text-slate-700 block mb-2">
                    Your Message to {book.seller.name}:
                  </label>
                  <div className="relative">
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      rows={4}
                      required
                      placeholder="Type your message or negotiate pickup spot..."
                      className="w-full text-sm text-slate-900 p-3.5 rounded-2xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all resize-none"
                    />
                    <MessageSquare className="w-4 h-4 text-slate-400 absolute bottom-3 right-3 pointer-events-none" />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 shadow-md shadow-brand-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
