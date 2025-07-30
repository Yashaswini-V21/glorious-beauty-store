import React, { useState, useEffect, createContext, useCallback } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import type { Product, CartItem } from './types';
import AuthPage from './components/Auth';
import HomePage from './components/HomePage';
import ContactPage from './components/ContactPage';
import CheckoutFlow from './components/CheckoutFlow';
import MainLayout from './components/MainLayout';

// --- CONTEXT ---
interface AppContextType {
    cart: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
}

export const AppContext = createContext<AppContextType | null>(null);

// --- SPLASH SCREEN ---


// White sparkling dots (stars)
const Sparkle = ({ className, style }: { className: string; style?: React.CSSProperties }) => (
  <div className={`absolute rounded-full opacity-80 shadow-2xl animate-twinkle ${className}`} style={{...style, background: Math.random() > 0.5 ? '#fff' : '#f9a8d4'}} />
);

const SplashScreen = () => {

  const sparkles = [
    { className: 'w-2 h-2 top-[13%] left-[21%]', delay: '0s' },
    { className: 'w-1.5 h-1.5 top-[25%] right-[16%]', delay: '0.3s' },
    { className: 'w-2 h-2 bottom-[20%] left-[28%]', delay: '0.7s' },
    { className: 'w-1.5 h-1.5 top-[61%] left-[37%]', delay: '1.1s' },
    { className: 'w-2 h-2 bottom-[13%] right-[19%]', delay: '1.4s' },
    { className: 'w-2.5 h-2.5 top-[18%] right-[36%]', delay: '1.8s' },
    { className: 'w-1.5 h-1.5 bottom-[27%] left-[57%]', delay: '2.1s' },
    { className: 'w-1.5 h-1.5 top-[8%] left-[44%]', delay: '0.5s' },
    { className: 'w-2 h-2 top-[40%] right-[10%]', delay: '1.3s' },
    { className: 'w-1.5 h-1.5 bottom-[8%] right-[27%]', delay: '2.3s' },
    { className: 'w-2 h-2 top-[55%] left-[15%]', delay: '1.9s' },
    { className: 'w-1.5 h-1.5 bottom-[40%] right-[35%]', delay: '0.8s' },
    { className: 'w-2 h-2 top-[70%] left-[80%]', delay: '1.7s' },
    { className: 'w-1.5 h-1.5 top-[80%] left-[10%]', delay: '2.5s' },
    { className: 'w-2 h-2 top-[35%] left-[70%]', delay: '0.9s' },
    { className: 'w-1.5 h-1.5 bottom-[50%] right-[60%]', delay: '1.2s' },
    { className: 'w-2 h-2 top-[60%] left-[60%]', delay: '1.6s' },
    { className: 'w-1.5 h-1.5 bottom-[15%] left-[80%]', delay: '2.7s' },
  ];
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-[100] overflow-hidden animate-splashFade bg-gradient-to-br from-[#0a084e] via-[#0a084e] to-[#ff6fcb]">
      {sparkles.map((sparkle, i) => (
        <Sparkle key={i} className={sparkle.className} style={{ animationDelay: sparkle.delay }} />
      ))}
      {/* Main content */}
      <div className="text-center relative">
        <h1 className="text-8xl font-cursive text-white font-bold drop-shadow-2xl tracking-widest animate-fadeInUp">
          Glorious
        </h1>
        <h2 className="text-2xl font-serif text-white mt-2 tracking-wide font-semibold animate-fadeInUp delay-200">
          Beauty Store
        </h2>
        <p className="mt-4 text-base font-serif text-pink-300 animate-fadeInUp delay-400">
          Unleash Your Nature Glow
        </p>

      </div>
    </div>
  );
};

/*
  Add these Tailwind classes to your global CSS for custom animations:
  .animate-splashFade { animation: splashFade 1s ease-in 2s forwards; }
  .animate-bobSlow { animation: bobSlow 3s linear infinite; }
  .animate-gentlePop { animation: gentlePop 1.2s cubic-bezier(0.6,0.2,0.1,1); }
  .animate-gentleText { animation: gentleText 1.7s cubic-bezier(0.4,0,0.2,1); }
  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  @keyframes splashFade { to { opacity: 0; visibility: hidden; } }
  @keyframes bobSlow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  @keyframes gentlePop { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
  @keyframes gentleText { from { opacity: 0; } to { opacity: 1; } }
*/


// --- PROTECTED ROUTE ---
interface ProtectedRouteProps {
    isAuthenticated: boolean;
    children: React.ReactNode;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
};

// --- APP COMPONENT ---
function App() {
    const [showSplash, setShowSplash] = useState(true);
    const [token, setToken] = useState<string | null>(localStorage.getItem('glorious_token'));
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const location = useLocation();

    const isAuthenticated = !!token;

    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    // Add a fade-in effect on page transitions
    useEffect(() => {
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.classList.remove('animate-fadeIn');
            // void mainContent.offsetWidth; // trigger reflow
            mainContent.classList.add('animate-fadeIn');
        }
    }, [location.pathname]);


    const login = useCallback((newToken: string) => {
        localStorage.setItem('glorious_token', newToken);
        setToken(newToken);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('glorious_token');
        setToken(null);
        setCart([]);
        closeCart();
    }, []);

    const openCart = useCallback(() => setIsCartOpen(true), []);
    const closeCart = useCallback(() => setIsCartOpen(false), []);

    const addToCart = useCallback((product: Product, quantity = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });
    }, []);

    const removeFromCart = useCallback((productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    }, []);
    
    const updateQuantity = useCallback((quantity: number, productId: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            setCart(prevCart =>
                prevCart.map(item =>
                    item.id === productId ? { ...item, quantity } : item
                )
            );
        }
    }, [removeFromCart]);

    const clearCart = useCallback(() => {
        setCart([]);
    }, []);

    const contextValue: AppContextType = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isAuthenticated,
        login,
        logout,
        isCartOpen,
        openCart,
        closeCart,
    };

    if (showSplash) {
        return <SplashScreen />;
    }
    
    return (
        <AppContext.Provider value={contextValue}>
            <div className="bg-[#0D0C22] min-h-screen text-gray-200">
                <Routes>
                    <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <AuthPage />} />
                    <Route path="/home" element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <MainLayout><HomePage /></MainLayout>
                        </ProtectedRoute>
                    } />
                    <Route path="/contact" element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <MainLayout><ContactPage /></MainLayout>
                        </ProtectedRoute>
                    } />
                    <Route path="/checkout" element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <MainLayout><CheckoutFlow /></MainLayout>
                        </ProtectedRoute>
                    } />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </AppContext.Provider>
    );
}

export default App;
