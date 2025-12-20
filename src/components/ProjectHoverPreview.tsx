'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ProjectHoverPreviewProps {
    activeId: number | null;
    projects: Array<{
        id: number;
        title: string;
        images?: string[];
    }>;
}

export default function ProjectHoverPreview({ activeId, projects }: ProjectHoverPreviewProps) {
    const previewRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: 0, y: 0 });
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX + 30, y: e.clientY + 30 };
        };

        const animate = () => {
            // Smooth lerp follow
            pos.current.x += (mouse.current.x - pos.current.x) * 0.1;
            pos.current.y += (mouse.current.y - pos.current.y) * 0.1;

            if (previewRef.current) {
                previewRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
            }

            requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Animate in/out based on activeId
    useEffect(() => {
        if (!imageContainerRef.current) return;

        if (activeId) {
            gsap.to(imageContainerRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: 'power3.out',
            });
        } else {
            gsap.to(imageContainerRef.current, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                ease: 'power3.in',
            });
        }
    }, [activeId]);

    const activeProject = projects.find(p => p.id === activeId);

    return (
        <div className="fixed inset-0 pointer-events-none z-[8888] overflow-hidden hidden lg:block">
            <div
                ref={previewRef}
                className="absolute top-0 left-0"
            >
                <div
                    ref={imageContainerRef}
                    className="w-72 h-44 rounded-xl overflow-hidden shadow-2xl"
                    style={{ opacity: 0, transform: 'scale(0.8)' }}
                >
                    {/* Preview container with image or gradient background */}
                    <div className="relative w-full h-full bg-neutral-900">
                        {/* Project Image */}
                        {activeProject?.images && activeProject.images.length > 0 ? (
                            <img
                                src={activeProject.images[0]}
                                alt={activeProject.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <>
                                {/* Fallback: Animated gradient background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black" />

                                {/* Project title overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span
                                        className="text-5xl font-medium text-white/10 uppercase tracking-widest"
                                        style={{ fontFamily: 'var(--font-bebas), sans-serif' }}
                                    >
                                        {activeProject?.title?.split(' ')[0]}
                                    </span>
                                </div>

                                {/* Shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
                            </>
                        )}

                        {/* Border glow */}
                        <div className="absolute inset-0 rounded-xl ring-1 ring-white/10" />
                    </div>
                </div>
            </div>
        </div>
    );
}
