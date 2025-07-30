
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CartIcon } from './icons';
import { AppContext } from '../App';
import { CartSidebar } from './CartSidebar';

const Header = () => {
    const context = useContext(AppContext);
    const navigate = useNavigate();
    const cartItemCount = context?.cart.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
      `text-lg hover:text-pink-300 transition-colors duration-300 ${isActive ? 'text-pink-400 font-semibold' : 'text-gray-300'}`;

    return (
        <header className="bg-slate-900/50 backdrop-blur-lg sticky top-0 z-40">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <h1 onClick={() => navigate('/home')} className="text-5xl font-cursive text-white cursor-pointer">Glorious</h1>
                <nav className="hidden md:flex items-center space-x-8">
                    <NavLink to="/home" className={navLinkClasses}>Home</NavLink>
                    <NavLink to="/contact" className={navLinkClasses}>Contact Us</NavLink>
                </nav>
                <div className="flex items-center space-x-4">
                    <button onClick={() => context?.openCart()} className="relative text-gray-300 hover:text-pink-300 transition-colors duration-300">
                        <CartIcon className="h-7 w-7" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </button>
                    <button onClick={() => context?.logout()} className="text-gray-300 hover:text-pink-300 transition-colors duration-300 text-sm">Logout</button>
                </div>
            </div>
        </header>
    );
};


const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <CartSidebar />
            <main className="flex-grow">{children}</main>
            <footer className="bg-slate-900/50 text-center p-4 text-gray-500">
  <span>© {new Date().getFullYear()} Glorious Beauty Store. All Rights Reserved.</span>
</footer>
        </div>
    );
};

export default MainLayout;