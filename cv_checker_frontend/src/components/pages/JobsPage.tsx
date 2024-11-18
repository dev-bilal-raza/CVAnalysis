"use client"
import React, { useEffect, useState } from 'react'
import Button from '../common/Button';
import Loader from '../layout/loader/Loader';
import Link from 'next/link';
import { get_aLL_jobs, delete_job } from '../api_calls/job_calls';
import { STATUS } from '@/common/constants';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Container from '../layout/Container';
import DeletePopup from '@/models/alert_popup';
import DataNotFound from '../layout/DataNotFound';

interface Jobs {
    job_id: number,
    job_title: string;
    job_description: string;
    cv_count: number
}

const AllJobs = () => {
    const [loading, setLoading] = useState(true);
    const [IsDeleteAllowed, setIsDeleteAllowed] = useState(false);
    const [JobToDelete, setJobToDelete] = useState<number | null>();
    const [jobs, setJobs] = useState<Jobs[]>([]);
    const [filterJobs, setFilterJobs] = useState<Jobs[]>([]);
    const [errMsg, setErrMsg] = useState<string | null>(null);
    const router = useRouter();
    useEffect(() => {
        // Fetch jobs data from the FastAPI backend
        const fetch_jobs = async () => {
            const response = await get_aLL_jobs()
            console.log("Jobs: ", response);

            if (response?.data.status === STATUS.SUCCESS) {
                setJobs(response.data.jobs);
                setFilterJobs(response.data.jobs);
                setLoading(false);
            } else {
                setErrMsg(response?.data.message)
                setLoading(false)
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
                if (response?.data.status === STATUS.NOT_AUTHORIZED) {
                    setTimeout(() => {
                        router.push('/register')
                    }, 4000)
                }
            }
        }

        fetch_jobs()
    }, []);

    const jobDeleteHandler = async () => {
        if (!JobToDelete) {
            setIsDeleteAllowed(false)
            return
        }
        try {
            const response = await delete_job(JobToDelete);
            console.log('Response: ', response);
            if (response?.data.status === STATUS.SUCCESS) {
                setJobs(response?.data.jobs);
                setIsDeleteAllowed(false);
                setJobToDelete(null);
                toast.success(response.data.message,
                    {
                        style: {
                            border: '2px solid #DEF0E1',
                            padding: '16px',
                            color: 'black',
                            fontWeight: 'bold',
                            backgroundColor: '#F1F8F4'
                        },
                        iconTheme: {
                            primary: '#039427',
                            secondary: '#FFFAEE',
                        },
                    }
                );
            } else {
                setIsDeleteAllowed(false);
                setJobToDelete(null);
                toast.error(response?.data.message,
                    {
                        style: {
                            border: '2px solid #F3DDD7',
                            padding: '16px',
                            color: 'black',
                            fontWeight: 'bold',
                            backgroundColor: '#FBEFEB'
                        },
                        iconTheme: {
                            primary: '#f71b31',
                            secondary: '#FFFAEE',
                        },
                    }
                )
            }
        } catch (error) {
            setIsDeleteAllowed(false);
            setJobToDelete(null);
            toast.error('An error occurred while deleting Job.',
                {
                    style: {
                        border: '2px solid #F3DDD7',
                        padding: '16px',
                        color: 'black',
                        fontWeight: 'bold',
                        backgroundColor: '#FBEFEB'
                    },
                    iconTheme: {
                        primary: '#f71b31',
                        secondary: '#FFFAEE',
                    },
                }
            );
        }
    }
    const popupHandler = (job_id: number) => {
        setIsDeleteAllowed(!IsDeleteAllowed);
        setJobToDelete(job_id);
    }
    const filterSearch = (searched_input: string) => {
        console.log(searched_input);
        let filteredJobs = [];
        if (searched_input) {
            // Filter the jobs based on the search input
            filteredJobs = jobs.filter(job => job.job_title.toLowerCase().includes(searched_input.toLowerCase()) || job.job_description.toLowerCase().includes(searched_input.toLowerCase()));
            console.log(filteredJobs)
        } else {
            filteredJobs = jobs;
            console.log("Searche not: ", filteredJobs)
        }
        setFilterJobs(filteredJobs);
    }
    return (
        <div className='my-6'>
            <Container>
                {
                    loading ?
                        <div className='flex justify-center items-center w-full h-80'>
                            <Loader />
                        </div>
                        :
                        // Display all jobs in a table formats
                        <div className='w-full text-black'>
                            {
                                IsDeleteAllowed &&
                                <DeletePopup message='By clicking on it your Job and all cvs related to this job will delete.' onDelete={jobDeleteHandler} isAllowed={IsDeleteAllowed} setIsAllowed={setIsDeleteAllowed} />
                            }
                            <div className='sm:w-3/4 mx-auto'>
                                <div className='flex flex-col gap-3'>
                                    <h3 className='font-heading font-semibold text-black text-center text-2xl exsmall:text-3xl sm:text-4xl md:text-5xl'>ALL JOBS
                                    </h3>
                                    {/* search bar */}
                                    <div className='bg-[#F0E8F5] p-2.5 px-4 rounded-xl flex items-end gap-2'>
                                        <Image src='/SearchIcon.png' alt='search' width={19} height={19} />
                                        <input
                                            type="text"
                                            placeholder="Search for jobs"
                                            className="w-full placeholder-[#1E1B4B] border-none outline-none bg-transparent"
                                            onChange={(e) => filterSearch(e.target.value)}
                                        />
                                    </div>
                                    {
                                        filterJobs.length === 0 ?
                                            <DataNotFound message='Could not find any job'/>
                                            :
                                            <div className='w-full'>
                                                <div className=''>
                                                    {filterJobs?.map((job, index) => (
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
                                                                    <h5 className='font-para text-[12px] sm:text-sm text-blue-600 hover:text-blue-500 cursor-pointer font-light'>
                                                                        View Description
                                                                    </h5>
                                                                </div>
                                                            </div>
                                                            <div className='flex gap-2 exsmall:gap-4 items-center'>
                                                                <div className='cursor-pointer p-2 px-3 exsmall:px-4 md:px-6 border border-[#1E1B4B] rounded-md' onClick={() => popupHandler(job.job_id)}>
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
                                    }
                                </div>
                            </div>
                        </div>
                }
            </Container>
        </div>
    )
}

export default AllJobs