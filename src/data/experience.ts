export interface ExperienceItem {
    id: number;
    role: string;
    company: string;
    period: string;
    description: string;
    technologies: string[];
}

export const experience: ExperienceItem[] = [
    {
        id: 1,
        role: "Intern / Web App Developer (Internal Tool Project)",
        company: "Hytec Power Inc.",
        period: "Internship",
        description: "Co-developed a local web app that serves as an internal catalog of industrial machines for staff and company tours. Implemented search/filter features, machine profile pages, and content management workflows while assisting in testing and UI polishing for smoother navigation.",
        technologies: ["Web Development", "Internal Tools", "UI/UX", "QA Testing"]
    },
    {
        id: 2,
        role: "Data Analyst",
        company: "Accendion",
        period: "2025 (6 Months)",
        description: "Performed data cleaning and validation for large datasets from major European companies using Excel, SPM, Jira, and internal company software, ensuring data accuracy, consistency, and high-quality outputs.",
        technologies: ["Data Analysis", "Excel", "SQL", "Visualization"]
    }
];
