import SkillList from "./SkillList"
import ContactMenu from "./ContactMenu"
import AboutMe from "./AboutMe"
import LandingBanner from "./LandingBanner"
import Link from "./Link"
import {Helmet} from "react-helmet"
import {FC} from "react";

const description = "Software engineer working with C++, Go, React, and TypeScript across desktop, web, internal tooling, and frontend architecture.";
const siteUrl = "https://rudolf.aelbrecht.io";

const App: FC = () => (
    <div>
        <Helmet>
            <title>Rudolf Aelbrecht | Software Engineer</title>
            <meta name="description" content={description}/>
            <meta property="og:title" content="Rudolf Aelbrecht | Software Engineer"/>
            <meta property="og:description" content={description}/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={siteUrl}/>
            <link rel="canonical" href={siteUrl}/>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Person",
                    "email": "mailto:rudolf@aelbrecht.io",
                    "image": "https://static.aelbrecht.io/portfolio/rudolf-portrait.jpg",
                    "jobTitle": "Software Engineer",
                    "name": "Rudolf Aelbrecht",
                    "givenName": "Rudolf",
                    "familyName": "Aelbrecht",
                    "url": siteUrl,
                    "sameAs": [
                        "https://www.linkedin.com/in/aelbrecht",
                        "https://github.com/aelbrecht"
                    ]
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
