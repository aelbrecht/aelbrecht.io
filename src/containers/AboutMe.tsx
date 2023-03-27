import React, {FC} from "react"

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
            <div className="portrait-birthdate">1998-01-19</div>
        </div>
        <div className="profile-description">
            <p>
                Fascinated by space, science and RISC. Striving to build high-performance applications with clean
                code and minimalist interfaces.
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
            <div className="flex-inner-column flex-inner-column-70 p2" id="about-me">
                <div className="w100">
                    <h2>About me</h2>
                    <h3>Education</h3>
                    <div className="education-segment">
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
                    <h3>Experiences</h3>
                    <div className="experience-segment">
                        <div className="exp-block exp-esko">
                            <div className="exp-title">
                                Esko
                            </div>
                            <div className="exp-function">
                                Junior Software Engineer | 2022 - now
                            </div>
                            <div className="exp-description">
                            </div>
                        </div>
                        <div className="exp-block exp-matthys-wines">
                            <div className="exp-title">
                                Matthys Wines
                            </div>
                            <div className="exp-function">
                                Freelance | 2019 - 2021
                            </div>
                            <div className="exp-description">
                                Designed the front-end for browsing and shopping
                                through an expansive collection of wines. Built a highly scalable back-end as a
                                combination
                                of tiny, purpose-build microservices, each using the language most suited for its task.
                            </div>
                        </div>
                        <div className="exp-block exp-holiday-suites">
                            <div className="exp-title">
                                Holiday Suites
                            </div>
                            <div className="exp-function">
                                Web Developer | 2016 - 2018
                            </div>
                            <div className="exp-description">
                                Created many internal tools for managing payments, redeemable codes, accommodations,
                                events, inventory and bookings. Integrated payment providers as part of an existing
                                e-commerce site. Built product pages using dynamic pages replacing existing static ones.
                            </div>
                        </div>
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
