'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import MagneticText from './MagneticText';

export default function About() {
    const [ref, visible] = useScrollReveal<HTMLDivElement>();

    const stack = [
        { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind'] },
        { category: 'Backend', items: ['Node.js', 'Supabase (PostgreSQL)'] },
        { category: 'Tools', items: ['Git', 'Figma', 'VS Code'] },
    ];

    return (
        <section id="about" className="min-h-screen flex items-center py-28 lg:py-40 bg-[var(--bg-secondary)]">
            <div className="container">
                <div ref={ref} className={`grid lg:grid-cols-12 gap-16 lg:gap-24 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="lg:col-span-7">
                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-[0.2em] mb-6">About Me</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.15] tracking-tight mb-8">
                            I build digital products that are{' '}<span className="text-[var(--text-muted)]">intuitive, performant,</span>{' '}and designed to scale.
                        </h2>
                        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl mb-12">
                            With experience across the full development stack, I focus on creating seamless user experiences backed by clean, maintainable code. Currently based in Manila, available worldwide.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="#contact" className="btn btn-primary !p-0">
                                <MagneticText text="Work with me" className="!px-8 !py-4" />
                            </a>
                            <a href="/Patrick%20Villanueva%20Resume.pdf" target="_blank" className="btn btn-secondary !p-0">
                                <MagneticText text="Download CV" className="!px-8 !py-4" />
                            </a>
                        </div>
                    </div>
                    <div className="lg:col-span-5">
                        <div className="lg:pl-8 lg:border-l border-[var(--border)]">
                            <p className="text-xs text-[var(--text-muted)] uppercase tracking-[0.2em] mb-8">Tech Stack</p>
                            <div className="space-y-8">
                                {stack.map((group, groupIdx) => (
                                    <div key={group.category} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${300 + groupIdx * 100}ms` }}>
                                        <p className="text-sm text-[var(--text-muted)] mb-4">{group.category}</p>
                                        <div className="flex flex-wrap gap-3">
                                            {group.items.map((item) => (
                                                <span key={item} className="px-4 py-2 text-sm bg-white border border-[var(--border)] rounded-full hover:border-[var(--border-hover)] transition-colors">{item}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
