export interface IJob {
    job_id: number,
    job_title: string;
    job_description: string;
    cv_count: number,
    [key: string]: any
}