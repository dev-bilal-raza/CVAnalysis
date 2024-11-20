import AllJobs from '@/components/pages/JobsPage'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const page = () => {

    return (
        <main className='relative'>
            <section className=''>
                <Header />
            </section>
            <section className='min-h-screen text-white relative'>
                <AllJobs />
            </section>
            <section className=''>
                <Footer />
            </section>
        </main>
    )
}

export default page