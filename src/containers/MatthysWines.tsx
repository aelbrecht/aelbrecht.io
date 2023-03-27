import React, {FC} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faLink} from "@fortawesome/free-solid-svg-icons"
import Link from "./Link"

const MatthysWines: FC = () => (
    <div className="story-body">
        <section className="story-padding">
            <h3 id="matthys-wines" className="work-title work-icon-mw">Matthys Wines</h3>
            <p><b>Freelance | 2019 - 2021</b></p>
            <p className="story-text">
                Built an e-commerce platform during the first year and expanded its features while migrating to a
                microservice architecture in the second. To make this project achievable by a single
                developer, expandability, maintainability and scalability were considered at every step in the
                development process. Using an agile approach, a digital wine shop was created that brings a world
                of wines and their stories together while maintaining a clean and responsive layout.
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
            <h4 className="mb-1">Front-End</h4>
            <h5 className="mb-0">Styling | 2019 </h5>
            <p className="story-text">
                The layout was designed and coded from scratch using the styling
                framework <Link to="https://picturepan2.github.io/spectre/">Spectre.css</Link> as a base. The whole
                frontend uses React and TypeScript for readability and type checking. Expanding on the framework,
                minimalism combined with images and iconography make up the styling of the site to strike
                a balance between information and usability.
            </p>
            <h5 className="mb-0">Lightning-fast catalogue | 2019</h5>
            <p className="story-text">
                By using extensive client-side caching,
                a <Link to="https://www.matthys-wines.com/en/wines">product catalog</Link> was
                created which
                can be filtered instantly, giving users the flexibility of searching without
                having to wait on server round trips.
            </p>
            <h5 className="mb-0">Payment system | 2019</h5>
            <p className="story-text">
                <Link to="https://www.europabank.be/">Europabank</Link> was integrated into the platform, providing
                a secure and tamper-proof payment system.
            </p>
            <h4 className="mb-1">Back-End</h4>
            <h5 className="mb-0">Microservices | 2021</h5>
            <p className="story-text">
                The back-end is structured as a collection of microservices, giving the advantage of
                having multiple small code bases for each core functionality of the platform that can be easily
                deployed using Docker Compose.
                Services are written in Go or TypeScript using Go for important services and TypeScript where
                specific third-party libraries are needed or when non-strictly typed code greatly reduced
                development time.
            </p>
            <h5 className="mb-0">Dynamic document store | 2020</h5>
            <p className="story-text">
                A custom service was developed as a layer on top
                of <Link to="https://www.mongodb.com/">MongoDB</Link> to remove the need of statically defined
                databases tables. Using <Link to="https://json-schema.org/">JSON Schema</Link> and core ideas from
                the <Link to="https://jsonapi.org/">JSON:API</Link>, a list of schemas are used to dynamically
                set up endpoints at runtime, which validates all incoming documents and guarantees data integrity.
            </p>
            <h5 className="mb-0">Email | 2020</h5>
            <p className="story-text">
                Order confirmations and occasional newsletters are designed
                using <Link to="https://mjml.io/">MJML</Link> and converted
                to HTML when sent with <Link to="https://www.mailgun.com/">Mailgun</Link>. In practice, this gave a
                high success rate of getting flagged as spam as compared to generating emails
                using a drag-and-drop builder.
            </p>
        </section>
    </div>
)

export default MatthysWines
