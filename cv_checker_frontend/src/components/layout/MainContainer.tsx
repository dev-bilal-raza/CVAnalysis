import React from 'react';
import Header from './Header';
import Footer from './Footer';

const MainContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className=''>
            <section className='sticky z-20 top-0 w-full'>
                <Header />
            </section>
            <section className='min-h-screen'>
                {children}
            </section>
            <section className=''>
                <Footer />
            </section>
        </main>
    )
}

export default MainContainer