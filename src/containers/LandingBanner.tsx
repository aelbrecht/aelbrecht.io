import React, {FC} from "react"

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

const randomTitles: string[] = [
    "redstone engineer",
    "cstring to stdstring translator",
    "duplicate symbol investigator",
    "deferrer of writing unit tests",
    "ninja install forgetter",
    "consumer of file descriptors",
    "tar xzvf",
    "yarn install",
    "starting version xxx.xx-x-arch",
    "lambda expressionist",
    "exit code specialist",
    "RelWithDebInfo debugger"
]
const titleIndex = Math.round(Math.random() * (randomTitles.length - 1));

const LandingBanner: FC = () => (
    <div className="page-filler page-filler-70">
        <div className="flex-columns landing-banner">
            <div className="flex-full-column">
                <div className="element-name">
                    <div className="flex-center">
                        <div className="lead">
                            {randomTitles[titleIndex].toLowerCase()}
                        </div>
                        <h1 className="name">Rudolf Aelbrecht</h1>
                        <div className="lead">
                            <MenuItem href="#about-me" name="about me" prefix="001"/>
                            <br/>
                            <MenuItem href="#skills" name="skill" prefix="010"/>
                            <br/>
                            <MenuItem href="#experience" name="my work" prefix="011"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default LandingBanner
