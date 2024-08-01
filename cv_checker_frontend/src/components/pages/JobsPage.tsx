"use client"
import React, { useEffect, useState } from 'react'
import Button from '../common/Button';

interface Jobs {
    job_title: string;
    job_description: string;
    cv_count: number
}

const AllJobs = () => {
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState<Jobs[]>([]);

    useEffect(() => {
        // Fetch jobs data from the FastAPI backend
        const fetchJobs = async () => {
            const response = await fetch('https://cv-analyzer-backend-oa7fkrczha-uc.a.run.app/api/v1/jobs');
            const data = await response.json();
            setJobs(data);
            setLoading(false);
        };

        fetchJobs();
    }, []);

    return (
        <div className='w-full flex flex-col gap-4 text-black p-4 rounded-t-xl bg-black/15'>
            {/* <div className="animate-rotate z-10 absolute top-0 inset-0 h-full w-full rounded-full bg-[conic-gradient(#000000_30deg,transparent_120deg)]"></div> */}
            <h3 className='font-heading font-semibold text-center text-2xl sm:text-3xl md:text-4xl'>ALL JOBS</h3>
            <table className='m-5 bg-white'>
                <thead className='bg-black rounded-t-xl border-2'>
                    <tr className='text-white p-3 pr-8 flex md:flex-row flex-col justify-evenly gap-7'>
                        {/* <th className='w-1/4  text-xl font-medium font-heading'>S#</th> */}
                        <th className='text-xl font-medium font-heading'>Role</th>
                        <th className='text-xl font-medium font-heading'>CV Screened</th>
                    </tr>
                </thead>
                <tbody className='border-2 border-t-0'>
                    {jobs.map((job, index) => (
                        <div key={index} className={`p-2 pt-6 border-b ${index % 2 !== 0 ? "bg-gradient-to-tr from-slate-300 via-[#7d82b9] to-[#6f72a8]" : ""} `}>
                            <tr className='w-full flex justify-evenly'>
                                <td>
                                    {index < 10 ? "0" + (index + 1) : index + 1}
                                </td>
                                <td className='w-2/6 text-center font-sans text-lg'>{job.job_title}</td>
                                <td className='w-2/6 text-center font-sans text-lg'>{job.cv_count}</td>
                                <Button is_delete={false}>
                                    Analyze
                                </Button>
                            </tr>
                        </div>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllJobs