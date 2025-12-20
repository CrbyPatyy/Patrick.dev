'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import MagneticText from './MagneticText';

const navLinks = [
    { name: 'Work', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
];

const YOUR_EMAIL = 'Patrickpilapilvillanueva@gmail.com';

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    // Real-time PH clock
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const phTime = now.toLocaleTimeString('en-US', {
                timeZone: 'Asia/Manila',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
            setCurrentTime(phTime);
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const lastScrollYRef = useRef(0);
    const rafRef = useRef<number | null>(null);

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollYRef.current;

        const isScrolled = currentScrollY > 50;
        setScrolled(prev => prev !== isScrolled ? isScrolled : prev);

        // Only change hidden state if scroll delta is significant (> 10px)
        if (scrollDelta > 10 && currentScrollY > 200) {
            setHidden(true);
        } else if (scrollDelta < -10) {
            setHidden(false);
        }

        lastScrollYRef.current = currentScrollY;

        const sections = navLinks.map(link => link.href.substring(1));
        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    setActiveSection(prev => prev !== section ? section : prev);
                    break;
                }
            }
        }
    }, []);

    useEffect(() => {
        const onScroll = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(handleScroll);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        handleScroll();
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [handleScroll]);

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && mobileOpen) {
                setMobileOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [mobileOpen]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setMobileOpen(false);
        const targetId = href.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', href);
        }
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? 'py-3' : 'py-6'} ${hidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
                aria-label="Main navigation"
            >
                <div className={`absolute inset-0 glass border-b border-[var(--border)] transition-all duration-700 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`} />
                <div className="container relative flex items-center justify-between">
                    <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-xl font-medium tracking-tight z-10" aria-label="Back to top">
                        Patrick<span className="text-[var(--text-muted)]">.</span>
                    </a>
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className={`group relative py-2 transition-colors duration-300 hover:text-[var(--text-primary)] ${activeSection === link.href.substring(1) ? 'text-[var(--text-primary)]' : 'text-[var(--accent-soft)]'}`}
                                aria-current={activeSection === link.href.substring(1) ? 'page' : undefined}
                            >
                                <MagneticText
                                    text={link.name}
                                    className="!px-0 !py-0 text-sm"
                                />
                            </a>
                        ))}
                    </div>
                    <div className="hidden md:flex items-center gap-3 text-xs z-10 text-[var(--text-primary)]">
                        <span className="font-mono tracking-wider">{currentTime}</span>
                        <span className="text-[var(--text-muted)]">•</span>
                        <span className="uppercase tracking-widest">Manila</span>
                    </div>
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>
                        <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                        <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>
            </nav>
            <div className={`fixed inset-0 z-40 bg-[var(--bg-primary)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} aria-hidden={!mobileOpen}>
                <div className="container h-full flex flex-col justify-center">
                    <nav className="space-y-2" aria-label="Mobile navigation">
                        {navLinks.map((link, index) => (
                            <div key={link.name} className="overflow-hidden">
                                <a href={link.href} onClick={(e) => handleNavClick(e, link.href)} className={`block w-full text-left text-5xl font-normal tracking-tight py-4 transition-all duration-500 ${mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`} style={{ transitionDelay: mobileOpen ? `${index * 0.1}s` : '0s' }}>
                                    {link.name}
                                </a>
                            </div>
                        ))}
                    </nav>
                    <div className={`mt-16 pt-8 border-t border-[var(--border)] transition-all duration-500 ${mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: mobileOpen ? '0.4s' : '0s' }}>
                        <a href={`mailto:${YOUR_EMAIL}`} className="text-xl text-[var(--text-secondary)] break-all">{YOUR_EMAIL}</a>
                    </div>
                </div>
            </div>
        </>
    );
}
