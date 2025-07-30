import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { Product } from '../types';
import { PRODUCTS, MOST_LOVED_PRODUCTS, CATEGORIES } from '../constants';
import { CloseIcon } from './icons';

// --- PRODUCT CARD ---
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const context = useContext(AppContext);
    const navigate = useNavigate();

    const handlePurchaseNow = () => {
        context?.addToCart(product);
        navigate('/checkout');
    };
    
    return (
        <div className="bg-slate-800/50 rounded-lg overflow-hidden shadow-lg hover:shadow-pink-500/20 transition-all duration-300 group flex flex-col">
            <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-3 h-10">{product.description}</p>
                <div className="mt-auto pt-4">
                    <p className="text-2xl font-serif text-pink-300 mb-4">₹{product.price.toFixed(2)}</p>
                    <div className="flex flex-col space-y-2">
                        <button onClick={() => context?.addToCart(product)} className="w-full bg-slate-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors duration-300">
                            Add to Cart
                        </button>
                        <button onClick={handlePurchaseNow} className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity duration-300">
                            Purchase Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- MOST LOVED POPUP ---
const MostLovedPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-2xl w-full relative animate-scaleIn">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <CloseIcon className="w-6 h-6" />
                </button>
                <h2 className="text-3xl font-serif text-center mb-6 text-white">Our Most Loved Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {MOST_LOVED_PRODUCTS.map(product => (
                        <div key={product.id} className="text-center bg-slate-800 p-4 rounded-lg">
                            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-3">
                                <img src={product.image} alt={product.name} className="w-[88px] h-[88px] object-cover rounded-full" />
                            </div>
                            <h3 className="font-bold text-white">{product.name}</h3>
                            <p className="text-sm text-gray-400">{product.category}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- HOME PAGE ---
const HomePage = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const timer = setTimeout(() => setShowPopup(true), 1500); // Popup after 1.5s
        return () => clearTimeout(timer);
    }, []);
    
    const filteredProducts = activeCategory === 'All'
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === activeCategory);

    return (
        <div className="container mx-auto px-6 py-12">
            {showPopup && <MostLovedPopup onClose={() => setShowPopup(false)} />}
            <section className="text-center mb-20">
                <h1 className="text-7xl font-serif font-bold text-white mb-4">Discover Your Radiance</h1>
                <p className="text-xl text-pink-300 max-w-2xl mx-auto">Explore our curated collection of premium cosmetics designed to make you shine.</p>
            </section>
            <section>
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                                activeCategory === category
                                ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30'
                                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
            <footer className="mt-20 text-center text-sm text-gray-400 py-6 border-t border-slate-700">
  © {new Date().getFullYear()} Glorious Beauty Store. All rights reserved.
</footer>
        </div>
    );
};

export default HomePage;