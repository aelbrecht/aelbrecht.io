import React, {FC} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCircle, faStar} from "@fortawesome/free-solid-svg-icons"
import {faCircle as faCircleHollow} from "@fortawesome/free-regular-svg-icons"

type BadgeType = [string, number]

const activeSkills: BadgeType[] = [
    ["Go", 4],
    ["Python", 4],
    ["C++", 3],
]

const passiveSkills: BadgeType[] = [
    ["Unix", 4],
    ["Docker", 3],
    ["Cloudflare", 2],
    ["Compute Engine", 2],
    ["Droplets", 2],
    ["Creative Cloud", 2],
]

const recentSkills: BadgeType[] = [
    ["React", 4],
    ["TypeScript", 4],
    ["SCSS", 3],
    ["MongoDB", 2],
    ["SQL", 2],
    ["C", 2],
    ["Arduino", 2],
    ["CMake", 1],
]

const uniSkills: BadgeType[] = [
    ["OpenCV", 2],
    ["Assembly", 2],
    ["Keras", 1],
]

const skillBadges = (badges: BadgeType[]) => {
    const results = badges.map((b) => (
        <div className="single-skill" key={b[0]}>
            <span style={{paddingRight: "0.25rem"}}>{b[0]}</span>{skillBadgeIcon(b[1])}
        </div>
    ))
    return (
        <div className="skill-badges">
            {results}
        </div>
    )
}

const skillBadgeIcon = (level: number) => {
    const rings = []
    if (level === 4) {
        return (
            <FontAwesomeIcon className={"skill-star"} icon={faStar}/>
        )
    } else {
        for (let i = 0; i < level; i++) {
            rings.push(
                <FontAwesomeIcon key={"j-" + i} className={`skill-level skill-level-${level}`} icon={faCircle}/>
            )
        }
        for (let i = 0; i < 3 - level; i++) {
            rings.push(
                <FontAwesomeIcon key={"i-" + i} className={`skill-level skill-level-${level}`} icon={faCircleHollow}/>
            )
        }
    }
    return rings
}

const SkillList: FC = () => (
    <section className="flex-columns" id="skills">
        <div className="flex-full-column flex-full-column-70 p2">
            <div className="w100">
                <h2>Skills</h2>
                <h3 className="mb-0">Active Skills</h3>
                <div className="text-lead">
                    from working in a professional context
                </div>
                {skillBadges(activeSkills)}
                <h3 className="mb-0">Recent Skills</h3>
                <div className="text-lead">
                    from past work experiences
                </div>
                {skillBadges(recentSkills)}
                <h3 className="mb-0">Passive Skills</h3>
                <div className="text-lead">
                    from spending many hours with given topic
                </div>
                {skillBadges(passiveSkills)}
                <h3 className="mb-0">University Skills</h3>
                <div className="text-lead">
                    that still peak my interest
                </div>
                {skillBadges(uniSkills)}
            </div>
        </div>
    </section>
)

export default SkillList
