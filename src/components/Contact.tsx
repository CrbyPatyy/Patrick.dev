'use client';

import { useRef, useEffect, useState } from 'react';
import { sendEmail } from '@/app/actions/sendEmail';
import MagneticText from './MagneticText';

export default function Contact() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [focused, setFocused] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); } }, { threshold: 0.1 });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setFieldErrors({});
        setSending(true);
        try {
            const result = await sendEmail(form);
            if (result.success) {
                setSent(true);
                setForm({ name: '', email: '', subject: '', message: '' });
            } else {
                setError(result.message);
                setTimeout(() => setError(''), 5000);
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            setTimeout(() => setError(''), 5000);
        } finally {
            setSending(false);
        }
    };

    const isActive = (field: string) => focused === field || form[field as keyof typeof form];

    return (
        <section id="contact" className="py-24 lg:py-32 bg-[var(--bg-primary)]">
            <div className="container mx-auto max-w-6xl">
                <div ref={ref} className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-start transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    {/* Left side - Info */}
                    <div className="text-center lg:text-left">
                        <p className="section-label mb-6">Get in Touch</p>
                        <h2 className="heading-section mb-8">
                            Let's build<br />something<br />great.
                        </h2>
                        <p className="text-base sm:text-lg text-[var(--text-secondary)] mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed">Have a project in mind? I&apos;d love to hear about it. Let&apos;s create something amazing together.</p>

                        <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 max-w-lg mx-auto lg:mx-0">
                            <a href="mailto:Patrickpilapilvillanueva@gmail.com" className="group flex items-center gap-2" aria-label="Email Patrick">
                                <svg className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">Patrickpilapilvillanueva@gmail.com</span>
                            </a>

                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-sm text-[var(--text-secondary)] flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    Manila, Philippines
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Form */}
                    <div className="bg-[var(--bg-secondary)] rounded-3xl p-8 lg:p-10 border border-[var(--border)]">
                        {sent ? (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-6 animate-bounce">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <h3 className="text-2xl font-medium mb-3 text-[var(--text-primary)]">Message Sent!</h3>
                                <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">I&apos;ll get back to you within 24 hours.</p>
                                <button onClick={() => setSent(false)} className="btn btn-secondary" type="button">
                                    <MagneticText text="← Send another message" className="!px-6 !py-3" />
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
                                {/* Name Field */}
                                <div className="relative group">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        placeholder=" "
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        onFocus={() => setFocused('name')}
                                        onBlur={() => setFocused(null)}
                                        className="peer w-full h-14 px-4 pt-4 border-2 border-[var(--border)] rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none transition-all duration-300 placeholder-transparent"
                                        aria-invalid={!!fieldErrors.name}
                                    />
                                    <label
                                        htmlFor="name"
                                        className="absolute left-4 top-4 text-[var(--text-muted)] transition-all duration-300 pointer-events-none peer-focus:top-1 peer-focus:text-xs peer-focus:text-[var(--accent)] peer-focus:font-medium peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[var(--accent)] peer-[:not(:placeholder-shown)]:font-medium"
                                    >
                                        Your Name *
                                    </label>
                                </div>

                                {/* Email Field */}
                                <div className="relative group">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        placeholder=" "
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        onFocus={() => setFocused('email')}
                                        onBlur={() => setFocused(null)}
                                        className="peer w-full h-14 px-4 pt-4 border-2 border-[var(--border)] rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none transition-all duration-300 placeholder-transparent"
                                        aria-invalid={!!fieldErrors.email}
                                    />
                                    <label
                                        htmlFor="email"
                                        className="absolute left-4 top-4 text-[var(--text-muted)] transition-all duration-300 pointer-events-none peer-focus:top-1 peer-focus:text-xs peer-focus:text-[var(--accent)] peer-focus:font-medium peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[var(--accent)] peer-[:not(:placeholder-shown)]:font-medium"
                                    >
                                        Your Email *
                                    </label>
                                </div>

                                {/* Subject Field */}
                                <div className="relative group">
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        required
                                        placeholder=" "
                                        value={form.subject}
                                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                        onFocus={() => setFocused('subject')}
                                        onBlur={() => setFocused(null)}
                                        className="peer w-full h-14 px-4 pt-4 border-2 border-[var(--border)] rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none transition-all duration-300 placeholder-transparent"
                                        aria-invalid={!!fieldErrors.subject}
                                    />
                                    <label
                                        htmlFor="subject"
                                        className="absolute left-4 top-4 text-[var(--text-muted)] transition-all duration-300 pointer-events-none peer-focus:top-1 peer-focus:text-xs peer-focus:text-[var(--accent)] peer-focus:font-medium peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[var(--accent)] peer-[:not(:placeholder-shown)]:font-medium"
                                    >
                                        Subject *
                                    </label>
                                </div>

                                {/* Message Field */}
                                <div className="relative group">
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        minLength={10}
                                        placeholder=" "
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        onFocus={() => setFocused('message')}
                                        onBlur={() => setFocused(null)}
                                        className="peer w-full h-36 px-4 pt-6 border-2 border-[var(--border)] rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none transition-all duration-300 resize-none placeholder-transparent"
                                        aria-invalid={!!fieldErrors.message}
                                    />
                                    <label
                                        htmlFor="message"
                                        className="absolute left-4 top-4 text-[var(--text-muted)] transition-all duration-300 pointer-events-none peer-focus:top-1 peer-focus:text-xs peer-focus:text-[var(--accent)] peer-focus:font-medium peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[var(--accent)] peer-[:not(:placeholder-shown)]:font-medium"
                                    >
                                        Your Message *
                                    </label>
                                </div>

                                {/* Error message */}
                                {error && (
                                    <div className="flex items-center gap-3 text-red-500 text-sm p-4 bg-red-500/10 rounded-xl border border-red-500/20" role="alert">
                                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        {error}
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="btn btn-primary w-full h-14 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                                >
                                    {sending ? (
                                        <div className="flex items-center justify-center gap-3">
                                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                                            <span>Sending...</span>
                                        </div>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            Send Message
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </span>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
