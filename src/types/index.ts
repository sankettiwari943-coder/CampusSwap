export type BookCondition = 'New' | 'Like New' | 'Good' | 'Used';

export type Branch = 'CSE' | 'ECE' | 'ME' | 'IT' | 'Civil' | 'EE' | 'All Branches';

export type SubjectCategory = 'Mathematics' | 'Computer Science' | 'Electronics' | 'Physics' | 'Chemistry' | 'General';

export interface Seller {
  id: string;
  name: string;
  avatar: string;
  branch: string;
  year: string; // e.g. "1st Year", "2nd Year"
  semester: number;
  rating: number; // e.g. 4.8
  totalReviews: number;
  booksSold: number;
  campus: string;
  isVerified: boolean;
  phone?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  edition?: string;
  isbn?: string;
  price: number;
  originalPrice: number;
  condition: BookCondition;
  subject: SubjectCategory;
  branch: Branch;
  semester: number;
  coverImage: string;
  coverGradient?: string;
  additionalImages?: string[];
  seller: Seller;
  description: string;
  aiDescription?: string;
  tags: string[];
  matchScore?: number; // 0-100 for current query
  matchReasons?: string[];
  publishedAt: string;
  isPopular?: boolean;
  isAvailable: boolean;
  viewsCount: number;
  savesCount: number;
}

export interface AIMatchExplanation {
  score: number;
  reasons: string[];
  confidence: 'High' | 'Very High' | 'Medium';
  matchingKeywords: string[];
}

export interface AIGeneratedListing {
  title: string;
  author: string;
  subject: SubjectCategory;
  branch: Branch;
  semester: number;
  condition: BookCondition;
  suggestedPrice: number;
  originalPrice: number;
  description: string;
  tags: string[];
}

export interface FilterState {
  searchQuery: string;
  subjects: SubjectCategory[];
  semesters: number[];
  conditions: BookCondition[];
  branches: Branch[];
  minPrice: number;
  maxPrice: number;
  sortBy: 'ai_recommended' | 'price_asc' | 'price_desc' | 'popular' | 'newest';
}

export interface ChatMessage {
  id: string;
  bookId: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  branch: string;
  year: string;
  semester: number;
  campus: string;
  rating: number;
  totalListings: number;
  soldCount: number;
  wishlistCount: number;
  totalEarnings: number;
  isVerified: boolean;
}

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error' | 'ai';
  duration?: number;
}
