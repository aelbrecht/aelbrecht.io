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
                            location={"2020 - Ghent University"}
                        />
                        <EduBlock
                            title={"BSc in Computer Science"}
                            location={"2016 - Ghent University"}
                        />
                        <EduBlock
                            title={"Science and Mathematics"}
                            location={"2014 - Sint-Franciscus-Xaveriusinstituut"}
                        />
                        <EduBlock
                            title={"Economics"}
                            location={"2012 - Sint-Franciscus-Xaveriusinstituut"}
                        />
                        <EduBlock
                            title={"Latin"}
                            location={"2010 - Sint-Franciscus-Xaveriusinstituut"}
                        />
                    </div>
                    <h3>Experiences</h3>
                    <div className="experience-segment">
                        <div className="exp-block exp-matthys-wines">
                            <div className="exp-title">
                                Matthys Wines
                            </div>
                            <div className="exp-function">
                                2y - Full Stack Developer
                            </div>
                            <div className="exp-description">
                                Creating a custom e-commerce platform to be scalable and maintainable
                                by a single person. Implementing logic to filter a huge assortment of wine and
                                give instant recommendations.
                                <br/>
                                <a href="#matthys-wines">Read more</a>
                            </div>
                        </div>
                        <div className="exp-block exp-holiday-suites">
                            <div className="exp-title">
                                Holiday Suites
                            </div>
                            <div className="exp-function">
                                2y - Web Developer
                            </div>
                            <div className="exp-description">
                                Responsible for adding a payment system to an existing web platform. Continuing
                                to work on the web-booking logic by adding an inventory system and
                                reworking front-end design.
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
