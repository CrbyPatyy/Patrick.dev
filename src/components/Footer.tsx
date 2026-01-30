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
        <div className="relative h-[650px] lg:h-[80vh]" style={{ clipPath: "inset(0 0 0 0)" }}>
            <div className="fixed bottom-0 left-0 w-full h-[650px] lg:h-[80vh] -z-10">
                <footer className="h-full py-24 lg:py-36 border-t border-[var(--border)] bg-[var(--bg-secondary)] flex flex-col justify-between">
                    <div className="container h-full flex flex-col justify-between">
                        {/* Large logo */}
                        <div ref={logoRef} id="footer-logo" className={`text-center transition-all duration-1000 flex-1 flex items-center justify-center ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                            <span
                                className="block text-[clamp(4rem,18vw,16rem)] uppercase tracking-[-0.02em] leading-[0.8] text-[var(--text-primary)] opacity-80 select-none"
                                style={{
                                    fontFamily: 'var(--font-bebas), sans-serif',
                                    textShadow: '0 10px 30px rgba(0,0,0,0.2)'
                                }}
                            >
                                <span id="footer-p" className="inline-block text-[var(--accent)]">P</span>ATRICK
                            </span>
                        </div>

                        <div>
                            {/* Back to top button */}
                            <div className="flex justify-center mb-12">
                                <button
                                    onClick={scrollToTop}
                                    className="group relative overflow-hidden bg-[var(--bg-primary)] border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--accent)] rounded-full transition-all duration-300 cursor-pointer"
                                >
                                    <div className="flex items-center gap-3 px-8 py-4 relative z-10">
                                        <svg className="w-5 h-5 rotate-180 group-hover:-translate-y-1 transition-transform duration-300 text-[var(--accent)] group-hover:text-[var(--bg-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                        <MagneticText text="Back to Top" className="text-sm font-medium tracking-wide uppercase text-[var(--text-primary)] group-hover:text-[var(--bg-primary)] transition-colors duration-300" />
                                    </div>
                                </button>
                            </div>

                            {/* Footer content */}
                            <div className="grid grid-cols-1 md:grid-cols-3 items-end gap-8 text-sm text-[var(--text-secondary)] border-t border-[var(--border)] pt-8">
                                <p className="text-center md:text-left font-medium">© {new Date().getFullYear()} Patrick. All rights reserved.</p>

                                {/* Social links with icons */}
                                <div className="flex items-center justify-center gap-4">
                                    {socials.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 bg-[var(--bg-primary)] rounded-full border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition-all duration-300 group"
                                            aria-label={`Visit ${social.name} profile`}
                                        >
                                            <span className="group-hover:scale-110 block transition-transform duration-300">{social.icon}</span>
                                        </a>
                                    ))}
                                </div>

                                <p className="text-xs text-center md:text-right flex items-center justify-center md:justify-end gap-2 font-medium">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    Manila, PH
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
