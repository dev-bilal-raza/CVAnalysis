import UploadCvs from '@/components/pages/UploadCvs'
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const page = () => {
    return (
        <main>
            <Header/>
            <section className='min-h-screen'>
                <UploadCvs />
            </section>
            <Footer/>
        </main>
    )
}

export default page