import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, AlertCircle, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const getIcon = () => {
            switch (toast.type) {
              case 'success':
                return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
              case 'ai':
                return <Sparkles className="w-5 h-5 text-indigo-500 shrink-0 animate-spin-slow" />;
              case 'warning':
                return <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />;
              case 'error':
                return <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
              case 'info':
              default:
                return <Info className="w-5 h-5 text-blue-500 shrink-0" />;
            }
          };

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-premium border border-slate-200/80 flex items-start gap-3 relative overflow-hidden group hover:border-slate-300 transition-colors"
            >
              {toast.type === 'ai' && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-500 via-purple-500 to-pink-500" />
              )}
              {getIcon()}
              <div className="flex-1 pr-4">
                <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                  {toast.title}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Close toast"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
