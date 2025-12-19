'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollSectionProps {
    children: ReactNode;
    className?: string;
    animation?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale' | 'blur';
    delay?: number;
    duration?: number;
}

/**
 * Wrapper component that adds scroll-triggered entrance animations to sections
 */
export default function ScrollSection({
    children,
    className = '',
    animation = 'slide-up',
    delay = 0,
    duration = 1,
}: ScrollSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const element = sectionRef.current;

        // Set initial state based on animation type
        const getInitialState = () => {
            switch (animation) {
                case 'fade':
                    return { opacity: 0 };
                case 'slide-up':
                    return { opacity: 0, y: 80, rotateX: 5 };
                case 'slide-left':
                    return { opacity: 0, x: 100 };
                case 'slide-right':
                    return { opacity: 0, x: -100 };
                case 'scale':
                    return { opacity: 0, scale: 0.9 };
                case 'blur':
                    return { opacity: 0, filter: 'blur(20px)' };
                default:
                    return { opacity: 0, y: 80 };
            }
        };

        const getFinalState = () => {
            switch (animation) {
                case 'fade':
                    return { opacity: 1 };
                case 'slide-up':
                    return { opacity: 1, y: 0, rotateX: 0 };
                case 'slide-left':
                    return { opacity: 1, x: 0 };
                case 'slide-right':
                    return { opacity: 1, x: 0 };
                case 'scale':
                    return { opacity: 1, scale: 1 };
                case 'blur':
                    return { opacity: 1, filter: 'blur(0px)' };
                default:
                    return { opacity: 1, y: 0 };
            }
        };

        gsap.set(element, getInitialState());

        const tween = gsap.to(element, {
            ...getFinalState(),
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                end: 'top 20%',
                toggleActions: 'play none none reverse',
            },
        });

        return () => {
            tween.kill();
        };
    }, [animation, delay, duration]);

    return (
        <div
            ref={sectionRef}
            className={className}
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
            {children}
        </div>
    );
}

interface ParallaxSectionProps {
    children: ReactNode;
    className?: string;
    speed?: number;
}

/**
 * Section with parallax scrolling effect
 */
export function ParallaxSection({
    children,
    className = '',
    speed = 0.3,
}: ParallaxSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const element = sectionRef.current;

        const tween = gsap.to(element, {
            y: () => speed * 200,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            },
        });

        return () => {
            tween.kill();
        };
    }, [speed]);

    return (
        <div ref={sectionRef} className={className}>
            {children}
        </div>
    );
}

interface RevealOnScrollProps {
    children: ReactNode;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right';
    distance?: number;
}

/**
 * Simple reveal animation that plays once on scroll
 */
export function RevealOnScroll({
    children,
    className = '',
    direction = 'up',
    distance = 60,
}: RevealOnScrollProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;

        const getAxis = () => {
            switch (direction) {
                case 'up': return { y: distance };
                case 'down': return { y: -distance };
                case 'left': return { x: distance };
                case 'right': return { x: -distance };
            }
        };

        gsap.set(element, { opacity: 0, ...getAxis() });

        const tween = gsap.to(element, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                once: true,
            },
        });

        return () => {
            tween.kill();
        };
    }, [direction, distance]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
