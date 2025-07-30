import type { CartItem } from '../types';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { CloseIcon } from './icons';

export const CartSidebar = () => {
    const context = useContext(AppContext);
    const navigate = useNavigate();

    if (!context) return null;
    const { isCartOpen, closeCart, cart, updateQuantity, removeFromCart } = context;

    const subtotal = cart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        closeCart();
        navigate('/checkout');
    };

    return (
        <>
            {/* Overlay */}
            <div 
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-500 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={closeCart}
            ></div>
            {/* Sidebar */}
            <aside
                role="dialog"
                aria-modal="true"
                aria-labelledby="cart-heading"
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-slate-900 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-700">
                        <h2 id="cart-heading" className="text-2xl font-serif text-white">Your Cart</h2>
                        <button onClick={closeCart} aria-label="Close cart" className="text-gray-400 hover:text-white">
                            <CloseIcon className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-grow p-6 overflow-y-auto">
                        {cart.length === 0 ? (
                            <p className="text-gray-400 text-center mt-10">Your cart is empty.</p>
                        ) : (
                            <ul className="space-y-5">
                                {cart.map(item => (
                                    <li key={item.id} className="flex items-start space-x-4">
                                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover border border-slate-700" />
                                        <div className="flex-grow">
                                            <p className="font-bold text-white">{item.name}</p>
                                            <p className="text-sm text-pink-300">₹{item.price.toFixed(2)}</p>
                                            <div className="flex items-center mt-2">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Decrease quantity of ${item.name}`} className="w-7 h-7 flex items-center justify-center bg-slate-700 rounded text-lg">-</button>
                                                <span className="px-3 w-10 text-center" aria-live="polite">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Increase quantity of ${item.name}`} className="w-7 h-7 flex items-center justify-center bg-slate-700 rounded text-lg">+</button>
                                            </div>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name} from cart`} className="text-red-400 hover:text-red-300 pt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Footer */}
                    {cart.length > 0 && (
                        <div className="p-6 border-t border-slate-700">
                             <div className="flex justify-between text-lg text-gray-300 mb-4">
                                <span>Subtotal</span>
                                <span className="font-bold text-white">₹{subtotal.toFixed(2)}</span>
                            </div>
                            <button onClick={handleCheckout} className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity duration-300">
                                Proceed to Checkout
                            </button>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
};
