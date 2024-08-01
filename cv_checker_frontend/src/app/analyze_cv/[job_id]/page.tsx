import React from 'react'

const get_job_details = async () => {
    const response = await fetch("")
    return await response.json()
}

const page = ({params}: { params: { job_id : string} }) => {
    console.log("Job id: ", params.job_id);
    
    return (
        <div> Page</div>
    )
}

export default page