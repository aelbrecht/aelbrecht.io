import {faFacebookMessenger, faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {faCircle, faEnvelope, faLink, faStar} from '@fortawesome/free-solid-svg-icons';
import {faCircle as faCircleHollow} from '@fortawesome/free-regular-svg-icons';
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

type BadgeType = [string, number]

const activeSkills: BadgeType[] = [
    ["Go", 4],
    ["Python", 4],
    ["TypeScript", 4],
    ["React", 4],
    ["JavaScript", 3],
    ["CSS/SCSS", 3],
    ["Node.js", 3],
    ["HTML", 3],
    ["Docker", 2],
    ["MongoDB", 2],
    ["PostgreSQL", 2],
    ["G Analytics", 2],
    ["Shell Scripting", 1],
    ["S3", 1],
]

const passiveSkills: BadgeType[] = [
    ["JetBrains", 3],
    ["Unix", 3],
    ["Final Cut Pro", 2],
    ["Creative Cloud", 2],
    ["Unit Testing", 2],
    ["Cloudflare", 2],
    ["Digital Ocean", 2],
    ["Office", 2],
    ["Sentry.io", 2],
    ["GCP", 1],
    ["Fusion 360", 1],
]

const pastSkills: BadgeType[] = [
    ["C", 2],
    ["Java", 2],
    ["Arduino", 2],
    ["C++", 1],
    ["Assembly", 1]
]

const otherSkills: BadgeType[] = [
    ["MySQL", 2],
    ["PHP", 2],
    ["jQuery", 2],
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
        </div>

        <div id="skills">
            <div className="flex-columns ">
                <div className="flex-full-column flex-full-column-70 p2">
                    <div className="w100">
                        <h2>Skills</h2>
                        <div className="skill-badges">
                            <div className="single-skill">
                                <span style={{paddingRight: "0.25rem"}}>
                                    Most Used
                                </span>
                                {skillBadgeIcon(4)}
                            </div>
                            <div className="single-skill">
                                <span style={{paddingRight: "0.25rem"}}>
                                    Advanced
                                </span>
                                {skillBadgeIcon(3)}
                            </div>
                            <div className="single-skill">
                                <span style={{paddingRight: "0.25rem"}}>
                                    Intermediate
                                </span>
                                {skillBadgeIcon(2)}
                            </div>
                            <div className="single-skill">
                                <span style={{paddingRight: "0.25rem"}}>
                                    Novice
                                </span>
                                {skillBadgeIcon(1)}
                            </div>
                        </div>
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


        <div className="page-filler">
            <div className="flex-columns ">
                <div className="flex-full-column flex-full-column-70 p2">
                    <div className="w100">
                        <h2>My Work</h2>
                        <div className="work-story-container">
                            <div className="story-body">
                                <div className="story-padding">
                                    <h3 className="work-title work-icon-mw">Matthys Wines</h3>
                                    <p className="story-text">
                                        I've been working part-time at Matthys Wines for around two years. Building a
                                        new online store during the first year and expanding on that with a custom built
                                        platform in the second. This platform had 3 basic principles in mind:
                                        expandability, maintainability and scalability. Working alone on this project
                                        meant I had to plan in advance how to achieve this balance with limited
                                        resources and time.
                                    </p>
                                    <div className="story-link">
                                        <a
                                            href="https://www.matthys-wines.com"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <FontAwesomeIcon
                                                icon={faLink}
                                                style={{
                                                    fontSize: "0.75rem",
                                                    marginRight: "0.5rem"
                                                }}
                                            />
                                            www.matthys-wines.com
                                        </a>
                                    </div>
                                    <h4 className="mb-1">Front-End</h4>
                                    <p className="mt-0">
                                        <b>Styling</b>
                                        <br/>
                                        A web store was built from scratch using React
                                        with <Link to="https://picturepan2.github.io/spectre/">Spectre</Link> as the
                                        styling framework. Minimalism accompanied by images and
                                        iconography make up the style of the site. Expanding on the styling framework
                                        a house style was created for a digital store front with a focus on telling
                                        the stories for a global catalogue of wines. Responsiveness was considered at
                                        every step in the design process.
                                    </p>
                                    <p>
                                        <b>Accounts and Members</b>
                                        <br/>
                                        Using <Link to="https://auth0.com/">Auth0</Link> it was possible to quickly
                                        deploy accounts which users can use to view past orders. For Horeca a
                                        members-only catalogue and checkout was created to digitalized their ordering
                                        process.
                                    </p>
                                    <p>
                                        <b>Lightning fast catalogue</b>
                                        <br/>
                                        By using extensive client-side caching
                                        a <Link to="https://www.matthys-wines.com/en/wines">product catalogue</Link> was
                                        created which
                                        can be filtered instantly giving users the flexibility of searching without
                                        having to wait on service round trips.
                                    </p>
                                    <p>
                                        <b>Payment system</b>
                                        <br/>
                                        An external <Link to="https://www.europabank.be/">payment platform</Link> was
                                        integrated into the front-end which sends it
                                        feedback securely to the backend to create a tamper-proof payment system.
                                    </p>
                                    <p>
                                        <b>High level admin panel</b>
                                        <br/>
                                        In order to reduce the amount of work new edit pages cost while adding features
                                        a lot of high level components were created to make a highly customizable
                                        and easy to implement admin panel. In total the admin panel is only a couple
                                        thousand lines long but is able to manipulate all multilingual content of
                                        the web store.
                                    </p>
                                    <h4 className="mb-1">Back-End</h4>
                                    <p className="mt-0">
                                        <b>Microservices</b>
                                        <br/>
                                        The back-end is structured as a web of microservices. Giving the advantage of
                                        having a small and clean code base for each core functionality of the platform.
                                        Go is used for the larger part of the microservices. Having code that is
                                        strictly typed reduced the amount of bugs and sped up development time
                                        significantly. Libraries which were faster or easier to implement in Node.js
                                        were setup as their own single purpose microservice.
                                    </p>
                                    <p>
                                        <b>Configuration free cms</b>
                                        <br/>
                                        In order to make development faster a custom service was developed
                                        using <Link to="https://www.mongodb.com/">MongoDB</Link> and <Link
                                        to="https://json-schema.org/">JSON Schema</Link> which can be supplied a list
                                        of JSON Schema documents and dynamically sets up endpoints that are used
                                        by the whole platform to read and write indirectly to MongoDB. This makes
                                        it possible to create custom filtering behaviour and handle permissions through
                                        the authorization service.
                                    </p>
                                    <p>
                                        <b>Email</b>
                                        <br/>
                                        Mail for order confirmations and occasional newsletters are design using
                                        the <Link to="https://mjml.io/">MJML</Link> markup language. These are converted
                                        to HTML documents using its open-source library and sent with
                                        the <Link to="https://www.mailgun.com/">Mailgun API</Link> giving us a high
                                        success rate of not being flagged as spam (as compared to generating emails
                                        using a drag-and-drop builder). Tracking interactions also gives a good idea
                                        of the engagement a given newsletter provides.
                                    </p>
                                </div>
                            </div>
                            <div className="story-padding story-image ">
                                <div className="story-image-display image-mw-1"/>
                                <p>Topology overview</p>
                                <img
                                    src="https://static.aelbrecht.io/portfolio/mw-country-editor.png"
                                    className="story-image-display"
                                />
                                <p>Admin panel - Country editor</p>
                                <img
                                    src="https://static.aelbrecht.io/portfolio/mw-country-editor-code.png"
                                    className="story-image-display"
                                />
                                <p>Country editor code</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="page-filler">
        </div>

    </div>
)

const Link: FC<{ to: string }> = ({to, children}) => (
    <a
        href={to}
        target="_blank"
        rel="noreferrer"
    >{children}</a>
)

const skillBadgeIcon = (level: number) => {
    const rings = []
    if (level === 4) {
        return (
            <FontAwesomeIcon className={"skill-star"} icon={faStar}/>
        )
    } else {
        for (let i = 0; i < level; i++) {
            rings.push(
                <FontAwesomeIcon className={`skill-level skill-level-${level}`} icon={faCircle}/>
            )
        }
        for (let i = 0; i < 3 - level; i++) {
            rings.push(
                <FontAwesomeIcon className={`skill-level skill-level-${level}`} icon={faCircleHollow}/>
            )
        }
    }
    return rings
}

const skillBadges = (badges: BadgeType[]) => {
    const results = badges.map((b) => (
        <div className="single-skill">
            <span style={{paddingRight: "0.25rem"}}>{b[0]}</span>{skillBadgeIcon(b[1])}
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
