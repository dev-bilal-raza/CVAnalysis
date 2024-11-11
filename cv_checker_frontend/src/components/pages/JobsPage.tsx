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
                        <div className='w-full flex justify-center items-center'>
                            <div className='w-4/5 bg-black/20 rounded-lg'>
                                <div className='w-full flex justify-between rounded-t-lg py-3 px-6 bg-gray-400'>
                                    <h3 className='font-heading font-semibold text-black text-center text-2xl sm:text-3xl md:text-4xl'>ALL JOBS
                                    </h3>
                                    <div>

                                    </div>
                                </div>
                                <div className='w-full p-4'>
                                    <div className="grid grid-cols-8 p-3 gap-4 bg-black rounded-t-xl border-2 text-white">
                                        <h3 className="font-heading text-xl font-medium">S#</h3>
                                        <h3 className="col-span-2 font-heading text-xl font-medium">Role</h3>
                                        <h3 className="text-left font-heading text-xl font-medium">CV Screened</h3>
                                        <h3 className="col-span-4 font-heading text-xl font-medium">Created At</h3>
                                    </div>
                                    <div className='border-2 w-full border-t-0 max-h-screen'>
                                        {jobs?.map((job, index) => (
                                            <div key={index} className={`grid grid-cols-8 gap-4 p-2 pt-6 ${index % 2 !== 0 ? "bg-[#242151] text-white" : "bg-white text-black"}`}>
                                                <h4 className='lg:text-xl text-[17px]'>
                                                    {index < 10 ? "0" + (index + 1) : index + 1}
                                                </h4>
                                                <h4 aria-valuetext={job.job_title} className='col-span-2 text-nowrap text-tooltip relative font-sans lg:text-xl text-[17px]'>{job.job_title.length < 9 ? job.job_title : job.job_title.slice(0, 9) + " ..."}</h4>
                                                <h4 className='font-sans lg:text-xl text-[17px]'>{job.cv_count}</h4>
                                                <h4 className='font-sans lg:text-xl text-[17px]'>{job.cv_count}</h4>
                                                <Link className='w-full col-span-2' href={`/analyze_cv/${job?.job_id}`}>
                                                    <button
                                                        type="button"
                                                        className={`p-2 ${index % 2 !== 0 ? "": ""}bg-black rounded-lg hover:bg-gray-950  text-white md:text-base text-sm text-nowrap duration-1000`}
                                                    >
                                                        Open the description
                                                    </button>
                                                </Link>
                                                <Link href={`/analyze_cv/${job?.job_id}`}>
                                                    <button
                                                        type="button"
                                                        className={`px-2 sm:px-4 md:px-6 py-2 sm:text-lg ${index % 2 !== 0 ? "": ""}bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white md:text-base text-sm  hover:text-black hover:bg-transparent duration-1000`}
                                                    >
                                                        Next →
                                                    </button>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
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
                                                    <button
                                                        type="button"
                                                        className="px-2 sm:px-4 md:px-6 py-2 text-sm sm:text-lg bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                                    >
                                                        Next →
                                                    </button>
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