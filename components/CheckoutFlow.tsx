
import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import type { CartItem } from '../types';
import { UserIcon, MailIcon, PhoneIcon, LocationIcon, CheckCircleIcon, CloseIcon } from './icons';

type CheckoutStep = 'cart' | 'details' | 'payment' | 'confirmation';

// --- Helper Components ---
const InputField = ({ icon, ...props }: { icon: React.ReactNode; [key: string]: any }) => (
    <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
        </div>
        <input {...props} className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500" />
    </div>
);

const DiscountPopup = ({ onAcknowledge }: { onAcknowledge: () => void }) => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full relative animate-scaleIn text-center">
            <CheckCircleIcon className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-serif text-white mb-2">Congratulations!</h2>
            <p className="text-gray-300 mb-6">You saved ₹100 on your 1st order.</p>
            <button onClick={onAcknowledge} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity duration-300">
                Awesome!
            </button>
        </div>
    </div>
);

// --- Step Components ---

interface CartStepProps {
    cart: CartItem[];
    updateQuantity: (id: number, quantity: number) => void;
    removeFromCart: (id: number) => void;
    subtotal: number;
    discount: number;
    total: number;
    onProceed: () => void;
}
const CartStep: React.FC<CartStepProps> = ({ cart, updateQuantity, removeFromCart, subtotal, discount, total, onProceed }) => (
    <div className="bg-slate-800/50 rounded-2xl p-8 shadow-2xl border border-slate-700/50">
        <h2 className="text-3xl font-serif text-white mb-6">Your Cart</h2>
        {cart.length === 0 ? (
            <p className="text-gray-400">Your cart is empty.</p>
        ) : (
            <>
                <div className="space-y-4 mb-6">
                    {cart.map((item: CartItem) => (
                        <div key={item.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                                <div>
                                    <p className="font-bold text-white">{item.name}</p>
                                    <p className="text-sm text-gray-400">₹{item.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <input type="number" value={item.quantity} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))} className="w-16 bg-slate-700 text-white text-center rounded-md" min="1" />
                                <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-300"><CloseIcon className="w-5 h-5"/></button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="border-t border-slate-700 pt-4 space-y-2">
                    <div className="flex justify-between text-gray-300"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
                    {discount > 0 && <div className="flex justify-between text-green-400"><span>First Order Discount</span><span>- ₹{discount.toFixed(2)}</span></div>}
                    <div className="flex justify-between text-white font-bold text-xl"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
                </div>
                <button onClick={onProceed} className="mt-6 w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity duration-300">
                    Proceed to Details
                </button>
            </>
        )}
    </div>
);

interface DetailsStepProps {
    onProceed: () => void;
    onBack: () => void;
}
const DetailsStep: React.FC<DetailsStepProps> = ({ onProceed, onBack }) => (
    <div className="bg-slate-800/50 rounded-2xl p-8 shadow-2xl border border-slate-700/50">
        <h2 className="text-3xl font-serif text-white mb-6">Delivery Details</h2>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onProceed(); }}>
            <InputField icon={<UserIcon className="w-5 h-5 text-gray-400" />} type="text" placeholder="Receiver Name" required />
            <InputField icon={<MailIcon className="w-5 h-5 text-gray-400" />} type="email" placeholder="Email Address" required />
            <InputField icon={<PhoneIcon className="w-5 h-5 text-gray-400" />} type="tel" placeholder="Phone Number" required />
            <InputField icon={<LocationIcon className="w-5 h-5 text-gray-400" />} type="text" placeholder="Address" required />
             <div className="grid grid-cols-2 gap-4">
                <InputField icon={<span className="text-gray-400 pl-3">#</span>} type="text" placeholder="Pincode" required className="pl-8"/>
                <InputField icon={<LocationIcon className="w-5 h-5 text-gray-400" />} type="text" placeholder="City" required />
            </div>
            <textarea placeholder="Delivery Instructions (Optional)" rows={3} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"></textarea>
            <div className="pt-4 flex justify-between items-center">
                <button type="button" onClick={onBack} className="text-gray-400 hover:text-white">Back to Cart</button>
                <button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity">Continue to Payment</button>
            </div>
        </form>
    </div>
);

interface PaymentStepProps {
    subtotal: number;
    discount: number;
    total: number;
    estimatedDeliveryDays: number;
    onPlaceOrder: () => void;
    onBack: () => void;
}
const PaymentStep: React.FC<PaymentStepProps> = ({ subtotal, discount, total, estimatedDeliveryDays, onPlaceOrder, onBack }) => (
    <div className="bg-slate-800/50 rounded-2xl p-8 shadow-2xl border border-slate-700/50">
        <h2 className="text-3xl font-serif text-white mb-6">Payment Options</h2>
        <div className="space-y-4">
             {['Credit Card', 'Debit Card', 'UPI / Google Pay', 'Cash on Delivery'].map(option => (
                <label key={option} className="flex items-center p-4 bg-slate-800 rounded-lg border border-slate-700 cursor-pointer has-[:checked]:border-pink-500 has-[:checked]:bg-slate-700/50">
                    <input type="radio" name="payment" className="form-radio h-5 w-5 text-pink-500 bg-slate-900 border-slate-600 focus:ring-pink-500" defaultChecked={option === 'Credit Card'}/>
                    <span className="ml-4 text-white">{option}</span>
                </label>
             ))}
        </div>
        <div className="mt-6 border-t border-slate-700 pt-6">
            <h3 className="font-bold text-white mb-2">Order Summary</h3>
            <div className="space-y-2 text-gray-300">
                <div className="flex justify-between"><span>Subtotal:</span><span>₹{subtotal.toFixed(2)}</span></div>
                {discount > 0 && <div className="flex justify-between text-green-400"><span>Discount:</span><span>- ₹{discount.toFixed(2)}</span></div>}
                <div className="flex justify-between text-white font-bold text-xl"><span>Total:</span><span>₹{total.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Estimated Delivery:</span><span>{estimatedDeliveryDays} days</span></div>
            </div>
        </div>
        <div className="mt-8 flex justify-between items-center">
             <button type="button" onClick={onBack} className="text-gray-400 hover:text-white">Back to Details</button>
             <button onClick={onPlaceOrder} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity">
                Place Order (₹{total.toFixed(2)})
             </button>
        </div>
    </div>
);

interface ConfirmationStepProps {
    clearCart: () => void;
}
const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ clearCart }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            clearCart();
        }, 500);
        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
         <div className="bg-slate-800/50 rounded-2xl p-8 shadow-2xl border border-slate-700/50 text-center">
             <CheckCircleIcon className="w-20 h-20 text-green-400 mx-auto mb-4" />
             <h2 className="text-3xl font-serif text-white mb-4">Thank You!</h2>
             <p className="text-gray-300 mb-2">Thank you for your precious time spent to place the order.</p>
             <p className="text-gray-400 text-sm">A confirmation message with your order details has been sent to your email and phone number.</p>
         </div>
    );
};


// --- Main Component ---
const CheckoutFlow = () => {
    const context = useContext(AppContext);
    const [step, setStep] = useState<CheckoutStep>('cart');
    const [isFirstOrder, setIsFirstOrder] = useState(true); // Simulate first order
    const [showDiscountPopup, setShowDiscountPopup] = useState(false);

    if (!context) return null;
    const { cart, updateQuantity, removeFromCart, clearCart } = context;

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = isFirstOrder && subtotal > 0 ? 100 : 0;
    const total = subtotal - discount;
    const estimatedDeliveryDays = cart.length > 2 ? 4 : 2;

    const placeOrder = () => {
        if(isFirstOrder) {
            setShowDiscountPopup(true);
        } else {
            setStep('confirmation');
        }
    };

    const handleAcknowledgeDiscount = () => {
        setShowDiscountPopup(false);
        setIsFirstOrder(false);
        setStep('confirmation');
    };
    
    const handleUpdateQuantity = (id: number, quantity: number) => {
        if (!isNaN(quantity)) {
            updateQuantity(id, quantity);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 'cart': 
                return <CartStep 
                    cart={cart} 
                    updateQuantity={handleUpdateQuantity} 
                    removeFromCart={removeFromCart} 
                    subtotal={subtotal}
                    discount={discount}
                    total={total}
                    onProceed={() => setStep('details')}
                />;
            case 'details': 
                return <DetailsStep 
                    onProceed={() => setStep('payment')}
                    onBack={() => setStep('cart')}
                />;
            case 'payment': 
                return <PaymentStep
                    subtotal={subtotal}
                    discount={discount}
                    total={total}
                    estimatedDeliveryDays={estimatedDeliveryDays}
                    onPlaceOrder={placeOrder}
                    onBack={() => setStep('details')}
                />
            case 'confirmation': 
                return <ConfirmationStep clearCart={clearCart} />;
            default: 
                return <CartStep 
                    cart={cart} 
                    updateQuantity={handleUpdateQuantity} 
                    removeFromCart={removeFromCart} 
                    subtotal={subtotal}
                    discount={discount}
                    total={total}
                    onProceed={() => setStep('details')}
                />;
        }
    }

    return (
        <div className="container mx-auto px-6 py-12 max-w-2xl">
            {showDiscountPopup && <DiscountPopup onAcknowledge={handleAcknowledgeDiscount} />}
            <div className="animate-fadeIn">
                {renderStep()}
            </div>
        </div>
    );
};

export default CheckoutFlow;
