'use client';

import { useEffect, useState, useRef } from 'react';
import InteractiveMesh from './InteractiveMesh';
import MagneticText from './MagneticText';

export default function Hero() {
    const [loaded, setLoaded] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

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

        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const progress = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.5)));
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('loaderComplete', handleLoaderComplete);
        };
    }, []);


    return (
        <section ref={sectionRef} className="min-h-[150vh] relative">
            {/* Dynamic Mesh Background */}
            <InteractiveMesh />

            {/* Fixed content that animates on scroll with PARALLAX */}
            <div
                className="sticky top-0 min-h-screen flex flex-col justify-between py-24 lg:py-32"
                style={{
                    opacity: 1 - scrollProgress * 1.5,
                }}
            >
                {/* Top - LET'S BUILD + Get in touch (inline) - Slow parallax */}
                <div
                    className="container"
                    style={{
                        transform: `translateY(${scrollProgress * -20}px)`,
                    }}
                >
                    <div className="flex items-center gap-4 lg:gap-8 flex-wrap">
                        {/* Masked reveal container */}
                        <div className="overflow-hidden">
                            <h1
                                className={`text-[clamp(3rem,15vw,14rem)] font-medium uppercase tracking-tighter leading-[0.85] transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${loaded ? 'translate-y-0' : 'translate-y-[110%]'
                                    }`}
                                style={{
                                    transitionDelay: '0s',
                                    fontFamily: 'var(--font-bebas), sans-serif',
                                }}
                            >
                                <span className="text-neutral-900">Let's Build</span>
                            </h1>
                        </div>

                        {/* Get in touch */}
                        <div className="overflow-hidden">
                            <div
                                className={`transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${loaded ? 'translate-y-0' : 'translate-y-[110%]'
                                    }`}
                                style={{ transitionDelay: '0.15s' }}
                            >
                                <a href="#contact" className="group flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors">
                                    <MagneticText text="Get in touch" className="!px-0 !py-0 text-base lg:text-lg font-medium" />
                                    <span className="text-neutral-400 group-hover:translate-x-1 transition-transform">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle - SOMETHING (centered) - Medium parallax */}
                <div
                    className="container"
                    style={{
                        transform: `translateY(${scrollProgress * -35}px)`,
                    }}
                >
                    <div className="flex justify-center">
                        <div className="overflow-hidden">
                            <h1
                                className={`text-[clamp(3rem,15vw,14rem)] font-medium uppercase tracking-tighter leading-[0.85] transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] text-center ${loaded ? 'translate-y-0' : 'translate-y-[110%]'
                                    }`}
                                style={{
                                    transitionDelay: '0.1s',
                                    fontFamily: 'var(--font-bebas), sans-serif',
                                }}
                            >
                                <span className="text-neutral-900">Something</span>
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Bottom - View projects + AMAZING (right aligned) - Fast parallax */}
                <div
                    className="container"
                    style={{
                        transform: `translateY(${scrollProgress * -50}px)`,
                    }}
                >
                    <div className="flex items-center justify-end gap-4 lg:gap-8 flex-wrap-reverse">
                        {/* View projects */}
                        <div className="overflow-hidden">
                            <div
                                className={`transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${loaded ? 'translate-y-0' : 'translate-y-[110%]'
                                    }`}
                                style={{ transitionDelay: '0.25s' }}
                            >
                                <a href="#projects" className="group flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors">
                                    <span className="text-neutral-400 group-hover:-translate-x-1 transition-transform">←</span>
                                    <MagneticText text="View projects" className="!px-0 !py-0 text-base lg:text-lg font-medium" />
                                </a>
                            </div>
                        </div>

                        {/* AMAZING */}
                        <div className="overflow-hidden">
                            <h1
                                className={`text-[clamp(3rem,15vw,14rem)] font-medium uppercase tracking-tighter leading-[0.85] transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] text-right ${loaded ? 'translate-y-0' : 'translate-y-[110%]'
                                    }`}
                                style={{
                                    transitionDelay: '0.2s',
                                    fontFamily: 'var(--font-bebas), sans-serif',
                                }}
                            >
                                <span className="text-neutral-900">Amazing</span>
                                <span className="text-neutral-300">.</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-500"
                style={{ opacity: loaded && scrollProgress < 0.5 ? 1 : 0 }}
            >
                <div className="flex flex-col items-center gap-3 text-neutral-400">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll</span>
                    <div className="w-5 h-8 rounded-full border border-neutral-300 flex items-start justify-center p-1.5">
                        <div className="w-1 h-2 bg-neutral-400 rounded-full animate-bounce" />
                    </div>
                </div>
            </div>
        </section>
    );
}
