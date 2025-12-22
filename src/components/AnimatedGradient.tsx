'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedGradient() {
    const gradientRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const gradient = gradientRef.current;
        if (!gradient) return;

        let animationId: number;
        let time = 0;

        const animate = () => {
            time += 0.002;

            // Create slowly shifting gradient positions
            const x1 = 50 + Math.sin(time) * 30;
            const y1 = 50 + Math.cos(time * 0.7) * 30;
            const x2 = 50 + Math.sin(time * 0.8 + 2) * 25;
            const y2 = 50 + Math.cos(time * 0.5 + 1) * 25;

            gradient.style.background = `
                radial-gradient(ellipse at ${x1}% ${y1}%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
                radial-gradient(ellipse at ${x2}% ${y2}%, rgba(139, 92, 246, 0.06) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, rgba(59, 130, 246, 0.04) 0%, transparent 40%)
            `;

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <div
            ref={gradientRef}
            className="fixed inset-0 z-[-1] pointer-events-none"
            style={{
                transition: 'background 0.3s ease-out',
            }}
        />
    );
}
