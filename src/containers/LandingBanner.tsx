import {FC} from "react";

interface MenuItemInterface {
    href: string
    name: string
}

const MenuItem: FC<MenuItemInterface> = p => (
    <a href={p.href} className="banner-link">
        {p.name}
    </a>
)

const LandingBanner: FC = () => (
    <div className="page-filler page-filler-70">
        <div className="flex-columns landing-banner">
            <div className="flex-full-column">
                <div className="element-name">
                    <div className="flex-center">
                        <h1 className="name">Rudolf Aelbrecht</h1>
                        <div className="hero-role">Software Engineer</div>
                        <p className="hero-pitch">
                            C++ · Go · TypeScript · React
                        </p>
                        <p className="hero-meta">
                            PDF functionality, internal tooling, automated testing, and web applications.
                        </p>
                        <nav className="lead banner-nav" aria-label="Sections">
                            <MenuItem href="#experience" name="Experience"/>
                            <MenuItem href="#selected-work" name="Selected Work"/>
                            <MenuItem href="#skills" name="Skills"/>
                            <MenuItem href="#profile" name="Profile"/>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default LandingBanner
