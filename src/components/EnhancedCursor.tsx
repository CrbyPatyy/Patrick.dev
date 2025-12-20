'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

export default function EnhancedCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: 0, y: 0 });
    const mouse = useRef({ x: 0, y: 0 });

    // Memoized function to check if element is interactive
    const getInteractiveState = useCallback((target: HTMLElement) => {
        // Check for cursor text
        const cursorText = target.dataset.cursorText ||
            target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');

        // Check if it's a link or button
        const isLink = target.tagName === 'A' ||
            target.tagName === 'BUTTON' ||
            target.closest('a') ||
            target.closest('button') ||
            target.classList.contains('cursor-pointer') ||
            target.classList.contains('btn') ||
            target.closest('.btn');

        // Check if on dark background
        const isDark = target.classList.contains('btn-primary') ||
            target.closest('.btn-primary') ||
            target.classList.contains('bg-neutral-900') ||
            target.closest('.bg-neutral-900');

        // Check if on light background (white buttons)
        const isLight = target.dataset.lightBg === 'true' ||
            target.closest('[data-light-bg="true"]');

        return { cursorText, isLink, isDark, isLight };
    }, []);

    useEffect(() => {
        const cursor = cursorRef.current;
        const dot = dotRef.current;
        const text = textRef.current;
        const ring = ringRef.current;

        if (!cursor || !dot || !ring) return;

        let animationId: number;

        // Smooth cursor follow
        const animate = () => {
            pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
            pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

            cursor.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
            dot.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;

            animationId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };

            const target = e.target as HTMLElement;
            const { cursorText, isLink, isDark, isLight } = getInteractiveState(target);

            if (cursorText && text) {
                // Show text mode
                if (text.textContent !== cursorText) {
                    text.textContent = cursorText;
                }
                gsap.to(ring, {
                    width: 80,
                    height: 80,
                    marginLeft: -40,
                    marginTop: -40,
                    duration: 0.4,
                    ease: 'power2.out',
                    overwrite: true,
                });
                gsap.to(text, { opacity: 1, duration: 0.2, overwrite: true });
                gsap.to(dot, { opacity: 0, duration: 0.2, overwrite: true });
            } else if (isLink) {
                // Hover mode - LARGER expansion
                gsap.to(ring, {
                    width: 60,
                    height: 60,
                    marginLeft: -30,
                    marginTop: -30,
                    duration: 0.4,
                    ease: 'power2.out',
                    overwrite: true,
                });
                if (text) gsap.to(text, { opacity: 0, duration: 0.2, overwrite: true });
                gsap.to(dot, { opacity: 1, scale: 1.5, duration: 0.2, overwrite: true });
            } else {
                // Default state
                gsap.to(ring, {
                    width: 40,
                    height: 40,
                    marginLeft: -20,
                    marginTop: -20,
                    duration: 0.4,
                    ease: 'power2.out',
                    overwrite: true,
                });
                if (text) gsap.to(text, { opacity: 0, duration: 0.2, overwrite: true });
                gsap.to(dot, { opacity: 1, scale: 1, duration: 0.2, overwrite: true });
            }

            // Handle dark backgrounds with blend mode
            if (isDark) {
                cursor.classList.add('inverted');
                dot.classList.add('inverted');
                cursor.classList.remove('light');
                dot.classList.remove('light');
            } else if (isLight) {
                // Handle light backgrounds - make cursor black
                cursor.classList.add('light');
                dot.classList.add('light');
                cursor.classList.remove('inverted');
                dot.classList.remove('inverted');
            } else {
                cursor.classList.remove('inverted');
                dot.classList.remove('inverted');
                cursor.classList.remove('light');
                dot.classList.remove('light');
            }
        };

        const handleMouseDown = () => {
            // Squeeze effect on click
            gsap.to(ring, {
                scale: 0.7,
                duration: 0.1,
                ease: 'power2.out',
            });
            gsap.to(dot, {
                scale: 0.5,
                duration: 0.1,
                ease: 'power2.out',
            });
        };

        const handleMouseUp = () => {
            // Spring back with elastic ease
            gsap.to(ring, {
                scale: 1,
                duration: 0.6,
                ease: 'elastic.out(1, 0.3)',
            });
            gsap.to(dot, {
                scale: 1,
                duration: 0.6,
                ease: 'elastic.out(1, 0.3)',
            });
        };

        const handleWindowLeave = () => {
            gsap.to([cursor, dot], { opacity: 0, duration: 0.2 });
        };

        const handleWindowEnter = () => {
            gsap.to([cursor, dot], { opacity: 1, duration: 0.2 });
        };

        // Initial visibility
        gsap.set([cursor, dot], { opacity: 1 });

        // Start animation loop
        animationId = requestAnimationFrame(animate);

        // Event listeners
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.documentElement.addEventListener('mouseleave', handleWindowLeave);
        document.documentElement.addEventListener('mouseenter', handleWindowEnter);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.documentElement.removeEventListener('mouseleave', handleWindowLeave);
            document.documentElement.removeEventListener('mouseenter', handleWindowEnter);
        };
    }, [getInteractiveState]);

    return (
        <>
            {/* Cursor ring */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:flex items-center justify-center"
                style={{ opacity: 0 }}
            >
                <div
                    ref={ringRef}
                    className="cursor-ring w-10 h-10 -ml-5 -mt-5 rounded-full border border-white/40 flex items-center justify-center transition-colors duration-200"
                >
                    <span
                        ref={textRef}
                        className="text-[9px] font-semibold uppercase tracking-wider opacity-0"
                    />
                </div>
            </div>

            {/* Cursor dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
                style={{ opacity: 0 }}
            >
                <div className="cursor-dot w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-white transition-colors duration-200" />
            </div>

            <style jsx global>{`
                @media (min-width: 768px) {
                    * {
                        cursor: none !important;
                    }
                }

                .inverted .cursor-ring {
                    border-color: rgba(255, 255, 255, 0.6);
                    mix-blend-mode: difference;
                }

                .inverted .cursor-ring span {
                    color: white;
                }

                .inverted .cursor-dot {
                    background-color: white;
                    mix-blend-mode: difference;
                }

                .light .cursor-ring {
                    border-color: rgba(0, 0, 0, 0.8);
                }

                .light .cursor-ring span {
                    color: black;
                }

                .light .cursor-dot {
                    background-color: black;
                }
            `}</style>
        </>
    );
}
