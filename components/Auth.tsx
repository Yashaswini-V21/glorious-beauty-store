import React, { useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { CatIcon } from './icons';

const DecorativeShape = ({ className }: { className: string }) => (
    <div className={`absolute rounded-full -z-10 blur-3xl opacity-20 ${className}`}></div>
);

const Sparkle = ({ className, style }: { className: string; style?: React.CSSProperties }) => (
    <div className={`absolute bg-pink-300 rounded-full animate-twinkle -z-10 ${className}`} style={style} />
);

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const AuthPage = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [fpPhone, setFpPhone] = useState('');
    const [fpOtpSent, setFpOtpSent] = useState(false);
    const [fpOtp, setFpOtp] = useState('');
    const [fpNewPassword, setFpNewPassword] = useState('');
    const [fpMessage, setFpMessage] = useState('');
    const [fpLoading, setFpLoading] = useState(false);
    const [isWinking, setIsWinking] = useState(false);
    const navigate = useNavigate();
    const context = useContext(AppContext);

    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [serverError, setServerError] = useState('');

    // State for OTP
    const [phone, setPhone] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpMessage, setOtpMessage] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');

    // Local storage keys
    const USERS_KEY = 'glorious-beauty-users';
    const LOGGED_IN_USER_KEY = 'glorious-beauty-logged-in-user';

    // Helper to get users from localStorage
    const getUsers = () => {
        const usersJson = localStorage.getItem(USERS_KEY);
        return usersJson ? JSON.parse(usersJson) : [];
    };

    // Helper to save users to localStorage
    const saveUsers = (users: any[]) => {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    };

    // Helper to save logged in user
    const saveLoggedInUser = (user: any) => {
        localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
    };

    // Send OTP (frontend only)
    const handleSendOtp = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOtpMessage('');
        setServerError('');

        if (!/^\d{10}$/.test(phone)) {
            setOtpMessage('Please enter a valid 10-digit phone number.');
            return;
        }

        try {
            const newOtp = generateOTP();
            setGeneratedOtp(newOtp);
            setOtpSent(true);
            setOtpMessage(`OTP generated: ${newOtp} (for demo only)`);
            
            // Ensure we're returning a proper JSON response for mobile
            return Promise.resolve({
                success: true,
                message: 'OTP sent successfully',
                otp: newOtp
            });
        } catch (error) {
            console.error('Error generating OTP:', error);
            setOtpMessage('Failed to generate OTP. Please try again.');
            return Promise.reject(new Error('Failed to generate OTP'));
        }
    };

    // Handle signup/login
    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        setServerError('');
        setOtpMessage('');

        if (isLoginView) {
            // Login flow
            const users = getUsers();
            const user = users.find((u: { email: string; password: string }) => u.email === email && u.password === password);
            if (!user) {
                setServerError('Invalid email or password.');
                return;
            }
            saveLoggedInUser(user);
            context?.login('dummy-token');
            navigate('/home');
        } else {
            // Signup flow
            if (!name || !email || !phone || !password || !otp) {
                setServerError('Please fill all fields including OTP.');
                return;
            }
            if (otp !== generatedOtp) {
                setServerError('Invalid OTP.');
                return;
            }
            const users = getUsers();
            if (users.find((u: { email: string }) => u.email === email)) {
                setServerError('Email already exists.');
                return;
            }
            const newUser = { name, email, phone, password };
            users.push(newUser);
            saveUsers(users);
            saveLoggedInUser(newUser);
            context?.login('dummy-token');
            navigate('/home');
        }
    };

    const toggleView = useCallback(() => {
        setIsLoginView(prev => !prev);
        setName('');
        setEmail('');
        setPassword('');
        setPhone('');
        setOtpSent(false);
        setOtp('');
        setOtpMessage('');
        setServerError('');
        setGeneratedOtp('');
    }, []);

    const handlePasswordFocus = () => {
        setIsWinking(true);
        setTimeout(() => {
            setIsWinking(false);
        }, 1500);
    };

    // Forgot Password Handlers (frontend only)
    const handleForgotPasswordSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        setFpMessage('');
        setFpOtpSent(false);
        setFpLoading(true);
        if (!/^\d{10}$/.test(fpPhone)) {
            setFpMessage('Please enter a valid 10-digit phone number.');
            setFpLoading(false);
            return;
        }
        const newOtp = generateOTP();
        setGeneratedOtp(newOtp);
        setFpOtpSent(true);
        setFpMessage(`OTP generated: ${newOtp} (for demo only)`);
        setFpLoading(false);
    };

    const handleForgotPasswordReset = (e: React.FormEvent) => {
        e.preventDefault();
        setFpMessage('');
        setFpLoading(true);
        if (fpOtp !== generatedOtp) {
            setFpMessage('Invalid OTP.');
            setFpLoading(false);
            return;
        }
        const users = getUsers();
        const userIndex = users.findIndex((u: { phone: string }) => u.phone === fpPhone);
        if (userIndex === -1) {
            setFpMessage('Phone number not found.');
            setFpLoading(false);
            return;
        }
        users[userIndex].password = fpNewPassword;
        saveUsers(users);
        setFpMessage('Password reset successful! You can now log in.');
        setTimeout(() => {
            setIsForgotPassword(false);
            setIsLoginView(true);
            setFpPhone('');
            setFpOtp('');
            setFpNewPassword('');
            setFpOtpSent(false);
            setFpMessage('');
        }, 2000);
        setFpLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#0d0c22] overflow-hidden relative">
            <DecorativeShape className="w-64 h-64 bg-pink-500 top-10 left-10" />
            <DecorativeShape className="w-72 h-72 bg-purple-600 bottom-20 right-20" />
            <DecorativeShape className="w-56 h-56 bg-indigo-500 top-1/2 left-1/4" />
            <DecorativeShape className="w-48 h-48 bg-fuchsia-500 bottom-1/4 right-1/3" />
            <DecorativeShape className="w-52 h-52 bg-teal-500 top-20 right-1/4" />
            
            <Sparkle className="w-2 h-2 top-[15%] left-[20%]" style={{ animationDelay: '0s' }} />
            <Sparkle className="w-3 h-3 top-[25%] right-[15%]" style={{ animationDelay: '0.5s' }} />
            <Sparkle className="w-1.5 h-1.5 bottom-[20%] left-[30%]" style={{ animationDelay: '1s' }} />
            <Sparkle className="w-2 h-2 bottom-[15%] right-[25%]" style={{ animationDelay: '1.5s' }} />
            <Sparkle className="w-1 h-1 top-[60%] left-[10%]" style={{ animationDelay: '2s' }} />
            
            <div className="w-full max-w-md z-10">
                <div className="relative mb-6 mx-auto w-28 h-28">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full blur-md"></div>
                    <CatIcon isWinking={isWinking} className="relative w-full h-full" />
                </div>

                <div className="bg-slate-900/50 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-slate-700/50">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-serif text-white">
                            {isForgotPassword
                                ? 'Reset Password'
                                : isLoginView
                                    ? 'Welcome, Gorgeous'
                                    : 'Create Account'}
                        </h2>
                        <p className="text-pink-300 mt-2">
                            {isForgotPassword
                                ? 'Enter your registered phone to reset password'
                                : isLoginView
                                    ? 'Login to unlock your glow'
                                    : 'Join us and start shining'}
                        </p>
                    </div>
                    {/* Forgot Password Form */}
                    {isForgotPassword ? (
                        <form onSubmit={fpOtpSent ? handleForgotPasswordReset : handleForgotPasswordSendOtp}>
                            <div className="mb-4">
                                <input
                                    type="tel"
                                    placeholder="Registered 10-digit Phone Number"
                                    value={fpPhone}
                                    onChange={e => setFpPhone(e.target.value.replace(/\D/g, ''))}
                                    maxLength={10}
                                    className="w-full bg-slate-800/70 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    required
                                    disabled={fpOtpSent}
                                />
                            </div>
                            {fpOtpSent && (
                                <>
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            placeholder="Enter 6-digit OTP"
                                            value={fpOtp}
                                            onChange={e => setFpOtp(e.target.value.replace(/\D/g, ''))}
                                            maxLength={6}
                                            className="w-full bg-slate-800/70 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            type="password"
                                            placeholder="New Password"
                                            value={fpNewPassword}
                                            onChange={e => setFpNewPassword(e.target.value)}
                                            className="w-full bg-slate-800/70 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                            required
                                        />
                                    </div>
                                </>
                            )}
                            {fpMessage && <p className={`text-center text-sm mb-2 ${fpMessage.includes('success') ? 'text-green-400' : 'text-red-400'}`}>{fpMessage}</p>}
                            <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed" disabled={fpLoading}>
                                {fpOtpSent ? 'Reset Password' : 'Send OTP'}
                            </button>
                            <div className="text-center mt-4">
                                <button type="button" className="text-pink-400 hover:text-pink-300 font-semibold" onClick={() => { setIsForgotPassword(false); setFpPhone(''); setFpOtp(''); setFpNewPassword(''); setFpOtpSent(false); setFpMessage(''); }}>
                                    Back to Login
                                </button>
                            </div>
                        </form>
                    ) : (
                        <>
                        <form onSubmit={handleAuth}>
                            {!isLoginView && (
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-pink-400 mb-1">Enter Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Your Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-slate-800/70 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        required
                                    />
                                </div>
                            )}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-pink-400 mb-1">Enter Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-800/70 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    required
                                />
                            </div>
                            {!isLoginView && (
                                <>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-pink-400 mb-1">Enter Phone</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    placeholder="Phone Number (10 digits)"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                    maxLength={10}
                                    className="w-full bg-slate-800/70 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-60"
                                    required
                                    disabled={otpSent}
                                />
                                {!otpSent && (
                                    <button 
                                        onClick={handleSendOtp} 
                                        className="bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors shrink-0 mt-2"
                                    >
                                        Send
                                    </button>
                                )}
                            </div>

                                    {otpMessage && <p className="text-pink-300 text-sm mt-1 mb-2">{otpMessage}</p>}

                                    {otpSent && (
                                        <div className="mb-4">
                                            <input
                                                type="text"
                                                placeholder="Enter 6-digit OTP"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                                maxLength={6}
                                                className='w-full bg-slate-800/70 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500'
                                                required
                                            />
                                            <p className="text-gray-400 text-sm mt-1">
                                                Didn't receive OTP? <button type="button" onClick={() => { setOtpSent(false); setOtpMessage(''); }} className="text-pink-400 hover:underline">Change number</button>
                                            </p>
                                        </div>
                                    )}
                                </>
                            )}
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-pink-400 mb-1">Enter Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-800/70 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    onFocus={handlePasswordFocus}
                                    required
                                />
                            </div>
                            {serverError && <p className="text-red-400 text-center text-sm mb-4">{serverError}</p>}
                            <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                                {isLoginView ? 'Login' : 'Sign Up'}
                            </button>
                        </form>
                        <div className="text-center mt-6">
                            {isLoginView && (
                                <button className="text-pink-400 hover:text-pink-300 font-semibold mb-2" onClick={() => { setIsForgotPassword(true); setFpPhone(''); setFpOtp(''); setFpNewPassword(''); setFpOtpSent(false); setFpMessage(''); }}>
                                    Forgot Password?
                                </button>
                            )}
                            <p className="text-gray-400">
                                {isLoginView ? "Don't have an account? " : 'Already have an account? '}
                                <button onClick={toggleView} className="text-pink-400 hover:text-pink-300 font-semibold">
                                    {isLoginView ? 'Sign up' : 'Login'}
                                </button>
                            </p>
                        </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
