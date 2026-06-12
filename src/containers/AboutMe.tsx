import {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";

const Portrait = () => (
    <div className="portrait">
        <div>
            <img
                alt={"Rudolf Aelbrecht"}
                src="https://static.aelbrecht.io/portfolio/rudolf-portrait.jpg"
            />
        </div>
        <div className="portrait-description">
            <div className="portrait-name">Rudolf Aelbrecht</div>
        </div>
        <div className="profile-description">
            <p>
                Software engineer working across C++, Go, TypeScript, and React in production systems, including PDF
                functionality, service integration, internal tooling, automated testing, and web interfaces.
            </p>
            <p>
                I like practical engineering work: making existing systems easier to understand, keeping feedback loops
                short, and building tools that stay useful after the first release.
            </p>
        </div>
    </div>
)

interface EduBlockInterface {
    title: string
    location: string
}

const EduBlock: FC<EduBlockInterface> = ({title, location}) => (
    <div className="edu-block">
        <div className="edu-title">
            {title}
        </div>
        <div className="edu-location">
            {location}
        </div>
    </div>
)

interface LanguageBlockInterface {
    language: string
    level: string
}

const LanguageBlock: FC<LanguageBlockInterface> = ({language, level}) => (
    <div className="language-block">
        <div className="language-title">
            {language}
        </div>
        <div className="language-level">
            {level}
        </div>
    </div>
)

const AboutMe: FC = () => (
    <section className="page-filler">
        <div className="flex-columns ">
            <div className="flex-inner-column flex-inner-column-30 p2 portrait-mobile">
                <Portrait/>
            </div>
            <div className="flex-inner-column flex-inner-column-70 p2">
                <div className="w100">
                    <h2 id="profile">Profile</h2>
                    <h3 id="experience">Experience</h3>
                    <div className="experience-segment" aria-labelledby="experience">
                        <div className="exp-block exp-esko">
                            <div className="exp-title">
                                Esko
                            </div>
                            <div className="exp-function">
                                <FontAwesomeIcon className="role-icon" icon={faAngleRight}/>
                                Software Engineer | Sep 2023 - Present
                            </div>
                            <div className="exp-function">
                                <FontAwesomeIcon className="role-icon" icon={faAngleRight}/>
                                Junior Software Engineer | Sep 2022 - Sep 2023
                            </div>
                            <div className="exp-description">
                                Work on C++ components and algorithms for PDF functionality in a mature production
                                codebase. Also contribute to frontend modernization, backend communication, internal Go
                                tooling, automated testing, and continuous-build workflows.
                            </div>
                            <ul className="exp-bullets">
                                <li>Develop C++ components for core PDF functionality and feature work.</li>
                                <li>Contribute to a React and TypeScript modernization of a large web-based viewer.</li>
                                <li>Implement communication with backend services using APIs and WebSockets.</li>
                                <li>Built an internal Go platform for automated test reporting.</li>
                                <li>Maintain automated testing workflows with unit tests, Playwright, and Jenkins builds.</li>
                            </ul>
                        </div>
                        <div className="exp-block exp-matthys-wines">
                            <div className="exp-title">
                                Matthys Wines
                            </div>
                            <div className="exp-function">
                                <FontAwesomeIcon className="role-icon" icon={faAngleRight}/>
                                Freelance | Feb 2019 - Present
                            </div>
                            <div className="exp-description">
                                Built and operated a Go and React e-commerce platform serving retail and B2B workflows,
                                including ordering, admin tooling, third-party integrations, and production maintenance
                                over roughly five years.
                            </div>
                            <ul className="exp-bullets">
                                <li>Built Go microservices with Docker and Docker Compose.</li>
                                <li>Developed React frontends for retail, B2B, and internal admin tools.</li>
                                <li>Integrated third-party services for payments, analytics, and structured web data.</li>
                                <li>Migrated the SPA to server-side rendering to improve maintainability, SEO, and performance.</li>
                                <li>Handled deployment, production support, and ongoing maintenance.</li>
                            </ul>
                        </div>
                        <div className="exp-block exp-holiday-suites">
                            <div className="exp-title">
                                Holiday Suites
                            </div>
                            <div className="exp-function">
                                <FontAwesomeIcon className="role-icon" icon={faAngleRight}/>
                                Web Developer | 2016 - 2018
                            </div>
                            <div className="exp-description">
                                Built internal tools for payments, voucher codes, accommodations, events, inventory, and
                                booking workflows. Integrated payment providers as part of an existing e-commerce site
                                and replaced static product pages with dynamic pages connected to the existing system.
                            </div>
                        </div>
                    </div>
                    <h3 id="education">Education</h3>
                    <div className="education-segment" aria-labelledby="education">
                        <EduBlock
                            title={"MSc in Computer Science"}
                            location={"Ghent University | 2020 - 2023"}
                        />
                        <EduBlock
                            title={"BSc in Computer Science"}
                            location={"Ghent University | 2016 - 2020"}
                        />
                        <EduBlock
                            title={"Science and Mathematics"}
                            location={"Sint-Franciscus-Xaveriusinstituut | 2010 - 2016"}
                        />
                    </div>
                    <h3 id="languages">Languages</h3>
                    <div className="language-segment" aria-labelledby="languages">
                        <LanguageBlock
                            language={"Dutch"}
                            level={"Native"}
                        />
                        <LanguageBlock
                            language={"English"}
                            level={"Professional proficiency"}
                        />
                    </div>
                </div>
            </div>
            <div className="flex-inner-column flex-inner-column-30 p2 portrait-desktop">
                <Portrait/>
            </div>
        </div>
    </section>
)

export default AboutMe
