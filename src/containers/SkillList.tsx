import React, {FC} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCircle, faStar} from "@fortawesome/free-solid-svg-icons"
import {faCircle as faCircleHollow} from "@fortawesome/free-regular-svg-icons"

type BadgeType = [string, number]

const activeSkills: BadgeType[] = [
    ["Go", 4],
    ["Python", 4],
    ["C++", 4],
]

const passiveSkills: BadgeType[] = [
    ["Unix", 0],
    ["Docker", 0],
    ["Cloudflare", 0],
]

const recentSkills: BadgeType[] = [
    ["React", 0],
    ["TypeScript", 0],
    ["SCSS", 0],
    ["MongoDB", 0],
    ["CMake", 0],
    ["Arduino", 0],
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

    if (level === 0)
        return null

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
            </div>
        </div>
    </section>
)

export default SkillList
