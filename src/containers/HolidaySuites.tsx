import React, {FC} from "react"

const HolidaySuites: FC = () => (
    <div className="story-body">
        <section className="story-padding">
            <h3 id="holiday-suites" className="work-title work-icon-hs">Holiday Suites</h3>
            <p><b>Web Developer | 2016 - 2018</b></p>
            <p className="story-text">
                At Holiday Suites, I focused on practical e-commerce solutions, starting with integrating the Ingenico
                platform to streamline the checkout process. I built and maintained an admin interface that provided
                essential transaction data and feedback, utilizing PHP and Bootstrap for its implementation.
                <br/><br/>
                The promotional aspects were improved with the introduction of a flexible promo code system and the
                addition of gift cards. In response to content management needs, I replaced outdated WordPress theme
                editors with faster, more efficient ones, enhancing the website's usability.
                <br/><br/>
                I also worked on the database design that supported web bookings and ensured its synchronization with
                the central system. My work contributed to setting up an inventory system that managed the availability
                of package deals with custom rules for bookings, using a simple scripting setup to handle constraints
                and track stock.
            </p>
        </section>

    </div>
)

export default HolidaySuites
