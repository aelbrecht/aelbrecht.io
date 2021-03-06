import {
    faCss3,
    faDocker,
    faFacebookMessenger,
    faGithub,
    faHtml5,
    faJava, faJs,
    faLinkedin,
    faNodeJs,
    faPhp,
    faPython,
    faReact
} from '@fortawesome/free-brands-svg-icons';
import {faCode, faEnvelope, faTerminal} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {FC} from 'react';
import './App.scss';


interface ContactFeatureInterface {
    href: string
    icon: any
    label: string
}

const ContactFeature: FC<ContactFeatureInterface> = p => (
    <div className="contact-feature">
        <a href={p.href} target="_blank" rel="noreferrer">
            <FontAwesomeIcon className="mr-2" icon={p.icon}/>
            <span className="hide-mobile">{p.label}</span>
        </a>
    </div>
)

const ContactBar: FC = () => (
    <section className="contact">
        <ContactFeature
            label="rudolf@aelbrecht.io"
            href="mailto:rudolf@aelbrecht.io"
            icon={faEnvelope}
        />
        <ContactFeature
            label="aelbrecht@linkedin"
            href="https://www.linkedin.com/in/aelbrecht"
            icon={faLinkedin}
        />
        <ContactFeature
            label="aelbrecht@github"
            href="https://github.com/aelbrecht"
            icon={faGithub}
        />
        <ContactFeature
            label="aelbrechtrudolf@messenger"
            href="http://m.me/aelbrechtrudolf"
            icon={faFacebookMessenger}
        />
    </section>
)

interface MenuItemInterface {
    href: string
    name: string
    prefix: string
}

const MenuItem: FC<MenuItemInterface> = p => (
    <a href={p.href} className="banner-link">
        <span style={{fontSize: "0.8rem"}}>{p.prefix}</span> {p.name}
    </a>
)

type BadgeType = [string, number, any]

const activeSkills: BadgeType[] = [
    ["React", 4, faReact],
    ["TypeScript", 4, "typescript"],
    ["JavaScript", 3, faJs],
    ["CSS/SCSS", 3, faCss3],
    ["Node.js", 3, faNodeJs],
    ["Python", 4, faPython],
    ["Go", 4, "go"],
    ["HTML5", 3, faHtml5],
    ["Docker & Docker Compose", 2, faDocker],
    ["MongoDB", 2, "mongodb"],
    ["PostgreSQL", 2, "postgres"],
    ["Google Analytics", 2, "analytics"],
    ["Shell Scripting", 1, "unix"],
    ["S3", 1, "s3"],
]

const passiveSkills: BadgeType[] = [
    ["Unix", 3, ""],
    ["JetBrains Suite", 3, ""],
    ["Final Cut Pro", 2, ""],
    ["Adobe Suite", 2, ""],
    ["Office Suite", 2, ""],
    ["Unit Testing", 2, ""],
    ["Autodesk Fusion", 1, ""],
]

const pastSkills: BadgeType[] = [
    ["C", 2, ""],
    ["Java", 2, ""],
    ["Arduino", 2, ""],
    ["C++", 1, ""],
    ["Assembly", 1, ""],
    ["Google Optimize", 1, ""],
]

const otherSkills: BadgeType[] = [
    ["MySQL", 2, ""],
    ["PHP", 2, ""],
    ["jQuery", 2, ""],
]

const App: FC = () => (
    <div>
        <div className="page-filler page-filler-70">
            <div className="flex-columns landing-banner">
                <div className="flex-full-column">
                    <div className="element-name">
                        <div className="flex-center">
                            <div className="lead">
                                developer
                            </div>
                            <h1 className="name">Rudolf Aelbrecht</h1>
                            <div className="lead">
                                <MenuItem href="#about-me" name="about me" prefix="001"/>
                                <br/>
                                <MenuItem href="#skills" name="skill" prefix="010"/>
                                <br/>
                                <MenuItem href="#experience" name="my work" prefix="011"/>
                                <br/>
                                <MenuItem href="#contact" name="contact" prefix="100"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ContactBar/>

        <div className="page-filler">
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
                                    1y - Full Stack Developer
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
                            <tr>
                                <td>French</td>
                                <td className="lang-stat lang-bad">partially read / use translator</td>
                            </tr>
                            <tr>
                                <td>Russian</td>
                                <td className="lang-stat lang-bad">partially understand / use translator</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex-inner-column flex-inner-column-30 p2 portrait-desktop">
                    <Portrait/>
                </div>
            </div>
        </div>

        <div className="page-filler" id="skills">
            <div className="flex-columns ">
                <div className="flex-full-column p2">
                    <div className="w100">
                        <h2>Skills</h2>
                        <h3 className="mb-0">Current Skills</h3>
                        <div className="text-lead">
                            Used in the past year.
                        </div>
                        {skillBadges(activeSkills)}
                        <h3 className="mb-0">Passive Skills</h3>
                        <div className="text-lead">
                            Actively used programs or environments.
                        </div>
                        {skillBadges(passiveSkills)}
                        <h3 className="mb-0">Past Skills</h3>
                        <div className="text-lead">
                            Used for a project at some point.
                        </div>
                        {skillBadges(pastSkills)}
                        <h3 className="mb-0">Other skill</h3>
                        <div className="text-lead">
                            Used for project in the past but moved on from.
                        </div>
                        {skillBadges(otherSkills)}
                    </div>
                </div>
            </div>
        </div>


        <div className="page-filler" id="experience">
        </div>

    </div>
)

const skillBadgeIcon = (level: number) => {
    const rings = []


}

const skillBadges = (badges: BadgeType[]) => {
    const results = badges.map((b) => (
        <div className="single-skill">
            {typeof b[2] === "string" ? ((b[2] === "") ? null :
                    (<div className={"skill-icon icon-" + b[2]}/>)
            ) : (
                <FontAwesomeIcon style={{fontSize: "0.85rem", marginRight: "0.5rem"}} icon={b[2]}/>
            )}
            {b[0]}
        </div>

    ))
    return (
        <div className="skill-badges">
            {results}
        </div>
    )
}

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
                WIP
                <br/>
                Student of computers and enthusiast for science.
                <br/>
                <br/>
                - Mostly building microservices, web applications and bringing them to life.
                <br/>
                - UI and 2D graphics design is my passion.
                <br/>
                - Go, Python and TypeScript are my language.
                <br/>
                <br/>
                Currently studying Computer Science and working on professional projects in my free time.
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

export default App;
