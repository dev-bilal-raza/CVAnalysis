'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { get_job_details } from '@/apis/job.api';
import { IJobDetails } from '@/types/job.types';
import { STATUS } from '@/common/constants';
import Container from '../layout/Container';
import { GridPattern } from '../ui/GridPattern';

const options = ['Name', 'Email', 'Score', 'Action'];

const JobDetailsPage = ({ job_id }: { job_id: number }) => {
  const router = useRouter();
  const [jobDetails, setJobDetails] = useState<IJobDetails>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch_job_details = async () => {
      setLoading(true);
      const response = await get_job_details(job_id);
      console.log('Jobs: ', response);

      if (response?.data.status === STATUS.SUCCESS) {
        setJobDetails(response.data.job_details);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(response?.data.message, {
          style: {
            border: '1px solid #f71b31',
            padding: '16px',
            color: 'black',
          },
          iconTheme: {
            primary: '#f71b31',
            secondary: '#FFFAEE',
          },
        });
        if (response?.data.status === STATUS.NOT_AUTHORIZED) {
          setTimeout(() => {
            router.push('/register');
          }, 4000);
        }
      }
    };
    fetch_job_details();
  }, []);
  return (
    <Container>
      <div className="text-black mt-8">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div className="relative">
              <div className="absolute h-[200px] inset-0 [mask-image:radial-gradient(ellipse_at_bottom,white,transparent)] ">
                <GridPattern />
              </div>
              <div className="absolute z-20 w-full mx-auto">
                <h2 className="font-heading text-xl text-center exsmall:text-2xl sm:text-3xl md:text-4xl font-bold">
                  {jobDetails?.job_title}
                </h2>
              </div>
              <div className="absolute z-10 bg-white/40 shadow-[inset_23px_-16px_52px_16px_#FFFF] h-[200px] w-full"></div>
              <div className="flex flex-col gap-6 absolute z-20 top-[200px] w-full">
                <div>
                  <h3 className="font-heading font-semibold text-center text-2xl">
                    Recommended CVs
                  </h3>
                  {jobDetails?.cvs.map((cv) => (
                    <div className="m-6 w-full">
                      {cv.is_recommended && (
                        <div className="flex gap-3 items-center">
                          <div
                            className={`inline-flex justify-center items-center h-14 w-14 rounded-full ring-4 ring-gray-300 ${cv.recommendation_points > 8 ? 'bg-green-600' : 'bg-[#2e235d]'}`}
                          >
                            <h4 className="text-2xl text-white font-heading font-medium">
                              {cv.candidate_name.split(' ').map((c) => c[0])}
                            </h4>
                          </div>
                          <div className="flex flex-col gap-0">
                            <h3 className="font-heading font-medium text-lg leading-tight">
                              {cv.candidate_name}
                            </h3>
                            <h4 className="font-para text-[#637587]">
                              {cv.candidate_email}
                            </h4>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {/* <div>
                  <h3 className='font-heading font-semibold text-2xl'>
                    Not Recommended CVs
                  </h3>
                  {
                    jobDetails?.cvs.map((cv) => (
                      <div>
                        {!cv.is_recommended &&
                          <div>
                            <h4>
                              {cv.candidate_name}
                            </h4>
                          </div>
                        }
                      </div>
                    ))
                  }
                </div> */}
              </div>
            </div>
            {/* 
            <div className='absolute z-30 top-[350px] w-[90%] mx-auto flex justify-center'>
              <div className='w-full grid grid-cols-4 border-2 p-2'>
                {options.map((option, index) => (
                  <h1 key={index} className='font-heading text-lg font-medium'>
                    {option}
                  </h1>
                ))}
              </div>
            </div> */}
            {/* <h1>{jobDetails?.title}</h1>
            <p>{jobDetails?.description}</p> */}
          </div>
        )}
      </div>
    </Container>
  );
};

export default JobDetailsPage;
