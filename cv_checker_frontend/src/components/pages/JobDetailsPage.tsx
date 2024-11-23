"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { get_job_details } from '../api_calls/job_calls';
import { IJobDetails } from '@/types/job.types';
import { STATUS } from '@/common/constants';
import Container from '../layout/Container';
import { GridPattern } from '../ui/GridPattern';

const JobDetailsPage = ({ job_id }: { job_id: number }) => {
  const router = useRouter();
  const [jobDetails, setJobDetails] = useState<IJobDetails>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch_job_details = async () => {
      setLoading(true);
      const response = await get_job_details(job_id);
      console.log("Jobs: ", response);

      if (response?.data.status === STATUS.SUCCESS) {
        setJobDetails(response.data.job_details);
        setLoading(false);
      } else {
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
    fetch_job_details();
  }, [])
  return (
    <Container>
      <div className='text-black mt-8'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div className='relative'>
              <div className='absolute z-20'>
                <h1 className='font-heading text-xl text-center exsmall:text-2xl sm:text-3xl md:text-4xl font-semibold'>{jobDetails?.job_title}</h1>
              </div>
              <div className='absolute h-[200px] inset-0 [mask-image:radial-gradient(ellipse_at_bottom,white,transparent)] '>
                <GridPattern />
              </div>
            </div>

            <div className='flex justify-end'>

            </div>
            {/* <h1>{jobDetails?.title}</h1>
            <p>{jobDetails?.description}</p> */}
          </div>
        )}
      </div>
    </Container>
  )
}

export default JobDetailsPage