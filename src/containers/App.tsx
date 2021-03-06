import {faFacebookMessenger, faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import './App.css';

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
                                    </span> experience
                                    </a>
                                    <br/>
                                    <a href="#education" className="banner-link">
                                    <span style={{fontSize: "0.8rem"}}>
                                        100
                                    </span> education
                                    </a>
                                    <br/>
                                    <a href="#contact" className="banner-link">
                                    <span style={{fontSize: "0.8rem"}}>
                                        101
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
                    <div className="flex-inner-column">
                        <h2>About me</h2>
                    </div>
                    <div className="flex-inner-column">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
