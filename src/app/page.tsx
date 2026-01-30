import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import { ScrollStatement } from '@/components/ScrollText';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';

import ScrollSection from '@/components/ScrollSection';

export default function Home() {
    return (
        <>

            <ScrollProgress />

            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-white focus:text-black focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
            >
                Skip to main content
            </a>

            <Navigation />

            <main id="main-content" className="relative z-10 bg-[var(--bg-primary)]">
                <Hero />

                <ScrollSection animation="fade">
                    <ScrollStatement
                        primary="I build digital experiences"
                        secondary="that blend form with function."
                    />
                </ScrollSection>

                <ScrollSection animation="slide-up">
                    <Experience />
                </ScrollSection>

                <ScrollSection animation="fade">
                    <ScrollStatement
                        primary="Crafting solutions"
                        secondary="one line of code at a time."
                    />
                </ScrollSection>

                <ScrollSection animation="slide-up" delay={0.1}>
                    <Projects />
                </ScrollSection>

                <ScrollSection animation="scale">
                    <About />
                </ScrollSection>

                <ScrollSection animation="slide-up">
                    <Services />
                </ScrollSection>

                <ScrollSection animation="slide-up">
                    <Contact />
                </ScrollSection>
            </main>

            <Footer />
        </>
    );
}

