'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '@/data/experience';
import MagneticText from './MagneticText';
import StaggerText from './StaggerText';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const [headerVisible, setHeaderVisible] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;
        const timeline = timelineRef.current;
        const cards = cardsRef.current.filter(Boolean);

        if (!section || !timeline || cards.length === 0) return;

        // Header reveal
        ScrollTrigger.create({
            trigger: headerRef.current,
            start: 'top 80%',
            onEnter: () => setHeaderVisible(true),
        });

        // Timeline progress animation
        gsap.fromTo(timeline,
            { scaleY: 0 },
            {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 60%',
                    end: 'bottom 40%',
                    scrub: 1,
                }
            }
        );

        // Card animations - staggered reveal on scroll
        cards.forEach((card, index) => {
            gsap.fromTo(card,
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        end: 'top 50%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <section ref={sectionRef} id="experience" className="py-24 lg:py-32 relative">
            <div className="container max-w-7xl">
                {/* Header */}
                <div
                    ref={headerRef}
                    className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                >
                    <div>
                        <p className="section-label mb-6">Career Path</p>
                        <h2 className="heading-section">
                            {headerVisible ? <StaggerText text="Work" delay={0} /> : "Work"}<br />
                            {headerVisible ? <StaggerText text="Experience" delay={200} /> : "Experience"}
                        </h2>
                    </div>
                    <a href="/Patrick%20Villanueva%20Resume.pdf" target="_blank" className="btn btn-secondary !p-0">
                        <MagneticText text="View Full Résumé →" className="!px-6 !py-3" />
                    </a>
                </div>

                {/* Experience cards with timeline */}
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[2px] bg-[var(--border)]">
                        <div
                            ref={timelineRef}
                            className="absolute inset-0 bg-[var(--accent)] origin-top"
                            style={{ transformOrigin: 'top' }}
                        />
                    </div>

                    {/* Cards */}
                    <div className="space-y-8 lg:space-y-12">
                        {experience.map((item, index) => (
                            <div
                                key={item.id}
                                ref={el => { if (el) cardsRef.current[index] = el; }}
                                className="relative pl-12 md:pl-20"
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-0 md:left-4 top-3 w-8 h-8 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--border)] flex items-center justify-center z-10 transition-all duration-500 group-hover:border-[var(--accent)]">
                                    <div className="w-3 h-3 rounded-full bg-[var(--accent)]" />
                                </div>

                                {/* Card */}
                                <div className="group p-6 lg:p-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] hover:border-[var(--border-hover)] hover:shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                    <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                                        {/* Period */}
                                        <div className="lg:w-32 flex-shrink-0">
                                            <span className="font-mono text-sm text-[var(--text-muted)] uppercase tracking-wide">{item.period}</span>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <h3 className="text-2xl md:text-3xl font-normal mb-1 group-hover:translate-x-2 transition-transform duration-500">{item.role}</h3>
                                            <p className="text-[var(--text-secondary)] text-lg mb-4">{item.company}</p>
                                            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">{item.description}</p>

                                            {/* Tech tags */}
                                            <div className="flex flex-wrap gap-2">
                                                {item.technologies.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="text-xs border border-[var(--border)] px-3 py-1.5 rounded-full text-[var(--text-muted)] bg-[var(--bg-secondary)] hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all duration-300 cursor-default"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
