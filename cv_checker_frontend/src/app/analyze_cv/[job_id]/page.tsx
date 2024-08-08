import JobDetailsPage from "@/components/pages/JobDetailsPage"

const page = ({ params }: { params: { job_id: number } }) => {
    return (
        <div> 
            <JobDetailsPage job_id={params.job_id}/>
        </div>
    )
}

export default page