import React, {FC} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faLink} from "@fortawesome/free-solid-svg-icons"

const MatthysWines: FC = () => (
    <div className="story-body">
        <section className="story-padding">
            <h3 id="matthys-wines" className="work-title work-icon-mw">Matthys Wines</h3>
            <p><b>Freelance | 2019 - 2021</b></p>
            <p className="story-text">
                Over two years, I designed and executed an e-commerce platform's migration to a microservice
                architecture,
                emphasizing scalability and maintainability. Initially, I crafted a bespoke, minimalist front-end using
                React, TypeScript, and Spectre.css, optimizing for both aesthetics and functionality. The intuitive UI
                was
                complemented by a highly responsive product catalog with sophisticated client-side caching for
                instantaneous
                filtering, enhancing the user experience.
                <br/><br/>
                On the payment front, I integrated Europabank for a secure transaction process. The back-end overhaul to
                microservices facilitated streamlined deployments and specialized service management, utilizing Go for
                critical services and TypeScript where third-party integrations were paramount. Furthermore, I devised a
                dynamic document store using MongoDB, JSON Schema, and JSON:API concepts to ensure flexible and
                integrity-assured data management.
                <br/><br/>
                Email communications were another focus, employing MJML for responsive design and Mailgun for delivery,
                significantly reducing spam flagging rates. This comprehensive approach not only modernized Matthys
                Wines'
                digital presence but also set a robust foundation for future expansion and agile development.
            </p>
            <div className="story-link">
                <a
                    href="https://www.matthys-wines.com"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FontAwesomeIcon
                        icon={faLink}
                        style={{
                            fontSize: "0.75rem",
                            marginRight: "0.5rem"
                        }}
                    />
                    www.matthys-wines.com
                </a>
            </div>
        </section>
    </div>
)

export default MatthysWines
