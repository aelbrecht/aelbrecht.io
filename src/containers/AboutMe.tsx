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
                Building high-performance applications across desktop and web. Working with C++ and Go on core
                functionality, data processing, and internal tooling, while leading frontend modernization with React
                and TypeScript.
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
                    <h2>About me</h2>
                    <h3 id="experience">Experience</h3>
                    <div className="experience-segment" aria-labelledby="experience">
                        <div className="exp-block exp-esko">
                            <div className="exp-title">
                                Esko
                            </div>
                            <div className="exp-function">
                                <FontAwesomeIcon className="role-icon" icon={faAngleRight}/>
                                Software Engineer | 2023 - Now
                            </div>
                            <div className="exp-function">
                                <FontAwesomeIcon className="role-icon" icon={faAngleRight}/>
                                Junior Software Engineer | 2022 - 2023
                            </div>
                            <div className="exp-description">
                                Developing C++ components and algorithms for core PDF functionality, designing new
                                features within an existing production system, and leading frontend modernization of a
                                large web-based application using React and TypeScript.
                            </div>
                            <ul className="exp-bullets">
                                <li>C++ components and algorithms for core PDF functionality.</li>
                                <li>Frontend modernization with React and TypeScript.</li>
                                <li>Internal QA reporting platform in Go for automated testing.</li>
                                <li>Jenkins-based build pipelines for continuous builds.</li>
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
                                Built and deployed an e-commerce platform for retail and B2B clients. Designed
                                containerized Go microservices using Docker and Docker Compose, integrated third-party
                                services, developed React frontends, and operated the platform in production for ~5
                                years with minimal downtime.
                            </div>
                            <ul className="exp-bullets">
                                <li>Containerized Go services with Docker and Docker Compose.</li>
                                <li>React frontends for retail, B2B, and internal admin tools.</li>
                                <li>Production operation for ~5 years with minimal downtime.</li>
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
                                Created many internal tools for managing payments, redeemable codes, accommodations,
                                events, inventory and bookings. Integrated payment providers as part of an existing
                                e-commerce site. Built product pages using dynamic pages replacing existing static ones.
                            </div>
                        </div>
                    </div>
                    <h3 id="about-me">Education</h3>
                    <div className="education-segment" aria-labelledby="about-me">
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
