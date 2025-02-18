'use server';
import makeRequest from '@/services/http.service';

const BASE_URL = '/jobs';

interface JobDetails {
  job_title: string;
  job_description: string;
}

export const addJob = async (job_details: FormData) => {
  console.log(job_details);
  return makeRequest(`${BASE_URL}/add_job`, 'POST', job_details);
};

export const getALLJobs = async () => {
  return makeRequest(`${BASE_URL}/get_all_jobs`, 'GET');
};

export const getJobDetails = async (job_id: number) => {
  return makeRequest(`${BASE_URL}/get_job_details?job_id=${job_id}`, 'GET');
};

export const deleteJob = async (job_id: number) => {
  return makeRequest(`${BASE_URL}/delete_job?job_id=${job_id}`, 'DELETE');
};
