// import { ModalProps } from "../components/modal/Modal";

import { VerticalTimelineElementProps } from "react-vertical-timeline-component";

export interface Skill {
    skill: string;
    level: string;
}
export interface ContactType {
    ID: string;
    text: string;
    link: string;
    alias: string;
}
export interface EducationData {
    school: string;
    period: string;
    subject: string;
}
export interface Certificate {
    name: string;
    operator: string;
    link: string;
    isProfessional: boolean;
}

export interface CareerItem extends VerticalTimelineElementProps {
    period: string;
    name: string;
    link?: string;
    position: string;
    subtitle?: string;
    description: string[];
}
export type Feature = string;

export interface ProjectType {
    ID: string;
    title: string;
    description: string;
    category: string;
    features: Feature[];
    longDescription: string[];
    live: string;
    github: string;
    story?: string;
    slides?: string[];
}

export type Contacts = ContactType[];

export type Skills = Skill[];

export type Education = EducationData[];

export interface SkillsPageProps {
    skills: Skill[];
    education: Education;
    certificates: Certificate[];
}

export interface ProjectsPageProps {
    data: ProjectType[];
    featuresList: string[];
}

// export type { ModalProps };

export interface CommentType {
    author: string;
    active?: boolean;
    content: string;
    created: number;
    ID: string;
    project: string;
    parent?: string;
    authorEmail?: string;
    projectID: string;
}

export interface User {
    uid: string;
    email: string;
    displayName: string;
}

export interface ProjectNav {
    projectNext: string | undefined;
    projectPrevious: string | undefined;
}

export interface ContactType {
    ID: string;
    text: string;
    link: string;
    alias: string;
}
