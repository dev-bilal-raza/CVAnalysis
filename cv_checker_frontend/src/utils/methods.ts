import { IJob } from '@/types/job.types';

export const getJobById = (jobId: number, jobs: IJob[]): IJob | void => {
  const job = jobs.find((job) => job.job_id === jobId);
  return job;
};
