import {FC} from "react";

interface SkillItemProps {
    title: string;
    description: string;
}

const SkillItem: FC<SkillItemProps> = ({title, description}) => (
    <li className="skill-item">
        <span className="skill-item-title">{title}</span>
        <span className="skill-item-desc">{description}</span>
    </li>
);

interface SkillSectionProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

const SkillSection: FC<SkillSectionProps> = ({title, subtitle, children}) => (
    <div className="skill-section">
        <h3 className="mb-0">{title}</h3>
        <div className="text-lead">{subtitle}</div>
        {children}
    </div>
);

const SkillList: FC = () => (
    <section className="flex-columns" id="skills">
        <div className="flex-full-column flex-full-column-70 p2">
            <div className="w100">
                <h2>Skills</h2>

                <SkillSection
                    title="Core engineering"
                    subtitle="Production languages and the work they support."
                >
                    <ul className="skill-list">
                        <SkillItem
                            title="C++"
                            description="Core functionality, algorithms, and feature development in existing production systems."
                        />
                        <SkillItem
                            title="Go"
                            description="Internal tooling, testing platforms, data processing, and backend services."
                        />
                        <SkillItem
                            title="TypeScript / React"
                            description="Frontend architecture, modernization, and web applications."
                        />
                    </ul>
                </SkillSection>

                <SkillSection
                    title="Frontend architecture"
                    subtitle="Modern web systems that stay maintainable under real product pressure."
                >
                    <p className="skill-note skill-note-block">
                        Designing and modernizing frontend systems with React and TypeScript, with attention to
                        maintainability, state management, rendering behavior, and integration with backend services.
                    </p>
                </SkillSection>

                <SkillSection
                    title="Tooling and workflow"
                    subtitle="Tools used across delivery, builds, debugging, and production ownership."
                >
                    <ul className="skill-tags">
                        <li>Jenkins</li>
                        <li>Git</li>
                        <li>Perforce</li>
                        <li>Docker</li>
                        <li>Docker Compose</li>
                        <li>CMake</li>
                        <li>Linux / Unix</li>
                    </ul>
                </SkillSection>

                <SkillSection
                    title="Engineering principles"
                    subtitle="How I approach problems and codebases."
                >
                    <ul className="skill-list skill-list-simple">
                        <li>Simple, explicit solutions over clever abstractions.</li>
                        <li>Maintainability and long-term readability.</li>
                        <li>Systems designed for other engineers, not just machines.</li>
                        <li>Willingness to challenge poor design decisions when necessary.</li>
                    </ul>
                </SkillSection>
            </div>
        </div>
    </section>
);

export default SkillList;
