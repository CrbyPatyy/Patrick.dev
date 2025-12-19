'use client';

import { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface SplitTextProps {
    children: string;
    className?: string;
    delay?: number;
    stagger?: number;
    duration?: number;
    trigger?: 'load' | 'scroll' | 'hover';
    animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'blur' | 'scale';
}

export function SplitText({
    children,
    className = '',
    delay = 0,
    stagger = 0.03,
    duration = 0.8,
    trigger = 'scroll',
    animation = 'fade-up'
}: SplitTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!containerRef.current || hasAnimated.current) return;

        const chars = containerRef.current.querySelectorAll('.char');
        if (!chars.length) return;

        // Initial state based on animation type
        const getInitialState = () => {
            switch (animation) {
                case 'fade-up':
                    return { opacity: 0, y: 60, rotateX: -45 };
                case 'fade-down':
                    return { opacity: 0, y: -60, rotateX: 45 };
                case 'fade-left':
                    return { opacity: 0, x: 40 };
                case 'fade-right':
                    return { opacity: 0, x: -40 };
                case 'blur':
                    return { opacity: 0, filter: 'blur(10px)' };
                case 'scale':
                    return { opacity: 0, scale: 0.5 };
                default:
                    return { opacity: 0, y: 60 };
            }
        };

        const getFinalState = () => {
            switch (animation) {
                case 'fade-up':
                case 'fade-down':
                    return { opacity: 1, y: 0, rotateX: 0 };
                case 'fade-left':
                case 'fade-right':
                    return { opacity: 1, x: 0 };
                case 'blur':
                    return { opacity: 1, filter: 'blur(0px)' };
                case 'scale':
                    return { opacity: 1, scale: 1 };
                default:
                    return { opacity: 1, y: 0 };
            }
        };

        gsap.set(chars, getInitialState());

        if (trigger === 'scroll') {
            gsap.to(chars, {
                ...getFinalState(),
                duration,
                stagger,
                delay,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 85%',
                    once: true,
                },
            });
        } else if (trigger === 'load') {
            // Wait for loader to complete
            const handleLoaderComplete = () => {
                hasAnimated.current = true;
                gsap.to(chars, {
                    ...getFinalState(),
                    duration,
                    stagger,
                    delay,
                    ease: 'power4.out',
                });
            };

            if (sessionStorage.getItem('loaded')) {
                handleLoaderComplete();
            } else {
                window.addEventListener('loaderComplete', handleLoaderComplete);
                return () => window.removeEventListener('loaderComplete', handleLoaderComplete);
            }
        }
    }, [animation, delay, duration, stagger, trigger]);

    // Split text into individual characters
    const words = children.split(' ');

    return (
        <div
            ref={containerRef}
            className={`split-text ${className}`}
            style={{ perspective: '1000px' }}
            aria-label={children}
        >
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="word inline-block whitespace-nowrap">
                    {word.split('').map((char, charIndex) => (
                        <span
                            key={charIndex}
                            className="char inline-block"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {char}
                        </span>
                    ))}
                    {wordIndex < words.length - 1 && <span className="char inline-block">&nbsp;</span>}
                </span>
            ))}
        </div>
    );
}

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
}

export function Reveal({
    children,
    className = '',
    delay = 0,
    duration = 1,
    direction = 'up'
}: RevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const getDirection = () => {
            switch (direction) {
                case 'up': return { y: 80 };
                case 'down': return { y: -80 };
                case 'left': return { x: 80 };
                case 'right': return { x: -80 };
            }
        };

        gsap.fromTo(
            containerRef.current,
            { opacity: 0, ...getDirection() },
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration,
                delay,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 85%',
                    once: true,
                },
            }
        );
    }, [delay, direction, duration]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}

interface ParallaxProps {
    children: ReactNode;
    className?: string;
    speed?: number;
}

export function Parallax({ children, className = '', speed = 0.5 }: ParallaxProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        gsap.to(containerRef.current, {
            y: () => speed * 100,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        });
    }, [speed]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}

interface ImageRevealProps {
    src: string;
    alt: string;
    className?: string;
    delay?: number;
}

export function ImageReveal({ src, alt, className = '', delay = 0 }: ImageRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!containerRef.current || !overlayRef.current || !imageRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                once: true,
            },
        });

        tl.set(imageRef.current, { scale: 1.3 })
            .to(overlayRef.current, {
                scaleY: 0,
                transformOrigin: 'top',
                duration: 1.2,
                delay,
                ease: 'power4.inOut',
            })
            .to(
                imageRef.current,
                {
                    scale: 1,
                    duration: 1.4,
                    ease: 'power3.out',
                },
                '-=0.8'
            );
    }, [delay]);

    return (
        <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-[var(--bg-primary)] z-10"
                style={{ transformOrigin: 'bottom' }}
            />
            <img
                ref={imageRef}
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
            />
        </div>
    );
}

interface MagneticProps {
    children: ReactNode;
    className?: string;
    strength?: number;
}

export function Magnetic({ children, className = '', strength = 0.35 }: MagneticProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(container, {
                x: x * strength,
                y: y * strength,
                duration: 0.4,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(container, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: 'elastic.out(1, 0.3)',
            });
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);

    return (
        <div ref={containerRef} className={`inline-block ${className}`}>
            {children}
        </div>
    );
}

interface HorizontalScrollProps {
    children: ReactNode;
    className?: string;
}

export function HorizontalScroll({ children, className = '' }: HorizontalScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !scrollRef.current) return;

        const scrollWidth = scrollRef.current.scrollWidth;
        const containerWidth = containerRef.current.offsetWidth;

        gsap.to(scrollRef.current, {
            x: () => -(scrollWidth - containerWidth),
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: () => `+=${scrollWidth - containerWidth}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            },
        });
    }, []);

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`}>
            <div ref={scrollRef} className="flex">
                {children}
            </div>
        </div>
    );
}

interface TextMarqueeProps {
    children: string;
    className?: string;
    speed?: number;
    direction?: 'left' | 'right';
}

export function TextMarquee({
    children,
    className = '',
    speed = 50,
    direction = 'left'
}: TextMarqueeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !textRef.current) return;

        const textWidth = textRef.current.offsetWidth;
        const directionMultiplier = direction === 'left' ? -1 : 1;

        gsap.to(textRef.current, {
            x: directionMultiplier * textWidth,
            duration: textWidth / speed,
            ease: 'none',
            repeat: -1,
        });
    }, [direction, speed]);

    const repeatedText = `${children} • `.repeat(10);

    return (
        <div ref={containerRef} className={`overflow-hidden whitespace-nowrap ${className}`}>
            <div ref={textRef} className="inline-block">
                {repeatedText}
            </div>
        </div>
    );
}
