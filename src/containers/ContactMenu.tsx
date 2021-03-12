import React, {FC} from "react"
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faFacebookMessenger, faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface ContactFeatureInterface {
    href: string
    icon: any
    label: string
}

const ContactFeature: FC<ContactFeatureInterface> = p => (
    <div className="contact-feature">
        <a href={p.href} target="_blank" rel="noreferrer">
            <FontAwesomeIcon className="mr-2" icon={p.icon}/>
            <span className="hide-mobile">{p.label}</span>
        </a>
    </div>
)

const ContactMenu: FC = () => (
    <section className="contact">
        <ContactFeature
            label="rudolf@aelbrecht.io"
            href="mailto:rudolf@aelbrecht.io"
            icon={faEnvelope}
        />
        <ContactFeature
            label="aelbrecht@linkedin"
            href="https://www.linkedin.com/in/aelbrecht"
            icon={faLinkedin}
        />
        <ContactFeature
            label="aelbrecht@github"
            href="https://github.com/aelbrecht"
            icon={faGithub}
        />
        <ContactFeature
            label="aelbrechtrudolf@messenger"
            href="http://m.me/aelbrechtrudolf"
            icon={faFacebookMessenger}
        />
    </section>
)

export default ContactMenu
