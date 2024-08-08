"use client"
import React, { useEffect } from 'react'
import { get_job_details } from '../api_calls/job_calls';

const JobDetailsPage = ({job_id}: {job_id: number}) => {
    console.log("Job id: ", job_id);
    useEffect(() => {

        const data = get_job_details(job_id)

    }, [])
  return (
    <div>JobDetailsPage</div>
  )
}

export default JobDetailsPage