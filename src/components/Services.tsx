'use client';

import { useState, useRef, useEffect } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const services = [
    {
        id: 1,
        title: 'Business Data Analyst',
        description: 'Transform raw data into actionable insights that drive business decisions. I help businesses leverage their data through comprehensive analysis, visualization, and strategic recommendations that lead to measurable improvements.'
    },
    {
        id: 2,
        title: 'Business Website',
        description: 'Professional websites that establish your online presence and attract customers. From e-commerce platforms to corporate sites, I create responsive, SEO-optimized websites that convert visitors into clients.'
    },
    {
        id: 3,
        title: 'Portfolio Sites',
        description: 'Stunning portfolios that showcase your work and make you stand out. Perfect for creatives, freelancers, and professionals who want to make a lasting impression with a unique, personalized online presence.'
    },
    {
        id: 4,
        title: 'Landing Pages',
        description: 'High-converting pages designed to capture leads and drive action. Using proven design principles and A/B testing strategies, I create landing pages that maximize your marketing ROI.'
    },
];

export default function Services() {
    const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>();
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <section id="services" className="py-24 lg:py-32 bg-[var(--bg-secondary)]">
            <div className="container max-w-6xl">
                {/* Header */}
                <div
                    ref={headerRef}
                    className={`pb-8 border-b border-[var(--border)] transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                >
                    <p className="section-label">What I Offer</p>
                </div>

                {/* Service list - stacked vertically with dividers */}
                <div className="divide-y divide-[var(--border)]">
                    {services.map((service, index) => (
                        <ServiceItem
                            key={service.id}
                            service={service}
                            index={index}
                            isHovered={hoveredId === service.id}
                            onHover={() => setHoveredId(service.id)}
                            onLeave={() => setHoveredId(null)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface ServiceItemProps {
    service: typeof services[0];
    index: number;
    isHovered: boolean;
    onHover: () => void;
    onLeave: () => void;
}

function ServiceItem({ service, index, isHovered, onHover, onLeave }: ServiceItemProps) {
    const [ref, visible] = useScrollReveal<HTMLDivElement>();
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, []);

    return (
        <div
            ref={ref}
            className={`service-item py-6 lg:py-8 cursor-default transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            onTouchStart={onHover}
        >
            <div className="flex items-center gap-4 md:gap-8">
                {/* Number badge */}
                <div className="flex-shrink-0">
                    <span className={`service-number inline-flex items-center justify-center w-10 h-10 text-sm font-semibold rounded-full border transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isHovered ? 'bg-[var(--accent)] text-white border-[var(--accent)] scale-110' : 'bg-[var(--bg-primary)] text-[var(--text-muted)] border-[var(--border)]'}`}>
                        {String(service.id).padStart(2, '0')}
                    </span>
                </div>

                {/* Title */}
                <span
                    className={`flex-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isHovered ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}
                >
                    {service.title}
                </span>

                {/* Arrow indicator - points down when hovered */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isHovered ? 'border-[var(--accent)] bg-[var(--accent)] text-white' : 'border-[var(--border)] text-[var(--text-muted)]'}`}>
                    <svg
                        className={`w-5 h-5 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isHovered ? 'rotate-0' : 'rotate-180'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* Expandable description - smooth slide down on hover */}
            <div
                className="overflow-hidden"
                style={{
                    maxHeight: isHovered ? `${contentHeight}px` : '0px',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateY(0)' : 'translateY(-8px)',
                    transition: 'all 700ms cubic-bezier(0.22, 1, 0.36, 1)'
                }}
            >
                <div ref={contentRef} className="pt-6 pl-14 md:pl-[72px]">
                    <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                        {service.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
