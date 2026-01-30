'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useParallax } from '@/hooks/useParallax';
import MagneticText from './MagneticText';

export default function Hero() {
    const [loaded, setLoaded] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    // Parallax refs
    const { ref: topRef, style: topStyle } = useParallax<HTMLDivElement>({ speed: 0.05, direction: 'up' });
    const { ref: middleRef, style: middleStyle } = useParallax<HTMLDivElement>({ speed: 0.1, direction: 'up' });
    const { ref: bottomRef, style: bottomStyle } = useParallax<HTMLDivElement>({ speed: 0.15, direction: 'up' });
    const { ref: verticalNameRef, style: verticalNameStyle } = useParallax<HTMLDivElement>({ speed: 0.03, direction: 'down' });

    // Mouse tracking for spotlight effect
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    }, []);

    useEffect(() => {
        // Listen for loader complete event
        const handleLoaderComplete = () => {
            setLoaded(true);
        };

        window.addEventListener('loaderComplete', handleLoaderComplete);

        // Also check if loader already completed (e.g., session storage)
        if (sessionStorage.getItem('loaded')) {
            setLoaded(true);
        }

        // Mouse move listener
        const section = sectionRef.current;
        if (section) {
            section.addEventListener('mousemove', handleMouseMove);
            section.addEventListener('mouseenter', () => setIsHovering(true));
            section.addEventListener('mouseleave', () => setIsHovering(false));
        }

        return () => {
            window.removeEventListener('loaderComplete', handleLoaderComplete);
            if (section) {
                section.removeEventListener('mousemove', handleMouseMove);
                section.removeEventListener('mouseenter', () => setIsHovering(true));
                section.removeEventListener('mouseleave', () => setIsHovering(false));
            }
        };
    }, [handleMouseMove]);


    return (
        <section ref={sectionRef} className="min-h-[150vh] relative overflow-hidden">

            {/* Mouse-Following Spotlight */}
            <div
                className="absolute pointer-events-none transition-opacity duration-500 hidden lg:block"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.03), transparent 40%)`,
                    inset: 0,
                    opacity: isHovering ? 1 : 0,
                }}
            />

            {/* Fixed content that animates on scroll with PARALLAX */}
            <div className="sticky top-0 min-h-screen flex flex-col justify-between py-24 lg:py-32 overflow-hidden">

                {/* Vertical Name - Right Side Middle */}
                <div
                    ref={verticalNameRef}
                    className="absolute right-8 top-[40%] -translate-y-1/2 hidden lg:block z-10 mix-blend-difference"
                    style={verticalNameStyle}
                >
                    <h2
                        className={`text-sm tracking-[0.3em] font-medium text-[var(--text-muted)] transition-all duration-1000 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                    >
                        PATRICK VILLANUEVA
                    </h2>
                </div>

                {/* Top - LET'S BUILD + Get in touch (inline) - Slow parallax */}
                <div
                    ref={topRef}
                    className="container relative z-10"
                    style={topStyle}
                >
                    <div className="flex items-center gap-4 lg:gap-8 flex-wrap">
                        {/* Masked reveal container */}
                        <div className="overflow-hidden">
                            <h1
                                className={`hero-text-shimmer text-[clamp(3rem,15vw,14rem)] font-medium uppercase tracking-tighter leading-[0.85] transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${loaded ? 'translate-y-0' : 'translate-y-[110%]'
                                    }`}
                                style={{
                                    transitionDelay: '0s',
                                    fontFamily: 'var(--font-bebas), sans-serif',
                                }}
                            >
                                <span className="text-[var(--text-primary)]">Let's Build</span>
                            </h1>
                        </div>

                        {/* Get in touch */}
                        <div className="overflow-hidden">
                            <div
                                className={`transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${loaded ? 'translate-y-0' : 'translate-y-[110%]'
                                    }`}
                                style={{ transitionDelay: '0.15s' }}
                            >
                                <a href="#contact" className="group flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                                    <MagneticText text="Get in touch" className="!px-0 !py-0 text-base lg:text-lg font-medium" />
                                    <span className="text-[var(--text-muted)] group-hover:translate-x-1 transition-transform">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle - SOMETHING (centered) - Medium parallax */}
                <div
                    ref={middleRef}
                    className="container relative z-10"
                    style={middleStyle}
                >
                    <div className="flex justify-center">
                        <div className="overflow-hidden">
                            <h1
                                className={`hero-text-shimmer text-[clamp(3rem,15vw,14rem)] font-medium uppercase tracking-tighter leading-[0.85] transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] text-center ${loaded ? 'translate-y-0' : 'translate-y-[110%]'
                                    }`}
                                style={{
                                    transitionDelay: '0.1s',
                                    fontFamily: 'var(--font-bebas), sans-serif',
                                }}
                            >
                                <span className="text-[var(--text-primary)]">Something</span>
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Bottom - View projects + AMAZING (right aligned) - Fast parallax */}
                <div
                    ref={bottomRef}
                    className="container relative z-10"
                    style={bottomStyle}
                >
                    <div className="flex items-center justify-end gap-4 lg:gap-8 flex-wrap-reverse">
                        {/* View projects */}
                        <div className="overflow-hidden">
                            <div
                                className={`transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${loaded ? 'translate-y-0' : 'translate-y-[110%]'
                                    }`}
                                style={{ transitionDelay: '0.25s' }}
                            >
                                <a href="#projects" className="group flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                                    <span className="text-[var(--text-muted)] group-hover:-translate-x-1 transition-transform">←</span>
                                    <MagneticText text="View projects" className="!px-0 !py-0 text-base lg:text-lg font-medium" />
                                </a>
                            </div>
                        </div>

                        {/* AMAZING */}
                        <div className="overflow-hidden">
                            <h1
                                className={`hero-text-shimmer text-[clamp(3rem,15vw,14rem)] font-medium uppercase tracking-tighter leading-[0.85] transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] text-right ${loaded ? 'translate-y-0' : 'translate-y-[110%]'
                                    }`}
                                style={{
                                    transitionDelay: '0.2s',
                                    fontFamily: 'var(--font-bebas), sans-serif',
                                }}
                            >
                                <span className="text-[var(--text-primary)]">Amazing</span>
                                <span className="text-[var(--text-muted)] animate-pulse-dot">.</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Scroll Indicator */}
            <div
                className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-700 z-10 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: '0.6s' }}
            >
                <div className="flex flex-col items-center gap-3 text-[var(--text-secondary)]">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-medium animate-fade-pulse">Scroll</span>
                    <div className="relative w-6 h-10 rounded-full border border-[var(--border)] flex items-start justify-center p-2">
                        <div className="w-1 h-2 bg-[var(--accent)] rounded-full animate-scroll-indicator" />
                    </div>
                </div>
            </div>
        </section>
    );
}
