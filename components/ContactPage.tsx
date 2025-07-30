
import React, { useState } from 'react';
import { MailIcon } from './icons';

const ContactPage = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="container mx-auto px-6 py-16">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-serif font-bold text-white">Get in Touch</h1>
                <p className="text-lg text-pink-300 mt-2">We're here for you. How can we help?</p>
            </div>
            <div className="max-w-4xl mx-auto bg-slate-800/50 rounded-2xl p-8 md:p-12 shadow-2xl border border-slate-700/50 grid md:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div>
                    <h2 className="text-3xl font-serif italic font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 drop-shadow-xl">Contact Information</h2>
                    <p className="text-lg font-medium text-pink-300 mb-8">For any queries, feel free to reach out to us. We are here to help you shine!</p>
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <MailIcon className="w-6 h-6 text-pink-400" />
                            <a href="mailto:gloriousbeautystore@email.com" className="text-gray-300 hover:text-white">gloriousbeautystore@email.com</a>
                        </div>
                    </div>
                    {/* Social Media Section */}
                    <div className="mt-10">
                        <h3 className="text-xl font-serif italic font-semibold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2 animate-none transition-all duration-700 drop-shadow-xl tracking-wide">Get in touch with me and follow on social media</h3>
                        <div className="flex space-x-8">
                            {/* Instagram */}
                            <a href="https://www.instagram.com/_yashaswini_v___?igsh=MW90aTg0aTVoemR1ZA==" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 group">
                                <span className="relative">
                                    <svg className="w-8 h-8 text-pink-400 drop-shadow-xl transform transition-transform duration-300 group-hover:scale-125 group-active:scale-90 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"/></svg>
                                </span>
                                <span className="text-pink-400 text-base font-bold group-hover:text-pink-600 transition-colors duration-300">Instagram</span>
                            </a>
                            {/* LinkedIn */}
                            <a href="https://www.linkedin.com/in/yashaswini-v-420b832a7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 group">
                                <span className="relative">
                                    <svg className="w-8 h-8 text-blue-400 drop-shadow-xl transform transition-transform duration-300 group-hover:scale-125 group-active:scale-90 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.25c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.25h-3v-5.5c0-1.378-1.122-2.5-2.5-2.5s-2.5 1.122-2.5 2.5v5.5h-3v-10h3v1.354c.858-1.011 2.137-1.354 3.5-1.354 2.485 0 4.5 2.015 4.5 4.5 4.5v5.5z"/></svg>
                                </span>
                                <span className="text-blue-400 text-base font-bold group-hover:text-blue-600 transition-colors duration-300">LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Message Form */}
                <div>
                    <h2 className="text-3xl font-serif italic font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-6 drop-shadow-xl">Send us a Message</h2>
                    {submitted ? (
                        <div className="bg-green-900/50 border border-green-700 text-green-300 px-4 py-3 rounded-lg text-center">
                            <h3 className="font-bold">Thank you!</h3>
                            <p>Your message has been sent successfully.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <input type="text" placeholder="Your Name" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500" required />
                            </div>
                            <div>
                                <input type="email" placeholder="Your Email" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500" required />
                            </div>
                            <div>
                                <textarea placeholder="Your Message" rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500" required></textarea>
                            </div>
                            <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity duration-300">
                                Send Message
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
