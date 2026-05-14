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
                    subtitle="Languages I use in day-to-day work."
                >
                    <ul className="skill-list">
                        <SkillItem
                            title="C++"
                            description="PDF processing, algorithms, and feature work in existing applications."
                        />
                        <SkillItem
                            title="Go"
                            description="Internal tools, test reporting, data processing, and backend services."
                        />
                        <SkillItem
                            title="TypeScript / React"
                            description="Frontend modernization, product interfaces, and web applications."
                        />
                    </ul>
                </SkillSection>

                <SkillSection
                    title="Frontend architecture"
                    subtitle="React and TypeScript in existing products."
                >
                    <p className="skill-note skill-note-block">
                        Working on frontend code that has to fit real product constraints: state management, rendering
                        behavior, backend integration, and code that other people can keep changing.
                    </p>
                </SkillSection>

                <SkillSection
                    title="Tooling and workflow"
                    subtitle="Tools used across builds, debugging, delivery, and support."
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
                        <li>Clear technical trade-offs over accidental complexity.</li>
                    </ul>
                </SkillSection>
            </div>
        </div>
    </section>
);

export default SkillList;
