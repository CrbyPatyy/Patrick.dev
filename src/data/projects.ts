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
}

export const projects: Project[] = [
    {
        id: 1,
        slug: 'inn-booking-system',
        title: 'Inn Booking System',
        category: 'Booking Platform',
        year: '2025',
        description: 'Full-stack booking platform for boutique inns with real-time availability and PMS dashboard.',
        longDescription: 'A comprehensive booking management system designed for boutique inns and small hotels. Features a customer-facing booking interface with real-time room availability, dynamic pricing, and a complete Property Management System (PMS) dashboard for staff operations.',
        techStack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Recharts'],
        features: [
            'Real-time room availability & booking',
            'Dynamic pricing with add-ons (meals, airport pickup, tours)',
            'Full PMS dashboard for staff',
            'Guest folio & check-in/check-out system',
            'Booking analytics & reporting',
            'Mobile-responsive design'
        ],
        challenges: 'Building a seamless integration between the customer-facing booking system and the back-office PMS while ensuring real-time data synchronization across all touchpoints.',
        solution: 'Implemented a real-time subscription system using Supabase for instant updates, combined with optimistic UI updates for a snappy user experience. The PMS dashboard uses efficient data fetching patterns to minimize load times.',
        liveUrl: 'https://booking-main-sys-wkjf.vercel.app/',
        githubUrl: 'https://github.com/CrbyPatyy',
        status: 'Completed',
        images: [
            '/booking-hero.png',        // Hero landing page
            '/booking-rooms.png',       // Rooms page
            '/dashboard-home.png'       // Dashboard
        ]
    },
    {
        id: 2,
        slug: 'coming-soon-2',
        title: 'Coming Soon',
        category: 'TBA',
        year: '2025',
        description: 'New project in development. Details coming soon.',
        longDescription: 'This project is currently in development. Check back soon for updates!',
        techStack: [],
        features: [],
        status: 'Coming Soon',
    },
    {
        id: 3,
        slug: 'coming-soon-3',
        title: 'Coming Soon',
        category: 'TBA',
        year: '2025',
        description: 'New project in development. Details coming soon.',
        longDescription: 'This project is currently in development. Check back soon for updates!',
        techStack: [],
        features: [],
        status: 'Coming Soon',
    },
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find(p => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
    return projects.map(p => p.slug);
}
