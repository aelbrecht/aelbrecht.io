import React, {FC} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCircle, faStar} from "@fortawesome/free-solid-svg-icons"
import {faCircle as faCircleHollow} from "@fortawesome/free-regular-svg-icons"

type BadgeType = [string, number]

const activeSkills: BadgeType[] = [
    ["Go", 4],
    ["Python", 4],
    ["TypeScript", 4],
    ["React", 4],
    ["JavaScript", 3],
    ["CSS/SCSS", 3],
    ["Node.js", 3],
    ["HTML", 3],
    ["React Native", 2],
    ["Docker", 2],
    ["MongoDB", 2],
    ["SQL", 2],
    ["G Analytics", 2],
    ["Arduino", 2],
    ["LaTeX", 2],
    ["Shell Scripting", 2]
]

const passiveSkills: BadgeType[] = [
    ["JetBrains", 3],
    ["Linux/MacOS", 3],
    ["Creative Cloud", 2],
    ["Cloudflare", 2],
    ["Digital Ocean", 2],
    ["GCP", 2],
    ["Sentry.io", 2]
]

const uniSkills: BadgeType[] = [
    ["C", 2],
    ["Java", 2],
    ["OpenCV", 2],
    ["C++", 1],
    ["Assembly", 1],
    ["Spark", 1],
    ["GLFW/OpenGL", 1]
]

const uniSubjects: string[] = [
    "Artificial Intelligence",
    "Computer Vision",
    "Computer Graphics",
    "Functional Programming",
    "Economics of Financial Markets",
    "Information Security"
]

const softSkills: string[] = [
    "Adapting",
    "Independent",
    "Perfectionist",
    "Problem solving",
    "Patient",
    "Trustworthy",
    "Stress-Resistant"
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

const skillTags = (badges: string[]) => {
    const results = badges.map((b) => (
        <div className="single-skill" key={b}>
            <span style={{padding: "0 0.25rem"}}>{b}</span>
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
                <div className="skill-badges">
                    <div className="single-skill">
                                <span style={{paddingRight: "0.25rem"}}>
                                    Most Used
                                </span>
                        {skillBadgeIcon(4)}
                    </div>
                    <div className="single-skill">
                                <span style={{paddingRight: "0.25rem"}}>
                                    Advanced
                                </span>
                        {skillBadgeIcon(3)}
                    </div>
                    <div className="single-skill">
                                <span style={{paddingRight: "0.25rem"}}>
                                    Intermediate
                                </span>
                        {skillBadgeIcon(2)}
                    </div>
                    <div className="single-skill">
                                <span style={{paddingRight: "0.25rem"}}>
                                    Novice
                                </span>
                        {skillBadgeIcon(1)}
                    </div>
                </div>
                <h3 className="mb-0">Active Skills</h3>
                <div className="text-lead">
                    Used in the past year
                </div>
                {skillBadges(activeSkills)}
                <h3 className="mb-0">Passive Skills</h3>
                <div className="text-lead">
                    Actively used programs or environments
                </div>
                {skillBadges(passiveSkills)}
                <h3 className="mb-0">University Skills</h3>
                <div className="text-lead">
                    Used for projects at some point
                </div>
                {skillBadges(uniSkills)}
                <h3 className="mb-0">University Courses</h3>
                <div className="text-lead">
                    Notable or favorite university courses
                </div>
                {skillTags(uniSubjects)}
                <h3 className="mb-0">Soft skills</h3>
                {skillTags(softSkills)}
            </div>
        </div>
    </section>
)

export default SkillList
