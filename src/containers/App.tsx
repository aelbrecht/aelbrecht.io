import SkillList from "./SkillList"
import ContactMenu from "./ContactMenu"
import AboutMe from "./AboutMe"
import LandingBanner from "./LandingBanner"
import Link from "./Link"
import {Helmet} from "react-helmet"
import {FC} from "react";

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
