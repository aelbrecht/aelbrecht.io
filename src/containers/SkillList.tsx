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
                    subtitle="Languages and frameworks from current production work."
                >
                    <ul className="skill-list">
                        <SkillItem
                            title="C++"
                            description="Since 2023: PDF functionality, algorithms, and feature work in existing applications."
                        />
                        <SkillItem
                            title="Go"
                            description="Since 2019: production services, internal tooling, test reporting, and data processing."
                        />
                        <SkillItem
                            title="TypeScript, React"
                            description="Since 2019: frontend architecture, web applications, and product interfaces."
                        />
                    </ul>
                </SkillSection>

                <SkillSection
                    title="Workflow"
                    subtitle="Tools used across planning, code review, and delivery."
                >
                    <ul className="skill-tags">
                        <li>Codex</li>
                        <li>Cursor</li>
                        <li>Git</li>
                        <li>Perforce</li>
                        <li>Jira</li>
                        <li>Spec-driven AI-assisted development</li>
                    </ul>
                </SkillSection>

                <SkillSection
                    title="CI/CD"
                    subtitle="Build, test, and deployment tooling."
                >
                    <ul className="skill-tags">
                        <li>Jenkins</li>
                        <li>Jenkins Pipelines</li>
                        <li>Docker</li>
                        <li>Docker Compose</li>
                        <li>CMake</li>
                        <li>Linux / Unix</li>
                    </ul>
                </SkillSection>

                <SkillSection
                    title="Working style"
                    subtitle="How I tend to approach codebases."
                >
                    <ul className="skill-list skill-list-simple">
                        <li>Simple, explicit solutions over clever abstractions.</li>
                        <li>Maintainability and long-term readability.</li>
                        <li>Small feedback loops through useful tests and tooling.</li>
                        <li>Clear technical trade-offs when working in existing systems.</li>
                    </ul>
                </SkillSection>
            </div>
        </div>
    </section>
);

export default SkillList;
