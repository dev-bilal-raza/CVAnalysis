import AllJobs from '@/components/pages/JobsPage'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const page = () => {

    return (
        <main>
            <section className=''>
                <Header />
            </section>
            <section className='min-h-screen text-white font-sans p-8'>
                <AllJobs />
            </section>
            <section className=''>
                <Footer />
            </section>
        </main>
    )
}

export default page