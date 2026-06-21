import ContactMenu from "./ContactMenu"
import LandingBanner from "./LandingBanner"
import {FC} from "react";

const App: FC = () => (
    <div className="site-shell">
        <main className="landing-main">
            <LandingBanner/>
        </main>
        <ContactMenu/>
    </div>
)
export default App
