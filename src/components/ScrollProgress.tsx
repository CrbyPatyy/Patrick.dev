'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);
    const rafRef = useRef<number | null>(null);
    const lastProgressRef = useRef(0);

    const updateProgress = useCallback(() => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const newProgress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;

        // Only update if progress changed significantly (avoid tiny fluctuations)
        if (Math.abs(newProgress - lastProgressRef.current) > 0.1) {
            lastProgressRef.current = newProgress;
            setProgress(newProgress);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            rafRef.current = requestAnimationFrame(updateProgress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        updateProgress();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [updateProgress]);

    return (
        <div
            className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Page scroll progress"
        >
            <div
                className="h-full bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 transition-all duration-150 ease-out"
                style={{
                    width: `${progress}%`,
                    boxShadow: '0 0 10px rgba(0,0,0,0.3)'
                }}
            />
        </div>
    );
}

