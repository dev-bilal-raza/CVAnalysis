"use client"
import React, { useEffect, useState } from 'react'
import Button from '../common/Button';
import Loader from '../layout/loader/Loader';
import Link from 'next/link';
import { get_aLL_jobs } from '../api_calls/job_calls';
import { STATUS } from '@/common/constants';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Container from '../layout/Container';

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
    const router = useRouter();
    useEffect(() => {
        // Fetch jobs data from the FastAPI backend
        const fetch_jobs = async () => {
            const response = await get_aLL_jobs()
            console.log("Jobs: ", response);

            if (response?.data.status === STATUS.SUCCESS) {
                setJobs(response.data.jobs)
                setLoading(false)
            } else if (response?.data.status === STATUS.NOT_AUTHORIZED) {
                toast.error(response?.data.message,
                    {
                        style: {
                            border: '1px solid #f71b31',
                            padding: '16px',
                            color: 'black',
                        },
                        iconTheme: {
                            primary: '#f71b31',
                            secondary: '#FFFAEE',
                        },
                    }
                )
                setTimeout(() => {
                    router.push('/register')
                }, 4000)
            }
            else {
                setErrMsg("Failed to fetch jobs")
                setLoading(false)
            }
        }

        fetch_jobs()
    }, []);

    return (
        <div className='my-6'>
            <Container>
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
                            // Display all jobs in a table formats
                            <div className='w-full text-black'>
                                <div className='sm:w-3/4 mx-auto'>
                                    <div className='flex flex-col gap-3'>
                                        <h3 className='font-heading font-semibold text-black text-center text-2xl sm:text-3xl md:text-4xl'>ALL JOBS
                                        </h3>
                                        {/* search bar */}
                                        <div className='bg-[#F0E8F5] p-2.5 px-4 rounded-xl flex items-end gap-2'>
                                            <Image src='/SearchIcon.png' alt='search' width={19} height={19} />
                                            <input
                                                type="text"
                                                placeholder="Search for jobs"
                                                className="w-full placeholder-[#1E1B4B] border-none outline-none bg-transparent"
                                            />
                                        </div>
                                        <div className='w-full'>
                                            <div className=''>
                                                {jobs?.map((job, index) => (
                                                    <div key={index} className={`w-full flex my-8 justify-between ${index % 2 !== 0 ? "" : ""}`}>
                                                        <div className='flex gap-2 items-start'>
                                                            <div className='hidden sm:block p-3 bg-[#F0E8F5] rounded-md'>
                                                                <Image src={"/JobBag.png"} alt={`0${index + 1}`} width={23} height={23} />
                                                            </div>
                                                            <div>
                                                                <h3 aria-valuetext={job.job_title} className='exsmall:block hidden text-tooltip font-heading font-medium relative'>
                                                                    {job.job_title.length > 20 ? job.job_title.slice(0, 20) + "..." : job.job_title}
                                                                </h3>
                                                                <h3 aria-valuetext={job.job_title} className='exsmall:hidden block text-tooltip font-heading font-medium relative'>
                                                                    {job.job_title.length > 10 ? job.job_title.slice(0, 10) + "..." : job.job_title}
                                                                </h3>
                                                                <h5 className='font-para text-gray-700 text-sm exsmall:text-base font-light'>
                                                                    Applictions: {job.cv_count < 10 ? "0" + job.cv_count : job.cv_count}
                                                                </h5>
                                                                <h5 className='font-para text-sm text-blue-600 hover:text-blue-500 cursor-pointer font-light'>
                                                                    View Description
                                                                </h5>
                                                            </div>
                                                        </div>
                                                        <div className='flex gap-4 items-center'>
                                                            <div className='p-2 px-4 md:px-6 border border-[#1E1B4B] rounded-md'>
                                                                <Image src={"/TrashIcon.png"} alt='Delete Job' width={16} height={16} />
                                                            </div>
                                                            <Button is_delete={false}>
                                                                View CVs
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='fixed bottom-0 w-full bg-white '>
                                    <div className='flex justify-center items-center w-full'>
                                        <Link href='/add-job'>
                                            <Button is_delete={false}>
                                                Add Job
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                }
            </Container>
        </div>
    )
}

export default AllJobs