import axios from "axios"

interface JobDetails {
    job_title: string
    job_description: string
}

export const add_job = async (job_details: FormData) => {
    console.log(job_details)
    const response = await axios.post("http://localhost:8000/api/v1/add_job", job_details, {
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    if (response.status === 200) {
        return response
    }
}

export const get_aLL_jobs = async () => {
    const response = await axios.get('http://localhost:8000/api/v1/get_all_jobs', {withCredentials: true});
    console.log("Response: ", response);
    return response
}

export const get_job_details = async (job_id: number) => {
    const response = await axios.get(`http://localhost:8000/api/v1/get_job_details?job_id=${job_id}`, {withCredentials: true});
    console.log("Response: ", response);
    
    if (response.status === 200) {
        return response
    }
}