import UploadCvs from '@/components/pages/UploadCvs';
import { GridPattern } from '@/components/ui/GridPattern';
import MainContainer from '@/components/layout/MainContainer';

const page = () => {
    return (
        <MainContainer>
            <section className=''>
                <div className="absolute h-[110%] inset-0 [mask-image:radial-gradient(ellipse_at_top,white,transparent)] ">
                    <GridPattern />
                </div>
                <UploadCvs />
            </section>
        </MainContainer>
    )
}

export default page