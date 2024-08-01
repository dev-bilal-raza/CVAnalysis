"use client"
import React, { useEffect, useState } from 'react'
import { upload_new_cvs, update_description } from '../api_calls/job_calls';
import Image from 'next/image';
import cv_logo from "../../../public/cv-logo.png"


interface Jobs {
  job_id: number,
  job_title: string;
  job_description: string;
  cv_count: number
}

const MAX_COUNT = 5

const UploadCv = () => {
  const formData = new FormData();

  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [jobId, setJobId] = useState<number>();
  const [jobDescription, setJobDescription] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [cvResponseMessage, setCVResponseMessage] = useState<string>("");
  const [descriptionId, setIdDescription] = useState<number>(0);
  const [fileLimit, setFileLimit] = useState(true);
  const [allowDescription, setDescriptionAllow] = useState<boolean>(false);

  // console.log(jobId);

  const uploadCvs = async () => {
    if (jobId && uploadedFiles.length > 0) {
      for (let i = 0; i < uploadedFiles.length; i++) {
        formData.append('cvs', uploadedFiles[i]);
      }
      const response = await upload_new_cvs(formData, jobId)
      // console.log(response);
      setCVResponseMessage(response)
    }
  }
  const handleUploadFiles = (files: File[]) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        // console.log(uploadedFiles);

        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    })
    if (!limitExceeded) setUploadedFiles(uploaded)
  }

  // useEffect(() => {
  //   // Fetch jobs data from the FastAPI backend
  //   const fetchJobs = async () => {
  //     const response = await fetch('https://cv-analyzer-backend-oa7fkrczha-uc.a.run.app/api/v1/jobs');
  //     const data = await response.json();
  //     setJobs(data);
  //     setLoading(false);
  //   };

  //   fetchJobs();
  // }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleUploadFiles(Array.from(event.target.files));
    }
  };
  const add_description = async () => {
    setResponseMessage("You Description has been added successfully.")
    const response = await update_description(jobDescription, descriptionId)
    setDescriptionAllow(false)
    setResponseMessage("")
    // console.log(response);

  }
  return (
    <div className='min-h-screen bg-black text-white flex flex-col gap-4 '>
      <h1 className='text-center'>Add new Candidates</h1>
      <div>
        <p className='flex justify-center items-center text-xl font-semibold m-3'>

          {
            loading ? "Loading...." : ""
          }
        </p>
        <div className='grid  md:grid-cols-2 lg:grid-cols-3 '>
          {
            jobs.map((job) =>
            (
              <div key={job.job_id} className='m-3'>
                <div className='border border-slate-500 hover:border-[#1E293C] flex flex-col gap-6 p-6 rounded-xl'>
                  <div className='flex gap-3 justify-evenly items-center'>
                    <Image src={cv_logo} alt='CV' height={45} />
                    <h1 className='text-xl font-sans'>
                      {job.job_title}
                    </h1>
                    <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-6 h-6 text-blue-600  focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                      onChange={(e) => {
                        setFileLimit(false)
                        setJobId(job.job_id)
                      }}
                    />
                  </div>
                  <div className='flex justify-center items-center'>
                    <button className='bg-white text-black rounded-lg px-4 p-2 hover:text-slate-500' onClick={() => {
                      setIdDescription(job.job_id)
                      setDescriptionAllow(true)
                    }}>
                      Paste new job description
                    </button>
                  </div>
                </div>
              </div>
            )
            )
          }
        </div>
      </div>
      {
        allowDescription ?
          <div className='absolute h-full w-full flex justify-center items-center backdrop-blur-lg'>
            <div className='bg-gradient-to-tr from-white via-slate-300 to-[#2b374d] rounded-lg w-2/6 mx-auto p-7'>
              <div className='flex justify-end'>
                <p className='hover:cursor-pointer text-white hover:text-slate-300' onClick={() => setDescriptionAllow(false)}>
                  ✖️
                </p>
              </div>
              <div className='flex flex-col gap-3 text-black'>
                <p className='text-blue-600 font-sans text-lg mb-2'>
                  {responseMessage ? responseMessage : ""}
                </p>
                <label htmlFor="jobDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Description</label>
                <textarea
                  id="jobDescription"
                  onChange={(event) => setJobDescription((event.target.value))}
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."></textarea>
              </div>
              <button className='bg-black text-white rounded-lg px-4 p-2 hover:bg-black/75 mt-4 mb-4'
                onClick={add_description}
              >
                New Role
              </button>
            </div>
          </div> :
          ""
      }
      <div className='flex flex-col justify-center items-center'>
        <label className="hover:cursor-pointer block mb-2 text-sm font-medium text-white" htmlFor="cvFiles">Upload new CVs</label>
        <input className="block w-3/12 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="cvFiles" type="file"
          multiple
          disabled={fileLimit}
          onChange={handleFileChange} />
        {uploadedFiles.length > 0 && <p className='text-lg m-3 '>{uploadedFiles.length} CVs uploaded</p>}
      </div>
      <div className='flex flex-col gap-2 justify-center items-center'>
        <p className='text-blue-500 text-lg font-serif'>
          {cvResponseMessage ? cvResponseMessage : ""}
        </p>
        <button className='bg-gradient-to-bl from-slate-300 via-slate-600 to-slate-800 text-white px-6 p-2 rounded-lg m-3'
          onClick={uploadCvs}>
          Analyze
        </button>
      </div>
    </div>
  )
}

export default UploadCv