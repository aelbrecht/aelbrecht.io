import {faFacebookMessenger, faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {FC} from 'react';
import './App.scss';

const ContactBar = () => (
    <section className="contact">
        <div className="contact-feature">
            <a href="mailto:rudolf@aelbrecht.io" target="_blank" rel="noreferrer">
                <FontAwesomeIcon className="mr-2" icon={faEnvelope}/>
                <span className="hide-mobile">rudolf@aelbrecht.io</span>
            </a>
        </div>
        <div className="contact-feature">
            <a href="https://www.linkedin.com/in/aelbrecht" target="_blank" rel="noreferrer">
                <FontAwesomeIcon className="mr-2" icon={faLinkedin}/>
                <span className="hide-mobile">aelbrecht@linkedin</span>
            </a>
        </div>
        <div className="contact-feature">
            <a href="https://github.com/aelbrecht" target="_blank" rel="noreferrer">
                <FontAwesomeIcon className="mr-2" icon={faGithub}/>
                <span className="hide-mobile">aelbrecht@github</span>
            </a>
        </div>
        <div className="contact-feature">
            <a href="http://m.me/aelbrechtrudolf" target="_blank" rel="noreferrer">
                <FontAwesomeIcon className="mr-2" icon={faFacebookMessenger}/>
                <span className="hide-mobile">aelbrechtrudolf@messenger</span>
            </a>
        </div>
    </section>
)

function App() {
    return (
        <div className="App">
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
                                    <a href="#about-me" className="banner-link">
                                        <span style={{fontSize: "0.8rem"}}>
                                        001
                                    </span> about me
                                    </a>
                                    <br/>
                                    <a href="#skills" className="banner-link">
                                    <span style={{fontSize: "0.8rem"}}>
                                        010
                                    </span> skill
                                    </a>
                                    <br/>
                                    <a href="#experience" className="banner-link">
                                    <span style={{fontSize: "0.8rem"}}>
                                        011
                                    </span> my work
                                    </a>
                                    <br/>
                                    <a href="#contact" className="banner-link">
                                    <span style={{fontSize: "0.8rem"}}>
                                        100
                                    </span> contact
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ContactBar/>

            <div className="page-filler" id="about-me">
                <div className="flex-columns ">
                    <div className="flex-inner-column flex-inner-column-30 p2 portrait-mobile">
                        <Portrait/>
                    </div>
                    <div className="flex-inner-column flex-inner-column-70 p2">
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
                            <h3>Experience</h3>
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
                        </div>
                    </div>
                    <div className="flex-inner-column flex-inner-column-30 p2 portrait-desktop">
                        <Portrait/>
                    </div>
                </div>
            </div>
            <div className="page-filler" id="skills">
            </div>
        </div>
    );
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
    </div>
)

const EduBlock: FC<{ title: string, location: string }> = ({title, location}) => (
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
