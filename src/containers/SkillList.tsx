import {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

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
                    subtitle="Primary areas of focus and experience."
                >
                    <ul className="skill-list">
                        <SkillItem
                            title="Systems and backend engineering"
                            description="Designing and maintaining long-lived systems with a focus on correctness, performance, and clarity."
                        />
                        <SkillItem
                            title="Software architecture and design"
                            description="Exploring, prototyping, and evolving designs under real-world constraints rather than chasing theoretical purity."
                        />
                        <SkillItem
                            title="Performance-critical code"
                            description="Profiling, optimizing, and reasoning about performance where it actually matters."
                        />
                        <SkillItem
                            title="Product-driven engineering"
                            description="Building what is needed to ship and maintain products, not just what looks good in isolation."
                        />
                    </ul>
                </SkillSection>

                <SkillSection
                    title="Languages"
                    subtitle="Used in production and day-to-day work."
                >
                    <ul className="skill-tags">
                        <li><FontAwesomeIcon className="skill-star" icon={faStar}/> <span>Go</span></li>
                        <li><FontAwesomeIcon className="skill-star" icon={faStar}/> <span>C++</span></li>
                        <li><FontAwesomeIcon className="skill-star" icon={faStar}/> <span>TypeScript</span></li>
                    </ul>
                    <p className="skill-note">Strong preference for typed languages and explicit interfaces.</p>
                </SkillSection>

                <SkillSection
                    title="UI and product surface"
                    subtitle="A necessary part of shipping software, not a specialization."
                >
                    <ul className="skill-list skill-list-simple">
                        <li>Implementing and maintaining UI layers when required</li>
                        <li>Debugging complex state, rendering, and lifecycle issues</li>
                        <li>Translating product requirements into robust, maintainable code</li>
                    </ul>
                    <p className="skill-note">Technologies: React, modern frontend tooling</p>
                </SkillSection>

                <SkillSection
                    title="Tooling and environment"
                    subtitle="The tools I rely on to get real work done."
                >
                    <ul className="skill-tags">
                        <li>Git</li>
                        <li>CI/CD (Jenkins)</li>
                        <li>Docker</li>
                        <li>Linux / Unix</li>
                        <li>CMake</li>
                    </ul>
                </SkillSection>

                <SkillSection
                    title="Engineering principles"
                    subtitle="How I approach problems and codebases."
                >
                    <ul className="skill-list skill-list-simple">
                        <li>Preference for simple, explicit solutions over clever abstractions</li>
                        <li>Strong focus on maintainability and long-term readability</li>
                        <li>Designing systems for other engineers, not just machines</li>
                        <li>Willingness to challenge poor design decisions when necessary</li>
                    </ul>
                </SkillSection>
            </div>
        </div>
    </section>
);

export default SkillList;
