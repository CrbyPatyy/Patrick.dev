import type { Metadata } from "next";
import { Inter, Syne, Bebas_Neue } from 'next/font/google';
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import LoadingScreen from "@/components/LoadingScreen";
import EnhancedCursor from "@/components/EnhancedCursor";
import { PageTransitionProvider } from "@/components/PageTransition";

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

const syne = Syne({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-syne',
    weight: ['400', '500', '600', '700', '800'],
});

const bebasNeue = Bebas_Neue({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-bebas',
    weight: '400',
});

export const metadata: Metadata = {
    title: "Patrick | Full-Stack Developer",
    description: "Full-Stack Developer crafting digital experiences that matter. Portfolio showcasing web development projects, skills, and expertise.",
    keywords: ["developer", "portfolio", "full-stack", "web development", "React", "Next.js", "TypeScript"],
    authors: [{ name: "Patrick" }],
    icons: {
        icon: '/icon.png',
        apple: '/icon.png',
    },
    openGraph: {
        title: "Patrick | Full-Stack Developer",
        description: "Full-Stack Developer crafting digital experiences that matter.",
        type: "website",
        locale: "en_US",
        siteName: "Patrick's Portfolio",
    },
    twitter: {
        card: "summary_large_image",
        title: "Patrick | Full-Stack Developer",
        description: "Full-Stack Developer crafting digital experiences that matter.",
    },
    robots: {
        index: true,
        follow: true,
    },
    metadataBase: new URL('https://yourportfolio.com'),
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className={`${inter.variable} ${syne.variable} ${bebasNeue.variable}`}>
            <body className={`${inter.className} antialiased min-h-screen relative`} suppressHydrationWarning>
                {/* Global Backgrounds */}
                <div className="fixed inset-0 z-[-1] bg-grid pointer-events-none" aria-hidden="true" />
                <div className="noise" />

                <PageTransitionProvider>
                    <LoadingScreen />
                    <EnhancedCursor />
                    <SmoothScroll>
                        {children}
                    </SmoothScroll>
                </PageTransitionProvider>
            </body>
        </html>
    );
}
