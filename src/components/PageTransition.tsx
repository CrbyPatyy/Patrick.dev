'use client';

import { createContext, useContext, useState, useCallback, useRef, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

interface TransitionContextType {
    startTransition: (href: string) => Promise<void>;
    isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export function usePageTransition() {
    const context = useContext(TransitionContext);
    if (!context) {
        throw new Error('usePageTransition must be used within PageTransitionProvider');
    }
    return context;
}

interface PageTransitionProviderProps {
    children: ReactNode;
}

export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    const startTransition = useCallback(async (href: string): Promise<void> => {
        if (isTransitioning || !overlayRef.current) return;

        // Don't transition to same page
        if (href === pathname) return;

        setIsTransitioning(true);
        const overlay = overlayRef.current;

        return new Promise((resolve) => {
            // Animate overlay in
            gsap.set(overlay, { yPercent: 100, display: 'flex' });

            gsap.to(overlay, {
                yPercent: 0,
                duration: 0.5,
                ease: 'power3.inOut',
                onComplete: () => {
                    // Navigate
                    window.location.href = href;
                    resolve();
                },
            });
        });
    }, [isTransitioning, pathname]);

    // Handle page load animation (exit)
    useEffect(() => {
        const overlay = overlayRef.current;
        if (!overlay) return;

        // Check if coming from a transition
        const wasTransitioning = sessionStorage.getItem('transitioning');

        if (wasTransitioning) {
            sessionStorage.removeItem('transitioning');

            // Show overlay then animate out
            gsap.set(overlay, { yPercent: 0, display: 'flex' });

            gsap.to(overlay, {
                yPercent: -100,
                duration: 0.5,
                delay: 0.2,
                ease: 'power3.inOut',
                onComplete: () => {
                    gsap.set(overlay, { display: 'none' });
                    setIsTransitioning(false);
                },
            });
        }
    }, []);

    // Set transitioning flag before navigation
    useEffect(() => {
        if (isTransitioning) {
            sessionStorage.setItem('transitioning', 'true');
        }
    }, [isTransitioning]);

    return (
        <TransitionContext.Provider value={{ startTransition, isTransitioning }}>
            {children}

            {/* Transition overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 z-[9998] bg-neutral-900 hidden items-center justify-center"
                style={{ transform: 'translateY(100%)' }}
            >
                <span
                    className="text-white text-2xl font-medium tracking-wider"
                    style={{ fontFamily: 'var(--font-bebas), sans-serif' }}
                >
                    Loading...
                </span>
            </div>
        </TransitionContext.Provider>
    );
}

// Link component that uses page transitions
interface TransitionLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export function TransitionLink({ href, children, className = '', onClick }: TransitionLinkProps) {
    const { startTransition, isTransitioning } = usePageTransition();

    const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Don't intercept external links or hash links
        if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) {
            return;
        }

        e.preventDefault();

        if (onClick) onClick();

        if (!isTransitioning) {
            await startTransition(href);
        }
    };

    return (
        <a href={href} onClick={handleClick} className={className}>
            {children}
        </a>
    );
}
