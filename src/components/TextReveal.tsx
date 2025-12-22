'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
}

export default function TextReveal({ children, className = '', delay = 0 }: TextRevealProps) {
    const containerRef = useRef<HTMLSpanElement>(null);
    const wordsRef = useRef<HTMLSpanElement[]>([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || wordsRef.current.length === 0) return;

        // Set initial state
        gsap.set(wordsRef.current, {
            opacity: 0,
            y: 40,
            rotateX: -40,
        });

        // Create scroll trigger animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top 85%',
                end: 'top 60%',
                toggleActions: 'play none none reverse',
            },
            delay: delay / 1000,
        });

        tl.to(wordsRef.current, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power3.out',
        });

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger === container) st.kill();
            });
        };
    }, [delay, children]);

    const words = children.split(' ');

    return (
        <span ref={containerRef} className={`inline ${className}`} style={{ perspective: '1000px' }}>
            {words.map((word, i) => (
                <span
                    key={i}
                    ref={el => { if (el) wordsRef.current[i] = el; }}
                    className="inline-block mr-[0.25em]"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {word}
                </span>
            ))}
        </span>
    );
}
