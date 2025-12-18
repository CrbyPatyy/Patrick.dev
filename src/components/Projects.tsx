'use client';

import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { projects } from '@/data/projects';
import MagneticText from './MagneticText';

export default function Projects() {
    const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>();

    return (
        <section id="projects" className="min-h-screen flex items-center py-28 lg:py-40">
            <div className="container">
                <div ref={headerRef} className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
                    <div>
                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-[0.2em] mb-4">Featured Work</p>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight">Selected<br />Projects</h2>
                    </div>
                    <a href="https://github.com/CrbyPatyy" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-secondary)]" aria-label="View all projects on GitHub">
                        <MagneticText text="View archive →" className="!px-0 !py-0" />
                    </a>
                </div>
                <div className="space-y-6 sm:space-y-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
    const [ref, visible] = useScrollReveal<HTMLDivElement>();
    const isComingSoon = project.status === 'Coming Soon';

    return (
        <div ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${index * 100}ms` }}>
            <Link
                href={`/projects/${project.slug}`}
                className={`project-card group block rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isComingSoon ? 'opacity-75 hover:opacity-100' : ''}`}
                aria-label={`View details for ${project.title}`}
            >
                <div className="grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 p-6 sm:p-8 lg:p-10">
                    <div className="lg:col-span-1 flex items-start">
                        <span className="text-sm text-[var(--text-muted)] font-mono">{String(project.id).padStart(2, '0')}</span>
                    </div>
                    <div className="lg:col-span-6">
                        <div className="flex items-center gap-3 mb-3">
                            <h3 className={`text-2xl lg:text-3xl font-normal tracking-tight group-hover:translate-x-3 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isComingSoon ? 'text-[var(--text-secondary)]' : ''}`}>{project.title}</h3>
                            {isComingSoon && (
                                <span className="inline-flex items-center gap-1.5 text-xs text-amber-600 px-2.5 py-1 rounded-full bg-amber-500/10">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>Soon
                                </span>
                            )}
                        </div>
                        <p className="text-[var(--text-secondary)] leading-relaxed group-hover:text-[var(--text-primary)] transition-colors duration-500">{project.description}</p>
                    </div>
                    <div className="lg:col-span-3 flex items-center">
                        <span className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors duration-500">{project.category}</span>
                    </div>
                    <div className="lg:col-span-2 flex items-center justify-between lg:justify-end gap-4">
                        <span className="text-sm text-[var(--text-muted)]">{project.year}</span>
                        <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isComingSoon ? 'border-amber-300 group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:text-white' : 'border-[var(--border)] group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] group-hover:text-white group-hover:scale-110'}`}>
                            <svg className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
