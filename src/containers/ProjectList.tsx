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
                        description="Built and operated a Go and React commerce platform across retail, B2B, admin workflows, integrations, deployment, and long-term support."
                        points={[
                            "Owned frontend, backend, deployment, and operational maintenance over several years.",
                            "Built workflows around ordering, admin tooling, integrations, and production support.",
                            "Used Go, React, Docker, and Docker Compose across the platform."
                        ]}
                        tags={["Go", "React", "Docker", "B2B", "E-commerce"]}
                    />
                    <ProjectCard
                        eyebrow="Internal tooling"
                        title="QA reporting platform"
                        description="Built an internal Go platform that made automated test output easier to inspect, search, and act on for engineers."
                        points={[
                            "Turned automated test results into a clearer reporting workflow.",
                            "Designed around engineering feedback and build/test visibility.",
                            "Integrated with existing continuous-build infrastructure."
                        ]}
                        tags={["Go", "Testing", "Jenkins"]}
                    />
                    <ProjectCard
                        eyebrow="Modernization"
                        title="React and TypeScript migration"
                        description="Modernized a large existing frontend with React and TypeScript while preserving product behavior and improving maintainability."
                        points={[
                            "Worked inside an established production codebase rather than rewriting from scratch.",
                            "Improved structure through typed components and clearer component boundaries.",
                            "Focused on maintainable rendering behavior, state, and developer experience."
                        ]}
                        tags={["React", "TypeScript"]}
                    />
                </div>
            </div>
        </div>
    </section>
);

export default ProjectList;
