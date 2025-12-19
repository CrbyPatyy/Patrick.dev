'use client';

import { useEffect, useRef, useState } from 'react';

interface StaggerTextProps {
    text: string;
    className?: string;
    tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
    delay?: number;
}

export default function StaggerText({
    text,
    className = '',
    tag: Tag = 'span',
    delay = 0
}: StaggerTextProps) {
    const ref = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    // Character-by-character animation for wow factor
    const chars = text.split('');

    return (
        <Tag
            ref={ref as React.RefObject<HTMLHeadingElement>}
            className={className}
            style={{ display: 'inline-block' }}
        >
            {chars.map((char, index) => (
                <span
                    key={index}
                    style={{
                        display: 'inline-block',
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                        transitionDelay: isVisible ? `${delay + index * 40}ms` : '0ms',
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </Tag>
    );
}
