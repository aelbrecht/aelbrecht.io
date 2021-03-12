import React, {FC} from 'react';
import './App.scss';
import MatthysWines from "./MatthysWines";
import SkillList from "./SkillList";
import ContactMenu from "./ContactMenu";
import AboutMe from "./AboutMe";
import HolidaySuites from "./HolidaySuites";

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


const App: FC = () => (
    <div>
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
                                <MenuItem href="#about-me" name="about me" prefix="001"/>
                                <br/>
                                <MenuItem href="#skills" name="skill" prefix="010"/>
                                <br/>
                                <MenuItem href="#experience" name="my work" prefix="011"/>
                                <br/>
                                <MenuItem href="#contact" name="contact" prefix="100"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
    </div>
)
export default App;
