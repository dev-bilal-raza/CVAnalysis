'use client';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Button from '../common/Button';
import { IJob } from '@/types/job.types';
import Container from '../layout/Container';
import { useRouter } from 'next/navigation';
import { STATUS } from '@/common/constants';
import Loader from '../layout/loader/Loader';
import { getJobById } from '@/utils/methods';
import DeletePopup from '@/models/alert_popup';
import { normalizeText } from '@/utils/helper';
import ShowDataPopup from '@/models/data_popup';
import DataNotFound from '../layout/DataNotFound';
import React, { useEffect, useState } from 'react';
import { IPopUpdata } from '@/types/PopUpData.types';
import { getALLJobs, deleteJob } from '@/apis/job.api';
import { removeToken } from '@/services/cookie.service';

const AllJobs = () => {
  const [loading, setLoading] = useState(false);
  const [IsDeleteAllowed, setIsDeleteAllowed] = useState(false);
  const [dataToShow, setDataToShow] = useState<IPopUpdata>();
  const [JobToDelete, setJobToDelete] = useState<number | null>();
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [filterJobs, setFilterJobs] = useState<IJob[]>([]);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  // router to redirect user to the specified location
  const router = useRouter();

  // useeffrect to fetch jobs on first time
  useEffect(() => {
    // Fetch jobs data from the FastAPI backend
    const fetch_jobs = async () => {
      try {
        setLoading(true);
        const response = await getALLJobs();
        console.log('Jobs: ', response);

        if (response?.status === STATUS.SUCCESS) {
          setJobs(response.jobs);
          setFilterJobs(response.jobs);
          setLoading(false);
        } else {
          setErrMsg(response?.message);
          setLoading(false);
          toast.error(response?.message, {
            style: {
              border: '2px solid #F3DDD7',
              padding: '16px',
              color: 'black',
              fontWeight: 'bold',
              backgroundColor: '#FBEFEB',
            },
            iconTheme: {
              primary: '#f71b31',
              secondary: '#FFFAEE',
            },
          });
          if (response?.status === STATUS.NOT_AUTHORIZED) {
            await removeToken();
            setTimeout(() => {
              router.push('/register');
            }, 4000);
          }
        }
      } catch (error) {
        console.error('Error in fetching jobs: ', error);
        setLoading(false);
        setErrMsg('An error occurred while fetching jobs.');
        toast.error('An error occurred while fetching jobs.', {
          style: {
            border: '2px solid #F3DDD7',
            padding: '16px',
            color: 'black',
            fontWeight: 'bold',
            backgroundColor: '#FBEFEB',
          },
          iconTheme: {
            primary: '#f71b31',
            secondary: '#FFFAEE',
          },
        });
      }
    };
    fetch_jobs();
  }, []);

  const jobDeleteHandler = async () => {
    if (!JobToDelete) {
      setIsDeleteAllowed(false);
      return;
    }
    try {
      const response = await deleteJob(JobToDelete);
      console.log('Response: ', response);
      if (response?.data.status === STATUS.SUCCESS) {
        setJobs(response?.data.jobs);
        setIsDeleteAllowed(false);
        setJobToDelete(null);
        toast.success(response.data.message, {
          style: {
            border: '2px solid #DEF0E1',
            padding: '16px',
            color: 'black',
            fontWeight: 'bold',
            backgroundColor: '#F1F8F4',
          },
          iconTheme: {
            primary: '#039427',
            secondary: '#FFFAEE',
          },
        });
      } else {
        setIsDeleteAllowed(false);
        setJobToDelete(null);
        toast.error(response?.data.message, {
          style: {
            border: '2px solid #F3DDD7',
            padding: '16px',
            color: 'black',
            fontWeight: 'bold',
            backgroundColor: '#FBEFEB',
          },
          iconTheme: {
            primary: '#f71b31',
            secondary: '#FFFAEE',
          },
        });
      }
    } catch (error) {
      setIsDeleteAllowed(false);
      setJobToDelete(null);
      toast.error('An error occurred while deleting Job.', {
        style: {
          border: '2px solid #F3DDD7',
          padding: '16px',
          color: 'black',
          fontWeight: 'bold',
          backgroundColor: '#FBEFEB',
        },
        iconTheme: {
          primary: '#f71b31',
          secondary: '#FFFAEE',
        },
      });
    }
  };
  const popupHandler = (job_id: number) => {
    setIsDeleteAllowed(!IsDeleteAllowed);
    setJobToDelete(job_id);
  };

  // Helper function to check if a job matches the search criteria
  const isJobMatch = (job: IJob, searchTerms: string[]): boolean => {
    // Fields to search in
    const searchableFields = ['job_title', 'job_description'];

    return searchTerms.every((term) => {
      return searchableFields.some((field) => {
        const fieldValue = job[field] as string;
        return fieldValue && normalizeText(fieldValue).includes(term);
      });
    });
  };

  const filterSearch = (searchInput: string, jobs: IJob[]): IJob[] => {
    try {
      // If search input is empty or only whitespace, return all jobs
      if (!searchInput?.trim()) {
        return jobs;
      }

      // Normalize and split the search input into terms
      const searchTerms = searchInput
        .split(' ')
        .map((term) => normalizeText(term))
        .filter((term) => term.length > 0);

      // Return all jobs if no valid search terms
      if (searchTerms.length === 0) {
        return jobs;
      }

      // Filter jobs based on search terms
      const filteredJobs = jobs.filter((job) => isJobMatch(job, searchTerms));

      // Sort results by relevance (exact matches first)
      return filteredJobs.sort((a, b) => {
        const aTitle = normalizeText(a.job_title);
        const bTitle = normalizeText(b.job_title);
        const searchTerm = searchTerms[0]; // Use first search term for sorting

        // Exact matches come first
        const aExactMatch = aTitle === searchTerm;
        const bExactMatch = bTitle === searchTerm;
        if (aExactMatch && !bExactMatch) return -1;
        if (!aExactMatch && bExactMatch) return 1;

        // Then starts-with matches
        const aStartsWith = aTitle.startsWith(searchTerm);
        const bStartsWith = bTitle.startsWith(searchTerm);
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;

        // Alphabetical order for equal relevance
        return aTitle.localeCompare(bTitle);
      });
    } catch (error) {
      console.error('Error in filterSearch:', error);
      return jobs; // Return all jobs in case of error
    }
  };
  // Usage example:
  const handleSearch = (searchInput: string) => {
    try {
      const filteredResults = filterSearch(searchInput, jobs);
      setFilterJobs(filteredResults);
    } catch (error) {
      console.error('Error in handleSearch:', error);
      setFilterJobs(jobs); // Fallback to showing all jobs
    }
  };
  const descriptionHandler = (job_id: number) => {
    const job = getJobById(job_id, filterJobs);
    if (job) {
      setDataToShow({
        hasAllowed: true,
        heading: job.job_title,
        content: job.job_description,
      });
    }
  };
  return (
    <div className="my-6">
      <Container>
        {loading ? (
          <div className="flex justify-center items-center w-full h-80">
            <Loader />
          </div>
        ) : (
          // Display all jobs in a table formats
          <div className="w-full text-black">
            {IsDeleteAllowed && (
              <DeletePopup
                message="By clicking on it your Job and all cvs related to this job will delete."
                onDelete={jobDeleteHandler}
                isAllowed={IsDeleteAllowed}
                setIsAllowed={setIsDeleteAllowed}
              />
            )}
            {dataToShow?.hasAllowed && (
              <ShowDataPopup data={dataToShow} setData={setDataToShow} />
            )}
            <div className="sm:w-3/4 mx-auto">
              <div className="flex flex-col gap-3">
                <h3 className="font-heading font-semibold text-black text-center text-2xl exsmall:text-3xl sm:text-4xl md:text-5xl">
                  ALL JOBS
                </h3>
                {/* search bar */}
                <div className="bg-[#F0E8F5] p-2.5 px-4 rounded-xl flex items-end gap-2">
                  <Image
                    src="/Icons/SearchIcon.png"
                    alt="search"
                    width={19}
                    height={19}
                  />
                  <input
                    type="text"
                    placeholder="Search for jobs"
                    className="w-full placeholder-[#1E1B4B] border-none outline-none bg-transparent"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
                {filterJobs.length === 0 ? (
                  <DataNotFound message="Could not find any job" />
                ) : (
                  <div className="w-full">
                    <div className="">
                      {filterJobs?.map((job, index) => (
                        <div
                          key={index}
                          className={`w-full flex my-8 justify-between ${index % 2 !== 0 ? '' : ''}`}
                        >
                          <div className="flex gap-2 items-start">
                            <div className="hidden sm:block p-3 bg-[#F0E8F5] rounded-md">
                              <Image
                                src={'/JobBag.png'}
                                alt={`0${index + 1}`}
                                width={23}
                                height={23}
                              />
                            </div>
                            <div>
                              <h3
                                aria-valuetext={job.job_title}
                                className="exsmall:block hidden text-tooltip font-heading font-medium relative"
                              >
                                {job.job_title.length > 20
                                  ? job.job_title.slice(0, 20) + '...'
                                  : job.job_title}
                              </h3>
                              <h3
                                aria-valuetext={job.job_title}
                                className="exsmall:hidden block text-tooltip font-heading font-medium relative"
                              >
                                {job.job_title.length > 10
                                  ? job.job_title.slice(0, 10) + '...'
                                  : job.job_title}
                              </h3>
                              <h5 className="font-para text-gray-700 text-sm exsmall:text-base font-light">
                                Applictions:{' '}
                                {job.cv_count < 10
                                  ? '0' + job.cv_count
                                  : job.cv_count}
                              </h5>
                              <h5
                                className="font-para text-[12px] sm:text-sm text-blue-600 hover:text-blue-500 cursor-pointer font-light"
                                onClick={() => descriptionHandler(job.job_id)}
                              >
                                View Description
                              </h5>
                            </div>
                          </div>
                          <div className="flex gap-2 exsmall:gap-4 items-center">
                            <div
                              className="cursor-pointer p-2 px-3 exsmall:px-4 md:px-6 border border-[#1E1B4B] rounded-md"
                              onClick={() => popupHandler(job.job_id)}
                            >
                              <Image
                                src={'/Icons/TrashIcon.png'}
                                alt="Delete Job"
                                width={16}
                                height={16}
                              />
                            </div>
                            <Button
                              is_delete={false}
                              click_func={() =>
                                router.push(`/analyze_cv/${job.job_id}`)
                              }
                            >
                              View CVs
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default AllJobs;
