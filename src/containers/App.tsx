import React, {FC} from 'react'
import MatthysWines from "./MatthysWines"
import SkillList from "./SkillList"
import ContactMenu from "./ContactMenu"
import AboutMe from "./AboutMe"
import HolidaySuites from "./HolidaySuites"
import LandingBanner from "./LandingBanner"
import Link from "./Link"
import {Helmet} from "react-helmet"

const App: FC = () => (
    <div>
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Person",
                    "email": "mailto:rudolf@aelbrecht.io",
                    "image": "https://static.aelbrecht.io/portfolio/rudolf.jpg",
                    "jobTitle": "Student",
                    "name": "Rudolf Aelbrecht",
                    "givenName": "Rudolf",
                    "familyName": "Aelbrecht",
                    "birthDate": "1998-01-19",
                    "url": "https://rudolf.aelbrecht.io"
                })}
            </script>
        </Helmet>
        <LandingBanner/>
        <ContactMenu/>
        <AboutMe/>
        <SkillList/>
        <div className="page-filler" id="experience">
            <div className="flex-columns ">
                <div className="flex-full-column flex-full-column-70 p2">
                    <div className="w100">
                        <h2>My Work</h2>
                        <MatthysWines/>
                        <HolidaySuites/>
                    </div>
                </div>
            </div>
        </div>
        <div style={{height: "3rem"}}/>
        <ContactMenu/>
        <footer>
            &copy; {(new Date()).getFullYear()} Rudolf Aelbrecht
            <span style={{padding: "0 0.5rem"}}>|</span>
            <Link to="https://github.com/aelbrecht/aelbrecht.io">View source</Link>
        </footer>
    </div>
)
export default App
