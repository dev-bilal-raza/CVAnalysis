import { ICV } from "./cv.types";
export interface IJob {
    job_id: number,
    job_title: string;
    job_description: string;
    cv_count: number,
    [key: string]: any
}

export interface IJobDetails {
    job_title: string
    cvs: ICV[]
}