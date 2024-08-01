interface JobDetails {
    job_title: string
    job_description: string
}

export const add_job = async (job_details: FormData) => {
    console.log(job_details)
    const response = await fetch("http://localhost:8000/api/v1/add_job",
        {
            method: "POST",
            body: job_details
        }
    );
    if (response.ok) {
        return await response.json();
    }
}

export const upload_new_cvs = async (files: FormData, job_id: number) => {
    const response = await fetch(`https://cv-analyzer-backend-oa7fkrczha-uc.a.run.app/api/v1/upload_new_cvs?job_id=${job_id}`,
        {
            method: "POST",
            body: files
        }
    );
    if (response.ok) {
        return await response.json();
    }
}

export const update_description = async (job_details: string, job_id: number) => {
    const response = await fetch(`https://cv-analyzer-backend-oa7fkrczha-uc.a.run.app/api/v1/update_job_description?job_id=${job_id}`,
        {
            method: "PUT",
            body: JSON.stringify({
                "job_description": job_details
            })
        }
    );
    if (response.ok) {
        return await response.json();
    }
}