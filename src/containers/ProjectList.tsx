import {FC} from "react";

interface ProjectCardProps {
    title: string;
    eyebrow: string;
    description: string;
    points: string[];
    tags: string[];
}

const ProjectCard: FC<ProjectCardProps> = ({title, eyebrow, description, points, tags}) => (
    <article className="project-card">
        <div className="project-eyebrow">{eyebrow}</div>
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        <ul className="project-points">
            {points.map(point => (
                <li key={point}>{point}</li>
            ))}
        </ul>
        <ul className="project-tags" aria-label={`${title} technologies`}>
            {tags.map(tag => (
                <li key={tag}>{tag}</li>
            ))}
        </ul>
    </article>
);

const ProjectList: FC = () => (
    <section className="flex-columns" id="selected-work">
        <div className="flex-full-column flex-full-column-70 p2">
            <div className="w100">
                <h2>Selected work</h2>
                <div className="project-grid">
                    <ProjectCard
                        eyebrow="Production platform"
                        title="Matthys Wines e-commerce"
                        description="Built and maintained a Go and React commerce platform for retail, B2B, admin workflows, integrations, deployment, and support."
                        points={[
                            "Worked across frontend, backend, deployment, and operational maintenance over several years.",
                            "Built workflows around ordering, admin tooling, integrations, and structured web data.",
                            "Moved the SPA toward server-side rendering for maintainability, SEO, and performance.",
                            "Used Go, React, Docker, and Docker Compose across the platform."
                        ]}
                        tags={["Go", "React", "Docker", "SSR", "B2B"]}
                    />
                    <ProjectCard
                        eyebrow="Internal tooling"
                        title="QA reporting platform"
                        description="Built an internal Go platform for automated testing and reporting workflows."
                        points={[
                            "Made automated test results easier to inspect, search, and discuss.",
                            "Worked around existing engineering and build visibility needs.",
                            "Integrated with existing continuous-build infrastructure."
                        ]}
                        tags={["Go", "Testing", "Jenkins"]}
                    />
                    <ProjectCard
                        eyebrow="Modernization"
                        title="React and TypeScript migration"
                        description="Contributed to modernizing a large existing frontend with React and TypeScript."
                        points={[
                            "Worked inside an established production codebase rather than rewriting from scratch.",
                            "Used typed components and clearer component boundaries where they fit the existing system.",
                            "Focused on maintainable rendering behavior, state, and backend communication."
                        ]}
                        tags={["React", "TypeScript"]}
                    />
                </div>
            </div>
        </div>
    </section>
);

export default ProjectList;
