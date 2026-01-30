export interface Project {
    id: number;
    slug: string;
    title: string;
    category: string;
    year: string;
    description: string;
    longDescription: string;
    techStack: string[];
    features: string[];
    status: 'Completed' | 'In Progress' | 'Coming Soon';
    challenges?: string;
    solution?: string;
    liveUrl?: string;
    githubUrl?: string;
    images?: string[];
    metrics?: {
        label: string;
        value: string;
        description?: string;
    }[];
    techDecisions?: {
        technology: string;
        reason: string;
    }[];
}

export const projects: Project[] = [
    {
        id: 1,
        slug: 'inn-booking-system',
        title: 'Inn Booking System',
        category: 'Booking Platform',
        year: '2025',
        description: 'Full-stack booking platform for boutique inns with real-time availability and PMS dashboard.',
        longDescription: 'A comprehensive booking management system designed specifically for boutique inns and small hotels. This platform bridges the gap between guest-facing booking experiences and internal property management, offering real-time synchronization, dynamic pricing capabilities, and a complete operational dashboard for hotel staff.',
        techStack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Recharts'],
        features: [
            'Real-time room availability & booking engine with instant confirmation',
            'Dynamic pricing system with customizable add-ons (meals, airport pickup, local tours)',
            'Comprehensive Property Management System (PMS) dashboard for staff operations',
            'Guest folio management with auto-generated invoices and billing summaries',
            'Advanced check-in/check-out workflow with housekeeping status tracking',
            'Booking analytics dashboard with revenue tracking and occupancy metrics',
            'Role-based access control for different staff levels (admin, receptionist, housekeeping)',
            'Mobile-responsive design optimized for tablets and smartphones',
            'Email notification system for booking confirmations and reminders',
            'Multi-room booking support with group reservation management',
            'Calendar view with drag-and-drop booking adjustments',
            'Payment tracking and reconciliation tools'
        ],
        challenges: 'The primary challenge was designing a system that seamlessly bridges two very different user experiences: the customer-facing booking interface needed to be simple and trustworthy, while the back-office PMS required powerful features for complex hotel operations. Additionally, ensuring real-time data synchronization across multiple touchpoints (booking engine, PMS dashboard, housekeeping tablets) without performance degradation was critical. The system also needed to handle edge cases like overbooking prevention, concurrent booking attempts, and accurate room availability calculations across different timezones.',
        solution: 'Implemented a robust real-time subscription architecture using Supabase\'s PostgreSQL database with Row Level Security (RLS) policies to ensure data integrity and security. The booking engine uses optimistic UI updates combined with server-side validation to provide instant feedback while maintaining accuracy. For the PMS dashboard, I designed an efficient data-fetching strategy with smart caching to minimize load times while ensuring staff always see current information. The system employs database triggers and functions to handle complex business logic like automatic room status updates, booking conflict detection, and revenue calculations. All real-time updates are managed through Supabase subscriptions, allowing multiple staff members to work simultaneously without data conflicts.',
        liveUrl: 'https://booking-main-sys-wkjf.vercel.app/',
        githubUrl: 'https://github.com/CrbyPatyy',
        status: 'Completed',
        images: [
            '/booking-hero.png',        // Hero landing page
            '/booking-rooms.png',       // Rooms page
            '/dashboard-home.png'       // Dashboard
        ],
        metrics: [
            {
                label: 'Development Time',
                value: '8 Weeks',
                description: 'From initial design to production deployment'
            },
            {
                label: 'Performance',
                value: '< 1.5s',
                description: 'Average page load time with real-time data'
            },
            {
                label: 'Real-time Sync',
                value: '< 100ms',
                description: 'Database to UI update latency'
            },
            {
                label: 'Booking Flow',
                value: '3 Steps',
                description: 'Streamlined user experience from selection to confirmation'
            }
        ],
        techDecisions: [
            {
                technology: 'Next.js 14',
                reason: 'App Router for optimal performance, built-in API routes, and excellent SEO capabilities. Server-side rendering ensures fast initial loads while client-side navigation provides a smooth SPA experience.'
            },
            {
                technology: 'TypeScript',
                reason: 'Type safety is critical in a booking system where data integrity matters. TypeScript caught numerous potential bugs during development and provides better IDE support for complex data structures.'
            },
            {
                technology: 'Supabase',
                reason: 'Chose Supabase for its real-time subscriptions, built-in authentication, Row Level Security, and PostgreSQL foundation. The ability to write database functions in SQL allowed complex business logic to run server-side for better performance.'
            },
            {
                technology: 'Tailwind CSS',
                reason: 'Rapid UI development with consistent design system. The utility-first approach made responsive design straightforward and kept CSS bundle size minimal.'
            },
            {
                technology: 'Recharts',
                reason: 'Lightweight, composable charting library perfect for the analytics dashboard. Built on React principles making it easy to integrate with the existing component architecture.'
            }
        ]
    },
    // {
    //     id: 2,
    //     slug: 'coming-soon-2',
    //     title: 'Coming Soon',
    //     category: 'TBA',
    //     year: '2025',
    //     description: 'New project in development. Details coming soon.',
    //     longDescription: 'This project is currently in development. Check back soon for updates!',
    //     techStack: [],
    //     features: [],
    //     status: 'Coming Soon',
    // },
    // {
    //     id: 3,
    //     slug: 'coming-soon-3',
    //     title: 'Coming Soon',
    //     category: 'TBA',
    //     year: '2025',
    //     description: 'New project in development. Details coming soon.',
    //     longDescription: 'This project is currently in development. Check back soon for updates!',
    //     techStack: [],
    //     features: [],
    //     status: 'Coming Soon',
    // },
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find(p => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
    return projects.map(p => p.slug);
}
