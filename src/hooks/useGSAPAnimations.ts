'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin once
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface UseGSAPRevealOptions {
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number;
    duration?: number;
    delay?: number;
    start?: string;
    stagger?: number;
}

/**
 * Hook for GSAP scroll-triggered reveal animations
 * @returns [ref, setupAnimation] - ref to attach to element, function to setup child animations
 */
export function useGSAPReveal<T extends HTMLElement>({
    direction = 'up',
    distance = 60,
    duration = 1,
    delay = 0,
    start = 'top 85%',
}: UseGSAPRevealOptions = {}) {
    const ref = useRef<T>(null);

    useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;

        // Initial state
        const getFromVars = () => {
            switch (direction) {
                case 'up': return { opacity: 0, y: distance };
                case 'down': return { opacity: 0, y: -distance };
                case 'left': return { opacity: 0, x: distance };
                case 'right': return { opacity: 0, x: -distance };
                case 'none': return { opacity: 0 };
            }
        };

        gsap.set(element, getFromVars());

        const animation = gsap.to(element, {
            opacity: 1,
            x: 0,
            y: 0,
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start,
                once: true,
            },
        });

        return () => {
            animation.kill();
        };
    }, [direction, distance, duration, delay, start]);

    return ref;
}

/**
 * Hook for staggered children animations on scroll
 */
export function useGSAPStagger<T extends HTMLElement>({
    childSelector = '.stagger-item',
    direction = 'up',
    distance = 40,
    duration = 0.8,
    stagger = 0.1,
    start = 'top 85%',
}: UseGSAPRevealOptions & { childSelector?: string } = {}) {
    const ref = useRef<T>(null);

    useEffect(() => {
        if (!ref.current) return;

        const container = ref.current;
        const children = container.querySelectorAll(childSelector);

        if (!children.length) return;

        const getFromVars = () => {
            switch (direction) {
                case 'up': return { opacity: 0, y: distance };
                case 'down': return { opacity: 0, y: -distance };
                case 'left': return { opacity: 0, x: distance };
                case 'right': return { opacity: 0, x: -distance };
                case 'none': return { opacity: 0 };
            }
        };

        gsap.set(children, getFromVars());

        const animation = gsap.to(children, {
            opacity: 1,
            x: 0,
            y: 0,
            duration,
            stagger,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: container,
                start,
                once: true,
            },
        });

        return () => {
            animation.kill();
        };
    }, [childSelector, direction, distance, duration, stagger, start]);

    return ref;
}

/**
 * Text reveal animation - splits text and animates each line
 */
export function useTextReveal<T extends HTMLElement>({
    duration = 1.2,
    stagger = 0.08,
    delay = 0,
    start = 'top 85%',
}: Omit<UseGSAPRevealOptions, 'direction' | 'distance'> = {}) {
    const ref = useRef<T>(null);

    useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;
        const lines = element.querySelectorAll('.line');

        if (!lines.length) {
            // If no .line elements, animate the whole element
            gsap.set(element, { opacity: 0, y: 60, rotateX: -10 });

            const animation = gsap.to(element, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration,
                delay,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: element,
                    start,
                    once: true,
                },
            });

            return () => { animation.kill(); };
        }

        // Animate each line
        gsap.set(lines, { opacity: 0, y: '100%' });

        const animation = gsap.to(lines, {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            delay,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: element,
                start,
                once: true,
            },
        });

        return () => { animation.kill(); };
    }, [duration, stagger, delay, start]);

    return ref;
}

/**
 * Parallax effect on scroll
 */
export function useParallax<T extends HTMLElement>(speed: number = 0.5) {
    const ref = useRef<T>(null);

    useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;

        const animation = gsap.to(element, {
            y: () => speed * 100,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        });

        return () => { animation.kill(); };
    }, [speed]);

    return ref;
}
