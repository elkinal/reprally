import { useState, useEffect } from 'react';
import { mockProducts, orderHistory, storeInsights } from './data/mockData';
import Dashboard from './components/Dashboard';
import ProductDiscovery from './components/ProductDiscovery';
import Cart from './components/Cart';
import OrderHistory from './components/OrderHistory';
import Navigation from './components/Navigation';
import ChatBot from './components/ChatBot';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const showToast = (product) => {
    setToast(product);
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    showToast(product);
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard
            insights={storeInsights}
            products={mockProducts}
            onNavigate={setCurrentView}
            onAddToCart={addToCart}
          />
        );
      case 'discover':
        return (
          <ProductDiscovery
            products={mockProducts}
            onAddToCart={addToCart}
          />
        );
      case 'orders':
        return (
          <OrderHistory
            orders={orderHistory}
            products={mockProducts}
            onAddToCart={addToCart}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Reprally</h1>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{storeInsights.storeName}</p>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white active:scale-95"
              >
                {darkMode ? (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => setShowCart(true)}
                className="relative p-1.5 sm:p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white active:scale-95"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-blue-600 text-white text-[10px] sm:text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="pb-20 sm:pb-20">
        {renderView()}
      </main>

      <Navigation currentView={currentView} onNavigate={setCurrentView} />

      {showCart && (
        <Cart
          cart={cart}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateCartQuantity}
          onRemove={removeFromCart}
          onClear={clearCart}
        />
      )}

      {showChatBot && (
        <ChatBot onClose={() => setShowChatBot(false)} />
      )}

      {/* Floating Chat Button */}
      {!showChatBot && (
        <button
          onClick={() => setShowChatBot(true)}
          className="fixed bottom-20 right-3 sm:bottom-24 sm:right-4 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white rounded-full shadow-2xl hover:shadow-xl hover:scale-110 active:scale-95 transition-all z-40 flex items-center justify-center animate-fadeIn"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          {/* Pulse effect */}
          <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></span>
        </button>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-20 right-3 sm:bottom-24 sm:right-4 z-50 animate-slideUp">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-2.5 sm:p-3 flex items-center gap-2 sm:gap-3 max-w-[240px] sm:max-w-[280px]">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] sm:text-xs font-semibold text-gray-900 dark:text-white">Added to cart</p>
              <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 truncate">{toast.name}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
