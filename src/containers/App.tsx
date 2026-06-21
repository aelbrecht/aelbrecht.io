import ContactMenu from "./ContactMenu"
import LandingBanner from "./LandingBanner"
import {Helmet} from "react-helmet"
import {FC} from "react";

const description = "Rudolf Aelbrecht, software engineer working with C++, Go, TypeScript, and React.";
const siteUrl = "https://rudolf.aelbrecht.io";

const App: FC = () => (
    <div className="site-shell">
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
        <main className="landing-main">
            <LandingBanner/>
        </main>
        <ContactMenu/>
    </div>
)
export default App
