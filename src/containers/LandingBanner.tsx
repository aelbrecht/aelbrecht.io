import {FC} from "react";

const LandingBanner: FC = () => (
    <div className="page-filler">
        <div className="flex-columns landing-banner">
            <div className="flex-full-column">
                <div className="element-name">
                    <div className="flex-center">
                        <h1 className="name">Rudolf Aelbrecht</h1>
                        <div className="hero-role">Software Engineer</div>
                        <p className="hero-pitch">
                            C++ · Go · TypeScript · React
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default LandingBanner
