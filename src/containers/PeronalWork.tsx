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
                    <b>Dust Lake</b>
                    <br/>
                    Most of the work like the admin website and document logic used in the Matthys Wines platform was
                    developed in my free time as a challenge to create the most maintainable project possible. In the
                    end I was able to integrate the microservices I developed into the stack of already existing
                    services greatly reducing the amount of time needed to develop new features.
                </p>
                <p className="story-text">
                    <b>Noise based world generator</b>
                    <br/>
                    As a challenge to learn 2D graphics I've started to learn
                    the <Link to="https://ebiten.org/">ebiten</Link> library in go. Using simplex noise I developed an
                    algorithm to generate realistic looking contents possible to intergrate into a game.
                </p>
                <p>
                    <b>2D Game</b>
                    <br/>
                    Expanding on the newly acquired 2D drawing skills I tried a to create a simple 2D game in which a
                    character could move in an infinitely generated world. This made me learn a great deal about how
                    to manage terrain generation while drawing the same terrain to screen.
                </p>
                <p>
                    <b>Trading bot</b>
                    <br/>
                    The final project I finished was a trading terminal inspired
                    by <Link to="https://tradingview.com/">TradingView</Link> for which I could write a bot that could
                    plot trading indicators and make buy/sell decisions based upon them. In the end I was able to plot
                    a large amount of quotes on screen while maintaining 60 frames per second and making a not-so-great
                    python-bot sending instructions to the go program which visualised its actions.
                </p>
                <p>
                    <b>3D printing</b>
                    <br/>
                    Being fascinated by small electronics and IOT devices I've tried a handful of times to create some
                    3D printed models and to wire up some small devices. A couple of those successful projects was a
                    small car to distract my cats with, some prototypes for a robot arm and an automated irrigation
                    system for my bedroom plants.
                </p>
                <iframe
                    className="yt-video" src="https://www.youtube.com/embed/qDtwpFNcXTc" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="cat laser video"
                />
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
                    <p>2D game</p>
                    <img
                        src="https://static.aelbrecht.io/portfolio/world-gen.gif"
                        className="story-image-display"
                        alt="world generation"
                    />
                    <p>Noise world generation</p>
                    <img
                        src="https://static.aelbrecht.io/portfolio/trading-bot.gif"
                        className="story-image-display"
                        alt="trading bot"
                    />
                    <p>Trading bot</p>
                    <img
                        src="https://static.aelbrecht.io/portfolio/robot-arm.jpg"
                        className="story-image-display"
                        alt="3d printed arm"
                    />
                    <p>3D printed arm</p>
                </LazyLoad>
            </div>
        </div>
    </section>
)

export default PersonalWork
