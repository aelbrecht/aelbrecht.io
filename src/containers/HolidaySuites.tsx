import React, {FC} from "react"
import topology from "../images/hs-topology.svg";
import Link from "./Link";

const HolidaySuites: FC = () => (
    <section className="work-story-container">
        <div className="story-body">
            <div className="story-padding">
                <h3 id="holiday-suites" className="work-title work-icon-hs">Holiday Suites</h3>
                <p><b>2016 - 2018 | Web Developer</b></p>
                <p className="story-text">
                    <b>Payment platform integration</b>
                    <br/>
                    When initially working at Holiday Suites my first task was to build a payment page and integrate
                    it into the existing checkout process. Previously a CC form was present on the checkout page, this
                    was replaced with the payment platform of <Link to="https://www.ingenico.com/">Ingenico</Link>.
                    The backend was modified to be able to redirect users to their payment page and confirm the payment
                    with a feedback call.
                </p>
                <p>
                    <b>Internal platform</b>
                    <br/>
                    Expanding on the payment integration I built an admin page on which management could view all
                    transactions and their feedback status. After this I started replacing most components that
                    were part of the WordPress theme by a custom CMS. The features below were added over a
                    time span of two year in PHP, jQuery and MySQL. Currently time Holiday Suites has replaced
                    all front-end with an outsourced solution.
                    <br/>
                </p>
                <p>
                    <b>Promo Codes</b>
                    <br/>
                    Fully customizable promo codes which could be applied with certain restrictions, price ranges,
                    destinations...
                </p>
                <p>
                    <b>Gift Cards</b>
                    <br/>
                    Purchasing of gift cards which would then be sent to the recipient via email. These could be used
                    as promo codes but are applied as a partial payment method.
                </p>
                <p>
                    <b>Events, accommodations and blog posts</b>
                    <br/>
                    A redesign and editor for was created for most important pages to make the browsing experience
                    more enjoyable.
                </p>
                <p>
                    <b>Inventory system</b>
                    <br/>
                    Package deals were introduced which were custom pages on which bookings could be made with
                    certain perks like tickets or free items. The price and inclusion of these items could be fully
                    customized in a pseudo programming languages to limit a booking to a number of constraints. An
                    inventory system kept track of how many items were still in stock to track availability.
                </p>
            </div>
        </div>
        <div className="story-image ">
            <div className="story-padding ">
                <img
                    src={topology}
                    className="story-image-display"
                    alt="hs topology"
                />
                <p>Implemented features overview</p>
                <img
                    src="https://static.aelbrecht.io/portfolio/hs-promo-code.png"
                    className="story-image-display"
                    alt="hs promo code"
                />
                <p>Promo code editor</p>
                <img
                    src="https://static.aelbrecht.io/portfolio/hs-modify.png"
                    className="story-image-display"
                    alt="hs price editor"
                />
                <p>Dynamic price editor</p>
            </div>
        </div>
    </section>
)

export default HolidaySuites
