'use client';

import { useState, useEffect } from 'react';

export default function LoadingScreen() {
    const [loading, setLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [showLetters, setShowLetters] = useState(false);

    const letters = ['P', 'a', 't', 'r', 'i', 'c', 'k', '.'];

    useEffect(() => {
        // Check if already loaded this session
        if (sessionStorage.getItem('loaded')) {
            setLoading(false);
            return;
        }

        // Start letter reveal after a brief delay
        const revealTimer = setTimeout(() => {
            setShowLetters(true);
        }, 200);

        // Wait for loading bar animation to complete, then fade out
        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
                setLoading(false);
                sessionStorage.setItem('loaded', 'true');
            }, 800);
        }, 3000);

        return () => {
            clearTimeout(timer);
            clearTimeout(revealTimer);
        };
    }, []);

    if (!loading) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] bg-white flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${fadeOut ? 'opacity-0' : 'opacity-100'
                }`}
        >
            <div
                className={`text-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${fadeOut ? 'scale-90 translate-y-8' : 'scale-100 translate-y-0'
                    }`}
            >
                {/* Logo/Name with letter-by-letter reveal */}
                <div className="overflow-hidden mb-6">
                    <div className="flex items-center justify-center">
                        {letters.map((letter, index) => (
                            <span
                                key={index}
                                className={`text-4xl md:text-6xl font-normal tracking-tight inline-block transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${letter === '.' ? 'text-[var(--text-muted)]' : ''
                                    } ${fadeOut
                                        ? 'opacity-0 translate-y-12 scale-75'
                                        : showLetters
                                            ? 'opacity-100 translate-y-0 scale-100'
                                            : 'opacity-0 translate-y-8'
                                    }`}
                                style={{
                                    transitionDelay: fadeOut
                                        ? `${(letters.length - 1 - index) * 30}ms`
                                        : `${index * 60}ms`
                                }}
                            >
                                {letter}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Loading bar */}
                <div
                    className={`w-48 h-0.5 bg-[var(--border)] rounded-full overflow-hidden mx-auto transition-all duration-500 ${fadeOut ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                        }`}
                >
                    <div
                        className="h-full bg-[var(--accent)] rounded-full animate-loading-bar"
                    />
                </div>
            </div>
        </div>
    );
}
