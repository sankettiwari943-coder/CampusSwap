import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, FilterState, ToastNotification, UserProfile, ChatMessage } from '../types';
import { initialBooks, currentUser } from '../data/mockBooks';

interface AppContextType {
  books: Book[];
  wishlistIds: string[];
  searchQuery: string;
  filters: FilterState;
  toasts: ToastNotification[];
  userProfile: UserProfile;
  messages: ChatMessage[];
  addBook: (newBook: Omit<Book, 'id' | 'publishedAt' | 'viewsCount' | 'savesCount' | 'isAvailable'>) => Book;
  toggleWishlist: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
  setSearchQuery: (query: string) => void;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  addToast: (toast: Omit<ToastNotification, 'id'>) => void;
  removeToast: (id: string) => void;
  sendMessage: (bookId: string, text: string) => void;
  markBookAsSold: (bookId: string) => void;
}

const defaultFilters: FilterState = {
  searchQuery: '',
  subjects: [],
  semesters: [],
  conditions: [],
  branches: [],
  minPrice: 0,
  maxPrice: 2000,
  sortBy: 'ai_recommended'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Books state with localStorage
  const [books, setBooks] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem('campusswap_books');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return initialBooks;
  });

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('campusswap_wishlist');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return ['book-1', 'book-4'];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>(currentUser);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('campusswap_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('campusswap_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const addToast = (toast: Omit<ToastNotification, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastNotification = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleWishlist = (bookId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(bookId);
      const targetBook = books.find(b => b.id === bookId);
      const title = targetBook ? targetBook.title : 'Book';

      if (exists) {
        addToast({
          title: 'Removed from Wishlist',
          message: `${title} was removed from your saved items.`,
          type: 'info'
        });
        return prev.filter((id) => id !== bookId);
      } else {
        addToast({
          title: 'Added to Wishlist ❤️',
          message: `${title} saved to your campus wishlist!`,
          type: 'success'
        });
        return [...prev, bookId];
      }
    });
  };

  const isInWishlist = (bookId: string) => wishlistIds.includes(bookId);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setSearchQuery('');
  };

  const addBook = (newBookData: Omit<Book, 'id' | 'publishedAt' | 'viewsCount' | 'savesCount' | 'isAvailable'>): Book => {
    const newBook: Book = {
      ...newBookData,
      id: `book-user-${Date.now()}`,
      publishedAt: 'Just now',
      viewsCount: 1,
      savesCount: 0,
      isAvailable: true,
      seller: {
        id: userProfile.id,
        name: userProfile.name,
        avatar: userProfile.avatar,
        branch: userProfile.branch,
        year: userProfile.year,
        semester: userProfile.semester,
        rating: userProfile.rating,
        totalReviews: 25,
        booksSold: userProfile.soldCount,
        campus: userProfile.campus,
        isVerified: true,
        phone: '+91 98765 43210'
      }
    };

    setBooks((prev) => [newBook, ...prev]);
    setUserProfile((prev) => ({
      ...prev,
      totalListings: prev.totalListings + 1
    }));

    addToast({
      title: '✨ Listing Published!',
      message: `"${newBook.title}" is now live for students on your campus.`,
      type: 'ai',
      duration: 5000
    });

    return newBook;
  };

  const markBookAsSold = (bookId: string) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, isAvailable: false } : b))
    );
    setUserProfile((prev) => ({
      ...prev,
      soldCount: prev.soldCount + 1,
      totalEarnings: prev.totalEarnings + (books.find((b) => b.id === bookId)?.price || 400)
    }));
    addToast({
      title: 'Marked as Sold! 🎉',
      message: 'Great job! Your earnings have been updated in your profile.',
      type: 'success'
    });
  };

  const sendMessage = (bookId: string, text: string) => {
    const targetBook = books.find((b) => b.id === bookId);
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      bookId,
      senderId: userProfile.id,
      receiverId: targetBook?.seller.id || 'seller-1',
      message: text,
      timestamp: 'Just now',
      status: 'sent'
    };
    setMessages((prev) => [...prev, newMsg]);
    addToast({
      title: 'Message Sent Successfully! 💬',
      message: `Sent to ${targetBook?.seller.name || 'Seller'}. You'll receive a campus SMS/notification when they reply.`,
      type: 'success'
    });
  };

  return (
    <AppContext.Provider
      value={{
        books,
        wishlistIds,
        searchQuery,
        filters,
        toasts,
        userProfile,
        messages,
        addBook,
        toggleWishlist,
        isInWishlist,
        setSearchQuery,
        setFilters,
        updateFilter,
        resetFilters,
        addToast,
        removeToast,
        sendMessage,
        markBookAsSold
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
