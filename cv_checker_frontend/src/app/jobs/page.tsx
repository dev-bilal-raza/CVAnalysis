import AllJobs from '@/components/pages/JobsPage'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MainContainer from '@/components/layout/MainContainer'

const page = () => {

    return (
        <MainContainer>
            <div>
                <AllJobs />
            </div>
        </MainContainer>
    )
}

export default page