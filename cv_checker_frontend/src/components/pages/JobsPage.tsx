"use client"
import React, { useEffect, useState } from 'react'
import Button from '../common/Button';
import Loader from '../layout/loader/Loader';
import Link from 'next/link';
import { get_aLL_jobs } from '../api_calls/job_calls';

interface Jobs {
    job_id: number,
    job_title: string;
    job_description: string;
    cv_count: number
}

const AllJobs = () => {
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState<Jobs[]>([]);
    const [errMsg, setErrMsg] = useState<string | null>(null);
    useEffect(() => {
        // Fetch jobs data from the FastAPI backend
        const fetch_jobs = async () => {
            const jobs = await get_aLL_jobs()
            console.log("Jobs: ", jobs);

            if (jobs?.status === 200) {
                setJobs(jobs.data)
                setLoading(false)
            }
            else {
                setErrMsg("Failed to fetch jobs")
                setLoading(false)
            }
        }

        fetch_jobs()
    }, []);

    return (
        <div>
            {
                loading ?
                    <div className='flex justify-center items-center w-full h-80'>
                        <Loader />
                    </div>
                    :
                    jobs.length === 0 ?
                        <div className='flex justify-center items-center w-full h-80 text-black'>
                            <h3 className='text-4xl font-heading font-semibold'>
                                Could not find any jobs.
                            </h3>
                        </div>
                        :
                        // Display all jobs in a table format
                        <div>
                            <div className='large-screen w-full md:flex hidden flex-col text-black p-4 rounded-t-xl md:bg-black/15'>
                                <h3 className='font-heading font-semibold text-center text-2xl sm:text-3xl md:text-4xl pb-4'>ALL JOBS</h3>
                                <div className="bg-black rounded-t-xl border-2 md:block hidden">
                                    <div className="text-white p-3 flex flex-row justify-between w-[70%]">
                                        <h3 className="font-heading text-xl text-right font-medium w-[16%]">S#</h3>
                                        <h3 className="font-heading text-xl text-left font-medium w-[15%]">Role</h3>
                                        <h3 className="font-heading text-xl font-medium">CV Screened</h3>
                                    </div>
                                </div>
                                <div className='border-2 border-t-0 max-h-screen overflow-auto'>
                                    {jobs?.map((job, index) => (
                                        <div key={index} className={`p-2 pt-6 ${index % 2 !== 0 ? "bg-gradient-to-tl from-slate-300 via-[#7d82b9] to-[#6f72a8]" : "bg-white"}`}>
                                            <div className='w-full flex justify-around'>
                                                <h4 className='lg:text-xl text-[17px]'>
                                                    {index < 10 ? "0" + (index + 1) : index + 1}
                                                </h4>
                                                <h4 className='w-1/6 text-left font-sans lg:text-xl text-[17px]'>{job.job_title}</h4>
                                                <h4 className='text-left font-sans lg:text-xl text-[17px]'>{job.cv_count}</h4>
                                                <Link href={`/analyze_cv/${job?.job_id}`}>
                                                    <Button is_delete={false}>
                                                        Analyze
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='small-screen md:hidden text-black'>
                                <h3 className='font-heading font-semibold text-center text-2xl sm:text-3xl md:text-4xl pb-4'>ALL JOBS</h3>
                                <div className='grid sm:grid-cols-2 grid-cols-1 gap-5'>
                                    {jobs?.map((job, index) => (
                                        <div key={index} className="border-8 border-black rounded-md p-2 shadow-[0px_0px_10px_0px_#282553]">
                                            <div className='flex gap-2 w-full'>
                                                <h4 className='text-10px sm:text-[13px] h-fit sm:p-2 p-1 rounded-full bg-black text-white'>
                                                    {index < 10 ? "0" + (index + 1) : index + 1}
                                                </h4>
                                                <div className='w-full flex flex-col justify-center items-center gap-2 p-3 pt-4'>
                                                    <h4 className='font-sans text-[15px] sm:text-[17px] text-center'>{job.job_title}</h4>
                                                    <div className='flex gap-1 mb-2'>
                                                        <h4 className='text-left font-sans text-sm sm:text-[16px]'>CVs: </h4>
                                                        <h4 className='text-left font-sans text-sm sm:text-[16px]'>{job.cv_count}</h4>
                                                    </div>
                                                    <Button is_delete={false}>
                                                        Analyze
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
            }
        </div>
    )
}

export default AllJobs