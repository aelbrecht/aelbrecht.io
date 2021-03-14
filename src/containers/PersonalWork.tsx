import React, {FC} from "react"
import Link from "./Link"
import LazyLoad from 'react-lazyload'

const PersonalWork: FC = () => (
    <section className="work-story-container">
        <div className="story-body">
            <div className="story-padding">
                <h3 className="work-title ">Side Projects</h3>
                <p>A collections of stuff I've made in my free time.</p>
                <p>
                    <h5>Dust Lake</h5>
                    <br/>
                    Most of the work like the admin website and document logic used in the Matthys Wines platform was
                    developed in my free time as a challenge to create the most maintainable project possible. In the
                    end I was able to integrate the microservices into the stack of already existing
                    services greatly reducing the amount of time needed to develop new features.
                    <br/><br/>
                    With this freedom I created a handful of experimental admin panels of which the final version now
                    runs in production. Multiple iterations gave me a good idea on how to develop an intuitive GUI
                    that a user with any computer experience can use.
                </p>
                <p className="story-text">
                    <h5>2D Graphics and Stock Trading</h5>
                    <br/>
                    As a challenge to learn 2D graphics I've started to learn
                    the <Link to="https://ebiten.org/">ebiten</Link> library in Go. Being able to Using simplex
                    noise I <Link to="https://github.com/aelbrecht/iron-made">developed an algorithm</Link> to generate
                    realistic looking contents possible to integrate into a game.
                    <br/><br/>
                    Trying to improve my real time drawing skills I created
                    a <Link to="https://github.com/aelbrecht/rings-of-ara">simple 2D game engine</Link> which
                    would procedurally generate chunks and a character could move in 2D space in an infinite world.
                    <br/><br/>
                    The final project I worked on was a trading terminal inspired
                    by <Link to="https://tradingview.com/">TradingView</Link> as a goal to create a bot that could
                    automate or suggest stock trades. Using previous 2D plotting knowledge I was able
                    to <Link to="https://github.com/aelbrecht/visim">plot a large amount of quotes</Link> and navigate
                    them in real-time in any time range. The bot which ran as a python
                    script could make simulated trades and communicate them to the Go program but was not developed
                    further to make any useful decisions.
                </p>
                <p>
                    <h5>3D printing</h5>
                    <br/>
                    Being fascinated by small electronics and IOT devices I've tried a handful of times to create some
                    3D printed models and to wire up some small devices. A couple of those successful projects was a
                    small car to distract my cats with, some prototypes for a robot arm and an automated irrigation
                    system for my bedroom plants.
                </p>
            </div>
        </div>
        <div className="story-image ">
            <div className="story-padding ">
                <LazyLoad>
                    <img
                        src="https://static.aelbrecht.io/portfolio/2d-adventure.gif"
                        className="story-image-display"
                        alt="2d game"
                    />
                    <p>2D Open world</p>
                    <img
                        src="https://static.aelbrecht.io/portfolio/trading-bot.gif"
                        className="story-image-display"
                        alt="trading bot"
                    />
                    <p>Trading bot</p>
                    <div>
                        <iframe
                            className="yt-video" src="https://www.youtube.com/embed/qDtwpFNcXTc" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="cat laser video"
                        />
                    </div>
                    <p>Cat laser car</p>
                </LazyLoad>
            </div>
        </div>
    </section>
)

export default PersonalWork
