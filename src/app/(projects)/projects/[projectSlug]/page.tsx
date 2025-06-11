import { projects } from "@/data/projects";
import { ProjectUtils } from "@/models/projects";
import { SingleProjectInformations, SingleProjectInformationsColumn, StackDivider } from "./styled";
import { Description, Features, Header, Links, ProjectsSwitch } from "./parts";

import { Comments, AddCommentButton } from "./Comments";

// import { test } from "@/utils/test";

import type { Metadata } from "next";

export async function generateStaticParams() {
    return projects.map(project => ({
        projectSlug: project.slug,
    }));
}

export default async function ProjectDetails({ params }: { params: Promise<{ projectSlug: string }> }) {
    // test();
    const projectSlug = (await params).projectSlug;

    const project = ProjectUtils.getProjectBySlug(projects, projectSlug);
    if (!project) {
        return <h1>Project not found</h1>;
    }

    return (
        <>
            <ProjectsSwitch projectSlug={projectSlug} />
            <Header title={project.title} description={project.description} />
            <SingleProjectInformations direction={{ md: "row" }} divider={<StackDivider />}>
                <SingleProjectInformationsColumn>
                    <Links github={project.github} live={project.live} />
                    <AddCommentButton ID={project.ID} title={project.title} />

                    <Comments projectID={project.ID} title={project.title} />
                </SingleProjectInformationsColumn>

                <SingleProjectInformationsColumn>
                    <h2>Story</h2>
                    {project.story}
                </SingleProjectInformationsColumn>

                <SingleProjectInformationsColumn>
                    <h2>Tech</h2>
                    <Description longDescription={project.longDescription} />
                    <Features features={project.features} />
                </SingleProjectInformationsColumn>
            </SingleProjectInformations>
        </>
    );
}
