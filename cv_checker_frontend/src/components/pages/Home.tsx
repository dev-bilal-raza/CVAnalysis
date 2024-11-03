import React from 'react'
import HeroSection from '../sections/HeroSection'
import WhySection from '../sections/WhySection'
import FaqUsSection from '../sections/FaqUsSection'
import { BackgroundBeamsWithCollision } from '../ui/background-beams'
import ReviewsSection from '../sections/ReviewsSection'
const HomePage = () => {
    return (
        <div>
            <section>
                <HeroSection />
            </section>
            <section>
                <WhySection />
            </section>
            <BackgroundBeamsWithCollision>
                <section>
                    <ReviewsSection />
                </section>
            </BackgroundBeamsWithCollision>
            <section>
                <FaqUsSection />
            </section>
        </div>
    )
}

export default HomePage