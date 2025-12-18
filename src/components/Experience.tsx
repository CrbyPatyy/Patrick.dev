'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { experience } from '@/data/experience';
import MagneticText from './MagneticText';

export default function Experience() {
    const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>();

    return (
        <section id="experience" className="min-h-screen flex items-center py-28 lg:py-40">
            <div className="container">
                <div ref={headerRef} className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
                    <div>
                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-[0.2em] mb-4">Career Path</p>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight">Work<br />Experience</h2>
                    </div>
                    <a href="/Patrick%20Villanueva%20Resume.pdf" target="_blank" className="btn btn-secondary !p-0">
                        <MagneticText text="View Full Résumé →" className="!px-6 !py-3" />
                    </a>
                </div>

                <div className="space-y-0">
                    {experience.map((item, index) => (
                        <ExperienceItem key={item.id} item={item} index={index} isLast={index === experience.length - 1} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ExperienceItem({ item, index, isLast }: { item: typeof experience[0]; index: number; isLast: boolean }) {
    const [ref, visible] = useScrollReveal<HTMLDivElement>();

    return (
        <div ref={ref} className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${index * 120}ms` }}>
            <div className={`group py-8 sm:py-10 lg:py-12 hover:bg-[var(--bg-secondary)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-xl ${!isLast ? 'border-b border-[var(--border)]' : ''}`}>
                <div className="grid md:grid-cols-12 gap-4 md:gap-8">
                    <div className="md:col-span-3 xl:col-span-2">
                        <span className="font-mono text-sm text-[var(--text-muted)] uppercase tracking-wide">{item.period}</span>
                    </div>
                    <div className="md:col-span-9 xl:col-span-10 grid lg:grid-cols-2 gap-4 lg:gap-8">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-normal mb-1 group-hover:translate-x-3 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">{item.role}</h3>
                            <p className="text-[var(--text-secondary)] text-lg mb-4 lg:mb-0">{item.company}</p>
                        </div>
                        <div>
                            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">{item.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {item.technologies.map(tech => (
                                    <span key={tech} className="text-xs border border-[var(--border)] px-3 py-1.5 rounded-full text-[var(--text-muted)] bg-[var(--bg-secondary)] hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all duration-300 cursor-default">{tech}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
