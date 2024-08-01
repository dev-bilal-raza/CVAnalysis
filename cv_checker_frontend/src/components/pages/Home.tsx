import React from 'react'
import HeroSection from '../sections/HeroSection'
import WhySection from '../sections/WhySection'
import FaqUsSection from '../sections/FaqUsSection'

const HomePage = () => {
    return (
        <div>
            <section>
                <HeroSection />
            </section>
            <section>
                <WhySection />
            </section>
            <section>
                <FaqUsSection />
            </section>
        </div>
    )
}

export default HomePage