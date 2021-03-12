import React, {FC} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons";
import mwTopology from "../images/mw-topology.svg";
import Link from "./Link";

const MatthysWines: FC = () => (
    <section className="work-story-container">
        <div className="story-body">
            <div className="story-padding">
                <h3 id="matthys-wines" className="work-title work-icon-mw">Matthys Wines</h3>
                <p className="story-text">
                    I've been working part-time at Matthys Wines for around two years. Building a
                    new online store during the first year and expanding on that with a custom built
                    platform in the second. This platform had 3 basic principles in mind:
                    expandability, maintainability and scalability. Working alone on this project
                    meant I had to plan in advance how to achieve this balance with limited
                    resources and time.
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
                <p className="mt-0">
                    <b>Styling</b>
                    <br/>
                    A web store was built from scratch using React
                    with <Link to="https://picturepan2.github.io/spectre/">Spectre</Link> as the
                    styling framework. Minimalism accompanied by images and
                    iconography make up the style of the site. Expanding on the styling framework
                    a house style was created for a digital store front with a focus on telling
                    the stories for a global catalogue of wines. Responsiveness was considered at
                    every step in the design process.
                </p>
                <p>
                    <b>Accounts and Members</b>
                    <br/>
                    Using <Link to="https://auth0.com/">Auth0</Link> it was possible to quickly
                    deploy accounts which users can use to view past orders. For Horeca a
                    members-only catalogue and checkout was created to digitalized their ordering
                    process.
                </p>
                <p>
                    <b>Lightning fast catalogue</b>
                    <br/>
                    By using extensive client-side caching
                    a <Link to="https://www.matthys-wines.com/en/wines">product catalogue</Link> was
                    created which
                    can be filtered instantly giving users the flexibility of searching without
                    having to wait on server round trips.
                </p>
                <p>
                    <b>Payment system</b>
                    <br/>
                    An external <Link to="https://www.europabank.be/">payment platform</Link> was
                    integrated into the front-end which sends it
                    feedback securely to the backend to create a tamper-proof payment system.
                </p>
                <p>
                    <b>High level admin panel</b>
                    <br/>
                    In order to reduce the amount of work new edit pages cost while adding features
                    a lot of high level components were created to make a highly customizable
                    and easy to implement admin panel. In total the admin panel is only a couple
                    thousand lines long but is able to manipulate all multilingual content of
                    the web store.
                </p>
                <h4 className="mb-1">Back-End</h4>
                <p className="mt-0">
                    <b>Microservices</b>
                    <br/>
                    The back-end is structured as a web of microservices giving the advantage of
                    having a small and clean code base for each core functionality of the platform.
                    Docker Compose runs all containers for its simplicity and ability to be quickly setup and deployed.
                    Go is used for the larger part of the microservices. Having code that is
                    strictly typed reduced the amount of bugs and sped up development time
                    significantly. Libraries which were faster or easier to implement in Node.js
                    were setup as their own single purpose microservice.
                </p>
                <p>
                    <b>Configuration free cms</b>
                    <br/>
                    In order to make development faster a custom service was developed
                    using <Link to="https://www.mongodb.com/">MongoDB</Link> and <Link
                    to="https://json-schema.org/">JSON Schema</Link> which can be supplied a list
                    of JSON Schema documents and dynamically sets up endpoints that are used
                    by the whole platform to read and write indirectly to MongoDB. This makes
                    it possible to create custom filtering behaviour and handle permissions through
                    the authorization service.
                </p>
                <p>
                    <b>Email</b>
                    <br/>
                    Mail for order confirmations and occasional newsletters are design using
                    the <Link to="https://mjml.io/">MJML</Link> markup language. These are converted
                    to HTML documents using its open-source library and sent with
                    the <Link to="https://www.mailgun.com/">Mailgun API</Link> giving us a high
                    success rate of not being flagged as spam (as compared to generating emails
                    using a drag-and-drop builder). Tracking interactions also gives a good idea
                    of the engagement a given newsletter provides.
                </p>
            </div>
        </div>
        <div className="story-image ">
            <div className="story-padding ">
                <img
                    src={mwTopology}
                    className="story-image-display"
                    alt="country editor"
                />
                <p>Topology overview</p>
                <img
                    src="https://static.aelbrecht.io/portfolio/mw-country-editor.png"
                    className="story-image-display"
                    alt="country editor"
                />
                <p>Admin panel editor</p>
                <img
                    src="https://static.aelbrecht.io/portfolio/mw-country-editor-code.png"
                    className="story-image-display"
                    alt="country editor code"
                />
                <p>High level admin panel code</p>
            </div>
        </div>
    </section>
)

export default MatthysWines
