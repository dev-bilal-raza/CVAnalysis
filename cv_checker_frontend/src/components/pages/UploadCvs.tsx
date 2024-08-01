"use client"
import React, { FormEvent, useState } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'
import Image from 'next/image'
import CvImage from "../../../public/analyzecv.png"
import { add_job } from '../api_calls/job_calls'
import { handleUploadFiles } from '@/utils/file_handler'
import { FormSvg } from '../common/Svgs'
import { useRouter } from 'next/navigation'
import Spinner from '../common/Spinner'


const UploadCvs = () => {

  const formData = new FormData();
  const [loading, setLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [response, setResponse] = useState("");
  const router = useRouter();

  const uploadCvs = async (e: FormEvent) => {
    e.preventDefault();
    setResponse("");
    setLoading(true);
    if (uploadedFiles.length > 0 && jobTitle && jobDescription) {
      for (let i = 0; i < uploadedFiles.length; i++) {
        formData.append('cvs', uploadedFiles[i]);
      }
      formData.append("job_title", jobTitle)
      formData.append("job_description", jobDescription)
      const response = await add_job(formData)
      console.log(response);
      if (response) {
        // router.push(`/analyze_cv/${1}`);
        setLoading(false);
      }
    }else{
      setResponse("You have not filled the form correctly.");
      setLoading(false);
    }
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file_response = handleUploadFiles(Array.from(event.target.files), uploadedFiles, setFileLimit, setUploadedFiles);
      console.log("File Response: " + file_response);
      if (file_response !== true) {
        setResponse("You are only allowed to upload pdf files.")
      }else{
        setResponse("")
      }
    }
  };
  return (
    <div className='flex justify-center gap-6 p-8'>
      <form onSubmit={uploadCvs} className='relative pb-10 bg-white flex flex-col justify-center w-3/4 items-center gap-4 border-[#1A1D3F] border-8 border-t-3 border-b-0 rounded-lg'>
        <h2 className='bg-[#1a1d3f] w-full p-4 text-center font-heading text-white text-xl font-medium'>
          Lets fill the Form
        </h2>
        <div className='w-full p-5 pb-0'>
          <Input labelText='Job Title' setInput={setJobTitle} />
        </div>
        <div className='w-full p-5 pb-0'>
          <div className="relative w-full">
            <textarea
              className="resize-none bg-slate-100 focus:bg-white h-28 peer w-full font-sans font-normal outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 focus:border-t-transparent text-sm rounded-[7px] border-blue-gray-200 focus:border-indigo-500 px-2 py-2 border-t-transparent"
              placeholder=" "
              onChange={(e) => setJobDescription(e.target.value)}
              required
            ></textarea>
            <label
              className="flex w-full select-none pointer-events-none absolute left-0 font-normal truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-placeholder-shown:leading-[3.75] text-gray-400 peer-focus:text-indigo-500 before:border-blue-gray-200 peer-focus:before:!border-indigo-500 after:border-blue-gray-200 peer-focus:after:!border-indigo-500">
              Job Description
            </label>
          </div>
        </div>
        <div className="m-4 mb-14">
          <label htmlFor="example5" className="text-center w-full flex justify-center p-2 text-lg font-sans font-medium">Upload CVs</label>
          <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
            <div className="space-y-1 text-center">
              <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
              </div>
              <div className="text-gray-600"><a href="#" className="font-medium text-primary-500 hover:text-primary-700">Click to upload</a></div>
              <p className="text-sm text-gray-500">Pdf (max. 800x400px)</p>
            </div>
            <input id="example5"
              type="file"
              className="sr-only"
              multiple
              disabled={fileLimit}
              onChange={handleFileChange}
            />
          </label>
          {uploadedFiles.length > 0 && <p className='text-lg m-3 text-center'>{uploadedFiles.length} CVs uploaded</p>}
          {response && <p className='text-lg m-3 text-red-400 text-center'>{response}</p>}
        </div>
        {
          loading ?
            <Spinner /> :
            <div className='absolute bottom-9 z-40'>
              <Button is_delete={false}>Analyze</Button>
            </div>
        }
        <FormSvg />
      </form>
    </div>
  )
}

export default UploadCvs