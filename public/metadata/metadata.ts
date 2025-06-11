import type { Metadata } from "next";

import { Pages } from "@/models/pages";

const robots = {
    index: true,
    follow: true,
    googleBot: {
        index: true,
        follow: true,
    },
};
const authors = [{ name: "Piotr Maksymiuk", url: "https://portfolio-next-15.vercel.app" }];
const viewport = {
    width: "device-width",
    initialScale: 1,
};

export const metadata: {
    [key in Pages]: Metadata;
} = {
    about: {
        title: "About me",
        description: "Basic informations about author, the details are covered on the other pages.",
        keywords: ["portfolio", "developer", "react", "next.js", "about"],
        openGraph: {
            title: "About me",
            description: "Basic informations about author, the details are covered on the other pages.",
        },
        robots: robots,
        authors: [{ name: "Piotr Maksymiuk", url: "https://portfolio-next-15.vercel.app" }],
    },
    skills: {
        title: "Skills",
        description: "Acquired skills, gained certificates, graduated schools, completed trainings and other educational events",
        keywords: ["portfolio", "developer", "react", "next.js", "skills"],
        openGraph: {
            title: "Skills",
            description: "Acquired skills, gained certificates, graduated schools, completed trainings and other educational events",
        },
        robots: robots,
        authors: authors,
    },
    career: {
        title: "Career",
        description: "The abbreviated history of employment, with short chracteristic of job and taks.",
        keywords: ["portfolio", "developer", "react", "next.js", "career", "work experience"],
        openGraph: {
            title: "Career",
            description: "",
        },
        robots: robots,
        authors: authors,
    },
    projects: {
        title: "Projects",
        description: "The list and brief descriptions of projects I have completed and working on currently.",
        keywords: ["portfolio", "developer", "react", "next.js", "projects", "work experience"],
        openGraph: {
            title: "Projects",
            description: "The list and brief descriptions of projects I have completed and working on currently.",
        },
        robots: robots,
        authors: authors,
    },
    contact: {
        title: "Contact",
        description: "My contact details. Currently, I am available for hire and open to any ideas of cooperation.",
        keywords: ["portfolio", "developer", "react", "next.js", "contact", "hire"],
        openGraph: {
            title: "Contact",
            description: "My contact details. Currently, I am available for hire and open to any ideas of cooperation.",
        },
        robots: robots,
        authors: authors,
    },
};

export default metadata;
