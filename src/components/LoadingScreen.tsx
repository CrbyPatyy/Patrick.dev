'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LoadingScreen() {
    const [loading, setLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Check if already loaded this session
        if (sessionStorage.getItem('loaded')) {
            setLoading(false);
            window.dispatchEvent(new CustomEvent('loaderComplete'));
            return;
        }

        const container = containerRef.current;
        const counter = counterRef.current;
        const text = textRef.current;
        const line = lineRef.current;
        const progress = progressRef.current;

        if (!container || !counter || !text || !line || !progress) return;

        // Animate counter from 0 to 100
        const counterObj = { value: 0 };

        // Entry animation
        gsap.fromTo(text,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
        );

        gsap.fromTo(line,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: 'power2.inOut', delay: 0.4 }
        );

        // Counter animation
        gsap.to(counterObj, {
            value: 100,
            duration: 2,
            ease: 'power2.inOut',
            onUpdate: () => {
                const val = Math.round(counterObj.value);
                counter.textContent = String(val).padStart(3, '0');
                progress.style.width = `${val}%`;
            },
        });

        // Exit animation
        const exitTimeline = gsap.timeline({ delay: 2.3 });

        exitTimeline
            .to([counter, text], {
                y: -30,
                opacity: 0,
                duration: 0.5,
                ease: 'power3.in',
                stagger: 0.05,
            })
            .to(line, {
                scaleX: 0,
                duration: 0.4,
                ease: 'power2.in',
            }, '-=0.3')
            .to(container, {
                yPercent: -100,
                duration: 0.8,
                ease: 'power3.inOut',
                onStart: () => {
                    window.dispatchEvent(new CustomEvent('loaderComplete'));
                },
                onComplete: () => {
                    setLoading(false);
                    sessionStorage.setItem('loaded', 'true');
                },
            }, '-=0.2');

        return () => {
            exitTimeline.kill();
        };
    }, []);

    if (!loading) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] bg-neutral-900 flex flex-col items-center justify-center"
        >
            {/* Logo/Name */}
            <div
                ref={textRef}
                className="absolute top-8 left-8 text-white/80 text-sm tracking-widest uppercase"
            >
                Patrick<span className="text-white/40">.</span>
            </div>

            {/* Counter */}
            <div className="relative">
                <span
                    ref={counterRef}
                    className="text-[clamp(5rem,20vw,12rem)] font-light text-white tracking-tighter tabular-nums"
                    style={{ fontFamily: 'var(--font-bebas), sans-serif' }}
                >
                    000
                </span>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                <div
                    ref={progressRef}
                    className="h-full bg-white origin-left"
                    style={{ width: '0%' }}
                />
            </div>

            {/* Bottom text */}
            <div
                ref={lineRef}
                className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-white/50 text-xs uppercase tracking-widest origin-left"
            >
                <span>Loading</span>
                <span>Portfolio 2025</span>
            </div>
        </div>
    );
}
