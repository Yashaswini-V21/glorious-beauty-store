import React from 'react';

interface IconProps {
    className?: string;
}

interface CatIconProps extends IconProps {
    isWinking: boolean;
}

export const CatIcon: React.FC<CatIconProps> = ({ isWinking, className }) => (
    <svg viewBox="0 0 100 95" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="headGradient" cx="50%" cy="50%" r="60%" fx="50%" fy="40%">
                <stop offset="0%" style={{stopColor: '#FFFFFF', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#F3F4F6', stopOpacity: 1}} />
            </radialGradient>
        </defs>

        {/* Head - White */}
        <path d="M 50 95 C 20 95, 0 75, 0 50 C 0 20, 20 10, 25 5 C 30 0, 40 5, 50 5 C 60 5, 70 0, 75 5 C 80 10, 100 20, 100 50 C 100 75, 80 95, 50 95 Z" fill="url(#headGradient)" />
        
        {/* Ears - Black */}
        <g fill="#111827">
            <path d="M 25 28 C 18 18, 35 20, 38 28 Z" />
            <path d="M 75 28 C 82 18, 65 20, 62 28 Z" />
        </g>
        
        {/* Shadow layer for depth */}
        <path d="M 50 95 C 20 95, 0 75, 0 50 C 0 20, 20 10, 25 5 C 30 0, 40 5, 50 5 C 60 5, 70 0, 75 5 C 80 10, 100 20, 100 50 C 100 75, 80 95, 50 95 Z" fill="black" opacity="0.05" />

        {/* Face */}
        <g>
            {isWinking ? (
                <>
                    {/* Winking Eye (Right) */}
                    <path d="M 60 55 C 65 52, 70 52, 75 55" stroke="#111827" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    
                    {/* Open Eye (Left) */}
                    <g>
                        <circle cx="35" cy="55" r="8" fill="#111827"/>
                        <circle cx="37" cy="53" r="2" fill="white" opacity="0.8"/>
                        <path d="M 34 50 l 2 2 l -2 2 l -2 -2 Z" fill="white" className="animate-eye-glint" />
                    </g>
                </>
            ) : (
                <>
                    {/* Eyebrows */}
                    <path d="M 30 48 C 33 46, 37 46, 40 48" stroke="#111827" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    <path d="M 60 48 C 63 46, 67 46, 70 48" stroke="#111827" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    
                    {/* Left Eye */}
                    <g>
                        <circle cx="35" cy="55" r="8" fill="#111827"/>
                        <circle cx="37"cy="53" r="2" fill="white" opacity="0.8"/>
                        <path d="M 34 50 l 2 2 l -2 2 l -2 -2 Z" fill="white" className="animate-eye-glint" />
                    </g>
                    {/* Right Eye */}
                    <g>
                        <circle cx="65" cy="55" r="8" fill="#111827"/>
                        <circle cx="67" cy="53" r="2" fill="white" opacity="0.8"/>
                        <path d="M 64 50 l 2 2 l -2 2 l -2 -2 Z" fill="white" className="animate-eye-glint" style={{ animationDelay: '0.5s' }} />
                    </g>
                </>
            )}
            
            {/* Nose & Mouth */}
            <path d="M 48 65 q 2 3, 4 0" fill="#fbcfe8" /> {/* Pink nose */}
            <path d="M 50 67 L 50 72" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" /> {/* Black mouth line */}
            <path d="M 45 72 q 5 3, 10 0" stroke="#111827" strokeWidth="1.5" fill="none" strokeLinecap="round"/> {/* Black mouth curve */}

            {/* Whiskers */}
            <g stroke="#111827" strokeWidth="1" strokeLinecap="round">
                <path d="M 25 65 L 10 68" />
                <path d="M 25 70 L 8 72" />
                <path d="M 75 65 L 90 68" />
                <path d="M 75 70 L 92 72" />
            </g>
        </g>
    </svg>
);


export const CartIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const UserIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
);

export const MailIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
);

export const LocationIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);