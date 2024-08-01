"use client"
import React, { FormEvent, useState } from 'react'
import Image from 'next/image';
import HeroImage from "../../../public/heroImage.png"
import Button from '../common/Button';
import { add_job } from '../api_calls/job_calls';
import { getCookie, hasCookie } from 'cookies-next';

const MAX_COUNT = 5

const HeroSection = () => {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
    const formData = new FormData();
    const [fileLimit, setFileLimit] = useState(false);
    const [jobTitle, setJobTitle] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [jobDescription, setJobDescription] = useState<string>("");

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
    const uploadJob = async (e: FormEvent) => {
        e.preventDefault();
        const isToken = hasCookie("access_token")
        if (isToken) {
            formData.append(
                "job_details",
                JSON.stringify(
                    {
                        job_title: jobTitle,
                        job_description: jobDescription
                    }
                )
            )
            for (let i = 0; i < uploadedFiles.length; i++) {
                formData.append('cvs', uploadedFiles[i]);
            }
            await add_job(formData)
            setResponseMessage("Your Job has been added successfully for now.")
        } else {
            setMessage("You can not analyze any CV without logging in.")
        }
    }

    const handleFileEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            handleUploadFiles(files);
        }
    }

    return (
        <div className='flex justify-around gap-4 items-center lg:flex-row flex-col rounded-lg p-7 mt-6 mb-8'>
            <div className='lg:w-[55%] p-7 flex flex-col gap-3 justify-center items-center'>
                <h2 className='font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center'>
                    CV Analysis for Smarter Hiring
                </h2>
                <p className='font-para md:text-lg '>
                    Simplify your recruitment with our cutting-edge CV Analyzer. Upload job descriptions and CVs, and let our advanced AI model do the rest. It meticulously compares each CV against the job requirements, ensuring you find the perfect match faster and more efficiently. Save time, reduce bias, and hire the best talent with ease.
                </p>
                <Button is_delete={false} >
                    Analyze
                </Button>
            </div>
            <div className='h-full order-1'>
                <Image src={HeroImage} className='h-full' alt='CV Analyzer' />
            </div>
        </div>
    )
}

export default HeroSection