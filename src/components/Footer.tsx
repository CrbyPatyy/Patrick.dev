'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import MagneticText from './MagneticText';

export default function Footer() {
    const [logoRef, visible] = useScrollReveal<HTMLDivElement>();

    const socials = [
        {
            name: 'GitHub',
            url: 'https://github.com/CrbyPatyy',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
            )
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/patrick-villanueva-59a747268/',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            )
        },
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="py-24 lg:py-36 border-t border-[var(--border)] bg-[var(--bg-secondary)]">
            <div className="container">
                {/* Large logo */}
                <div ref={logoRef} id="footer-logo" className={`text-center mb-16 transition-all duration-1000 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <span
                        className="text-[clamp(4rem,15vw,12rem)] uppercase tracking-[-0.02em] leading-[0.85] text-neutral-300 select-none"
                        style={{ fontFamily: 'var(--font-bebas), sans-serif' }}
                    >
                        <span id="footer-p" className="inline-block">P</span>ATRICK
                    </span>
                </div>

                {/* Back to top button */}
                <div className="flex justify-center mb-12">
                    <button
                        onClick={scrollToTop}
                        className="btn btn-secondary !p-0 group"
                    >
                        <div className="flex items-center gap-3 px-6 py-3">
                            <svg className="w-4 h-4 rotate-180 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                            <MagneticText text="Back to Top" />
                        </div>
                    </button>
                </div>

                {/* Footer content */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 text-sm text-[var(--text-muted)]">
                    <p className="text-center md:text-left">© {new Date().getFullYear()} Patrick. All rights reserved.</p>

                    {/* Social links with icons */}
                    <div className="flex items-center justify-center gap-4">
                        {socials.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary !p-0 group"
                                aria-label={`Visit ${social.name} profile`}
                            >
                                <div className="flex items-center gap-2 px-5 py-2.5">
                                    <span className="group-hover:scale-110 transition-transform duration-300">{social.icon}</span>
                                    <MagneticText text={social.name} />
                                </div>
                            </a>
                        ))}
                    </div>

                    <p className="text-xs text-center md:text-right flex items-center justify-center md:justify-end gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Manila, PH
                    </p>
                </div>
            </div>
        </footer>
    );
}
