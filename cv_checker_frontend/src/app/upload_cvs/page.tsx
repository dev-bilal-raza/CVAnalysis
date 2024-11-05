import UploadCvs from '@/components/pages/UploadCvs'
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { GridPattern } from '@/components/ui/GridPattern';

const page = () => {
    return (
        <main>
            <Header/>
            <section className='min-h-screen max-w-screen mx-auto'>
                <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] ">
                    <GridPattern />
                </div>
                <UploadCvs />
            </section>
            <Footer/>
        </main>
    )
}

export default page