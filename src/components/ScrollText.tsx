'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

interface ScrollTextProps {
    children: React.ReactNode;
    className?: string;
}

export default function ScrollText({ children, className = '' }: ScrollTextProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({ opacity: 0, scale: 0.95, y: 30 });
    const lastStyleRef = useRef({ opacity: 0, scale: 0.95, y: 30 });
    const rafRef = useRef<number | null>(null);

    const handleScroll = useCallback(() => {
        const element = ref.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;

        const distanceFromCenter = elementCenter - viewportCenter;
        const maxDistance = windowHeight * 0.6;
        const normalizedDistance = distanceFromCenter / maxDistance;

        const opacity = Math.max(0, 1 - Math.abs(normalizedDistance) * 0.8);
        const scale = 0.95 + (1 - Math.abs(normalizedDistance)) * 0.05;
        const y = normalizedDistance * 30;

        // Only update if values changed significantly
        const last = lastStyleRef.current;
        if (
            Math.abs(opacity - last.opacity) > 0.01 ||
            Math.abs(scale - last.scale) > 0.001 ||
            Math.abs(y - last.y) > 0.5
        ) {
            lastStyleRef.current = { opacity, scale, y };
            setStyle({ opacity, scale, y });
        }
    }, []);

    useEffect(() => {
        const onScroll = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(handleScroll);
        };

        handleScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [handleScroll]);

    return (
        <div
            ref={ref}
            className={`section-screen ${className}`}
            style={{
                opacity: style.opacity,
                transform: `scale(${style.scale}) translateY(${style.y}px)`,
                transition: 'transform 0.1s ease-out',
            }}
        >
            <div className="container">
                <div className="scroll-text">
                    {children}
                </div>
            </div>
        </div>
    );
}

// Variant for statement text with highlighted words
export function ScrollStatement({
    primary,
    secondary
}: {
    primary: string;
    secondary?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({ opacity: 0, scale: 0.95, y: 30 });
    const lastStyleRef = useRef({ opacity: 0, scale: 0.95, y: 30 });
    const rafRef = useRef<number | null>(null);

    const handleScroll = useCallback(() => {
        const element = ref.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;

        const distanceFromCenter = elementCenter - viewportCenter;
        const maxDistance = windowHeight * 0.6;
        const normalizedDistance = distanceFromCenter / maxDistance;

        const opacity = Math.max(0, 1 - Math.abs(normalizedDistance) * 0.8);
        const scale = 0.95 + (1 - Math.abs(normalizedDistance)) * 0.05;
        const y = normalizedDistance * 30;

        // Only update if values changed significantly
        const last = lastStyleRef.current;
        if (
            Math.abs(opacity - last.opacity) > 0.01 ||
            Math.abs(scale - last.scale) > 0.001 ||
            Math.abs(y - last.y) > 0.5
        ) {
            lastStyleRef.current = { opacity, scale, y };
            setStyle({ opacity, scale, y });
        }
    }, []);

    useEffect(() => {
        const onScroll = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(handleScroll);
        };

        handleScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [handleScroll]);

    return (
        <div
            ref={ref}
            className="section-screen"
            style={{
                opacity: style.opacity,
                transform: `scale(${style.scale}) translateY(${style.y}px)`,
                transition: 'transform 0.1s ease-out',
            }}
        >
            <div className="container">
                <p className="scroll-text">
                    {primary}
                    {secondary && (
                        <span className="text-[var(--text-muted)]"> {secondary}</span>
                    )}
                </p>
            </div>
        </div>
    );
}

