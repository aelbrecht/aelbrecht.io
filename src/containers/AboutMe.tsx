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
                Fascinated by space, science and computers. Striving to build applications with clean code and
                minimalistic interfaces. Currently studying Computer Science and working on professional
                projects in my free time.
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
                            location={"Ghent University | 2020"}
                        />
                        <EduBlock
                            title={"BSc in Computer Science"}
                            location={"Ghent University | 2016"}
                        />
                        <EduBlock
                            title={"Science and Mathematics"}
                            location={"Sint-Franciscus-Xaveriusinstituut | 2010"}
                        />
                    </div>
                    <h3>Experiences</h3>
                    <div className="experience-segment">
                        <div className="exp-block exp-matthys-wines">
                            <div className="exp-title">
                                Matthys Wines
                            </div>
                            <div className="exp-function">
                                Full Stack Developer | 2019 - 2021
                            </div>
                            <div className="exp-description">
                                Created a custom e-commerce platform to be scalable and maintainable
                                by a single person. Designed front-end, implemented logic to filter an expansive
                                collection of wines in real time and deployed the platform as a cluster of
                                microservices.
                                <br/>
                                <a href="#matthys-wines">Read more</a>
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
                                Responsible for creating an internal platform that managed web payments, promo codes
                                and gift cards. Expanded on this by reworking existing destination pages with a
                                cleaner and interactive layout adding features like package creation with an
                                accompanied inventory management system.
                                <br/>
                                <a href="#holiday-suites">Read more</a>
                            </div>
                        </div>
                    </div>
                    <h3>Languages</h3>
                    <table className="language-segment">
                        <tbody>
                        <tr>
                            <td>Dutch</td>
                            <td className="lang-stat lang-good">good</td>
                        </tr>
                        <tr>
                            <td>English</td>
                            <td className="lang-stat lang-good">good</td>
                        </tr>
                        <tr>
                            <td>Russian</td>
                            <td className="lang-stat lang-bad">basics</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex-inner-column flex-inner-column-30 p2 portrait-desktop">
                <Portrait/>
            </div>
        </div>
    </section>
)

export default AboutMe
