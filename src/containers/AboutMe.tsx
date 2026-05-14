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
                Software engineer working across C++, Go, TypeScript, and React. I care about clear data flow, useful
                internal tooling, maintainable interfaces, and software that can be operated and extended long after the
                first version ships.
            </p>
            <p>
                I enjoy the unglamorous parts of software: making systems understandable, keeping feedback loops short,
                and making tools easier to operate.
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
                                Software Engineer | 2023 - Present
                            </div>
                            <div className="exp-function">
                                <FontAwesomeIcon className="role-icon" icon={faAngleRight}/>
                                Junior Software Engineer | 2022 - 2023
                            </div>
                            <div className="exp-description">
                                Work on C++ functionality in a mature PDF-processing codebase, balancing feature
                                development with existing architecture and product constraints. Also contribute to
                                frontend modernization, internal Go tooling, and continuous-build workflows.
                            </div>
                            <ul className="exp-bullets">
                                <li>Designed and implemented C++ components for PDF-related processing and feature development.</li>
                                <li>Modernized a large React and TypeScript frontend while preserving product behavior.</li>
                                <li>Built an internal QA reporting platform in Go for automated testing workflows.</li>
                                <li>Maintained Jenkins-based build pipelines for continuous builds.</li>
                            </ul>
                        </div>
                        <div className="exp-block exp-matthys-wines">
                            <div className="exp-title">
                                Matthys Wines
                            </div>
                            <div className="exp-function">
                                <FontAwesomeIcon className="role-icon" icon={faAngleRight}/>
                                Independent Software Engineer | 2019 - 2024
                            </div>
                            <div className="exp-description">
                                Built and operated a Go and React e-commerce platform serving retail and B2B workflows,
                                including ordering, admin tooling, third-party integrations, and production maintenance
                                over roughly five years.
                            </div>
                            <ul className="exp-bullets">
                                <li>Containerized Go services with Docker and Docker Compose.</li>
                                <li>React frontends for retail, B2B, and internal admin tools.</li>
                                <li>Handled deployment, integrations, production support, and ongoing maintenance.</li>
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
                </div>
            </div>
            <div className="flex-inner-column flex-inner-column-30 p2 portrait-desktop">
                <Portrait/>
            </div>
        </div>
    </section>
)

export default AboutMe
