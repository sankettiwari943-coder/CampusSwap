import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/Toast';
import { DemoGuideBar } from './components/common/DemoGuideBar';

// Pages
import { HomePage } from './pages/HomePage';
import { MarketplacePage } from './pages/MarketplacePage';
import { BookDetailsPage } from './pages/BookDetailsPage';
import { SellPage } from './pages/SellPage';
import { ProfilePage } from './pages/ProfilePage';
import { WishlistPage } from './pages/WishlistPage';

// Scroll to top on route changes
const ScrollToTop: React.FC = () => {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-surface-50 text-surface-900 selection:bg-brand-500 selection:text-white">
        <ScrollToTop />
        <Navbar />

        <main className="flex-1 flex flex-col">
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/marketplace" component={MarketplacePage} />
            <Route path="/book/:id" component={BookDetailsPage} />
            <Route path="/sell" component={SellPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/wishlist" component={WishlistPage} />
            <Route component={HomePage} />
          </Switch>
        </main>

        <Footer />
        <ToastContainer />
        <DemoGuideBar />
      </div>
    </AppProvider>
  );
};

export default App;
