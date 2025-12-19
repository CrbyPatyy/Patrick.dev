'use client';

import { useEffect, useRef } from 'react';

export default function InteractiveMesh() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Calculate normalized coordinates (-0.5 to 0.5)
            const x = (clientX / innerWidth) - 0.5;
            const y = (clientY / innerHeight) - 0.5;

            // Apply smooth movement to the mesh orbs
            const orbs = container.querySelectorAll('.mesh-orb');
            orbs.forEach((orb, index) => {
                const speed = 35 + (index * 15);
                const tx = x * speed;
                const ty = y * speed;
                const rotate = x * 20;
                (orb as HTMLElement).style.transform = `translate(${tx}px, ${ty}px) rotate(${rotate}deg)`;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Soft, large reactive mesh orbs - slightly more prominent */}
            <div
                className="mesh-orb absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full blur-[140px] opacity-[0.08]"
                style={{
                    background: 'radial-gradient(circle, var(--text-muted) 0%, transparent 60%)',
                    transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
            />
            <div
                className="mesh-orb absolute bottom-[-25%] right-[-15%] w-[70vw] h-[70vw] rounded-full blur-[120px] opacity-[0.06]"
                style={{
                    background: 'radial-gradient(circle, var(--text-secondary) 0%, transparent 65%)',
                    transition: 'transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
            />
            <div
                className="mesh-orb absolute top-[30%] right-[15%] w-[45vw] h-[45vw] rounded-full blur-[110px] opacity-[0.05]"
                style={{
                    background: 'radial-gradient(circle, var(--text-primary) 0%, transparent 70%)',
                    transition: 'transform 2.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
            />
        </div>
    );
}
