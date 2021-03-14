import React, {FC} from 'react'
import MatthysWines from "./MatthysWines"
import SkillList from "./SkillList"
import ContactMenu from "./ContactMenu"
import AboutMe from "./AboutMe"
import HolidaySuites from "./HolidaySuites"
import PersonalWork from "./PersonalWork"
import LandingBanner from "./LandingBanner"
import Link from "./Link";

const App: FC = () => (
    <div>
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
                        <PersonalWork/>
                    </div>
                </div>
            </div>
        </div>
        <div style={{height: "3rem"}}/>
        <ContactMenu/>
        <footer>
            &copy; {(new Date()).getFullYear()} Rudolf Aelbrecht
            <span style={{padding: "0 0.5rem"}}>|</span>
            <Link to="https://github.com/aelbrecht/portfolio.aelbrecht.io">View source</Link>
        </footer>
    </div>
)
export default App
