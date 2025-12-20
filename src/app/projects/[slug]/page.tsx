'use client';

import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProjectBySlug, projects } from '@/data/projects';

export default function ProjectPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const project = getProjectBySlug(slug);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!project) {
        notFound();
    }

    const isComingSoon = project.status === 'Coming Soon';

    // Coming Soon
    if (isComingSoon) {
        return (
            <main className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-6">
                <div className="w-full max-w-2xl border border-[var(--border)] p-12 text-center">
                    <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-6">Coming Soon</p>
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">Under Construction</h1>
                    <p className="text-[var(--text-secondary)] mb-8">This project is currently being built.</p>
                    <Link href="/#work" className="inline-block border-b border-current pb-0.5 hover:opacity-50 transition-opacity">
                        Back to Projects
                    </Link>
                </div>
            </main>
        );
    }

    // Navigation Logic
    const completedProjects = projects.filter(p => p.status === 'Completed');
    const currentCompletedIndex = completedProjects.findIndex(p => p.slug === slug);
    const nextProject = completedProjects.length > 1
        ? completedProjects[(currentCompletedIndex + 1) % completedProjects.length]
        : null;

    return (
        <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
            {/* Top Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center px-6 md:px-12 bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border)]">
                <div className="w-full flex justify-between items-center text-sm uppercase tracking-widest font-mono">
                    <Link href="/#work" className="hover:opacity-50 transition-opacity">
                        ← Index
                    </Link>
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                </div>
            </nav>

            <article className="pt-[200px] pb-20 px-6 md:px-12 max-w-[1600px] mx-auto" style={{ paddingTop: '200px' }}>

                {/* 1. Massive Title Section */}
                <header className={`mb-24 transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter leading-[0.9] mb-12">
                        {project.title}
                    </h1>
                    <div className="w-full h-px bg-[var(--border)]" />
                </header>

                {/* 2. Grid Layout: 1/3 Sidebar, 2/3 Content */}
                <div className={`grid md:grid-cols-12 gap-12 lg:gap-24 transition-opacity duration-1000 delay-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}>

                    {/* LEFT COLUMN: Metadata & Tech */}
                    <aside className="md:col-span-4 lg:col-span-3 space-y-12">

                        {/* Links */}
                        {(project.liveUrl || project.githubUrl) && (
                            <div className="flex flex-col gap-4">
                                {project.liveUrl && (
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                                        className="group flex items-center justify-between py-4 border-t border-[var(--border)] hover:bg-[var(--bg-secondary)] transition-colors">
                                        <span className="text-sm font-mono uppercase tracking-widest">Live Site</span>
                                        <span className="transform -rotate-45 group-hover:rotate-0 transition-transform">→</span>
                                    </a>
                                )}
                                {project.githubUrl && (
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                        className="group flex items-center justify-between py-4 border-t border-[var(--border)] hover:bg-[var(--bg-secondary)] transition-colors">
                                        <span className="text-sm font-mono uppercase tracking-widest">Source Code</span>
                                        <span className="transform -rotate-45 group-hover:rotate-0 transition-transform">→</span>
                                    </a>
                                )}
                                <div className="border-t border-[var(--border)]" />
                            </div>
                        )}

                        {/* Tech Stack List */}
                        {project.techStack.length > 0 && (
                            <div>
                                <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-6">Technologies</h3>
                                <ul className="space-y-2">
                                    {project.techStack.map((tech) => (
                                        <li key={tech} className="text-lg text-[var(--text-secondary)]">
                                            {tech}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </aside>

                    {/* RIGHT COLUMN: Description & Case Study */}
                    <div className="md:col-span-8 lg:col-span-8 space-y-24">

                        {/* Intro */}
                        <div>
                            <p className="text-2xl md:text-3xl lg:text-4xl leading-tight font-light text-[var(--text-primary)]">
                                {project.longDescription}
                            </p>
                        </div>

                        {/* Image Gallery */}
                        {project.images && project.images.length > 0 && (
                            <div className="space-y-8">
                                <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">Project Screenshots</h3>
                                <div className="grid gap-8">
                                    {project.images.map((image, idx) => (
                                        <div key={idx} className="relative aspect-video overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)]">
                                            <img
                                                src={image}
                                                alt={`${project.title} screenshot ${idx + 1}`}
                                                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Features Grid */}
                        {project.features.length > 0 && (
                            <div className="border-t border-[var(--border)] pt-12">
                                <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-8">Key Features</h3>
                                <div className="grid md:grid-cols-2 gap-8">
                                    {project.features.map((feature, idx) => (
                                        <div key={idx} className="flex gap-4">
                                            <span className="font-mono text-[var(--text-muted)]">{(idx + 1).toString().padStart(2, '0')}</span>
                                            <p className="text-lg leading-relaxed">{feature}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Challenge & Solution Stack */}
                        <div className="border-t border-[var(--border)]">
                            {project.challenges && (
                                <div className="grid md:grid-cols-2 gap-12 py-12 border-b border-[var(--border)]">
                                    <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] pt-2">The Challenge</h3>
                                    <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
                                        {project.challenges}
                                    </p>
                                </div>
                            )}

                            {project.solution && (
                                <div className="grid md:grid-cols-2 gap-12 py-12 border-b border-[var(--border)]">
                                    <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] pt-2">The Solution</h3>
                                    <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
                                        {project.solution}
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                {/* Footer Nav */}
                <footer className="mt-32 border-t border-[var(--border)] pt-12 flex justify-between items-end">
                    <Link href="/#work" className="group">
                        <span className="block text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">Back</span>
                        <span className="text-xl md:text-2xl hover:opacity-50 transition-opacity">All Projects</span>
                    </Link>

                    {nextProject && (
                        <Link href={`/projects/${nextProject.slug}`} className="group text-right">
                            <span className="block text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">Next Project</span>
                            <span className="text-xl md:text-2xl hover:opacity-50 transition-opacity">{nextProject.title}</span>
                        </Link>
                    )}
                </footer>

            </article>
        </main>
    );
}
